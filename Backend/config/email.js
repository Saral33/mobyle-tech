const sgMail = require('@sendgrid/mail');
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const activateAccountToken = (email, id, token) => {
  sgMail.send({
    to: email,
    from: process.env.MY_EMAIL,
    subject: 'Activate your account',
    html: `
        <p>Hi, Welcome to MobX. Here is a link to activate your account. Link is valid upto 10 minutes so you gotta hurry</p>
        <a target="_blank"  href=${process.env.BASE_URL}/activate/${id}/${token}> Click here to activate</a>
        <p>If you havenot requested this message, please feel free to ignore.</p>
        `,
  });
};

const passwordResetToken = (email, token, id) => {
  sgMail.send({
    to: email,
    from: process.env.MY_EMAIL,
    subject: 'Reset your password',
    html: `
    <p>Hi user,</p>
    <p>You received this email as you requested the password</p>
    <p>Click button below to activate your account. This link only works for 10 minute</p>
    <div style="margin-top:30px; margin-left:100px; background:red;padding:15px;width:70px">
      <a target="_blank" href=${process.env.BASE_URL}/reset/${token}/${id} style="text-decoration:none; color:#fff; ">Click here</a>
    </div>
    <p>If the button didnot work copy and paste this link</p>
    <a href=${process.env.BASE_URL}/reset/${token}/${id}>${process.env.BASE_URL}/reset/${token}/${id}</a>
    <p>If you didnot requested this email, you can completely ignore it. </p>
  </html>
        `,
  });
};

module.exports = { activateAccountToken, passwordResetToken };
