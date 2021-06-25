const CheckOut = require('../Models/checkoutModel');
const asyncHandler = require('express-async-handler');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const saveCheckout = asyncHandler(async (req, res) => {
  const { lineItems } = req.body;

  const checkOut = new CheckOut({
    user: req.user.id,
    username: req.user.username,
    lineItems,
  });
  await checkOut.save();
  res.json({ id: checkOut._id });
});

const checkOutSession = asyncHandler(async (req, res) => {
  const { address, email } = req.body;
  const checkOut = await CheckOut.findById(req.params.id);
  const result = JSON.parse(JSON.stringify(checkOut.lineItems)); //Parse due to some mongo error
  if (!checkOut) {
    throw new Error('The checkout id is invalid');
  }
  if (checkOut.isPaid) {
    throw new Error('This checkout is already completed!');
  }
  if (req.user.email !== email) {
    throw new Error('This is not your email');
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: result,
    customer_email: req.user.email,
    mode: 'payment',
    client_reference_id: req.params.id,
    success_url: `${process.env.BASE_URL}/payment?success=true`,
    cancel_url: `${process.env.BASE_URL}/payment?success=false`,
  });
  checkOut.address = address;
  await checkOut.save();
  res.json({ sessionId: session.id });
});

const getMyCheckOut = asyncHandler(async (req, res) => {
  const checkOut = await CheckOut.find({ user: req.user.id, isPaid: true });
  if (!checkOut) {
    throw new Error('Your transaction is empty');
  }
  res.json(checkOut);
});

const updateCheckout = asyncHandler(async (req, res) => {
  let event;
  try {
    const signature = req.headers['stripe-signature'];
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    res.json({ error: 'Webhook error. Try again later' });
  }
  if (event.type === 'checkout.session.completed') {
    const result = event.data.object;
    const checkOut = await CheckOut.findById(result.client_reference_id);
    if (!checkOut) {
      throw new Error('No checkout found for such ID');
    }
    checkOut.isPaid = true;
    checkOut.totalamount = Number(result.amount_total) / 100;
    await checkOut.save();
    res.status(200).json({ received: true });
  }
});

module.exports = {
  saveCheckout,
  checkOutSession,
  getMyCheckOut,
  updateCheckout,
};
