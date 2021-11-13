import React, { useState } from 'react';
import { Form, Row, Button } from 'react-bootstrap';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import FormContainer from '../components/FormContainer';
import LoadingButton from '../components/LoadingButton';
import AlertMessage from '../components/AlertMessage';

const CheckOutScreen = ({ match }) => {
  const checkOutId = match.params.id;
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const stripePromise = loadStripe(
    'pk_test_51IybFcDb0d5HVDFzc6XVvqRJIF6Q8sUcwTz8gL7x16yZoxfO1ScxyxHJJgE6yuDwEaHBcZwlKXUDZPtye8jr2au000gaKCsjWG'
  );

  const submitHandler = async (e) => {
    e.preventDefault();
    const stripe = await stripePromise;
    setLoading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.post(
        `/api/checkout/payment/${checkOutId}`,
        { email, address },
        config
      );
      const result = await stripe.redirectToCheckout({
        sessionId: res.data.sessionId,
      });
      setLoading(false);
      if (result.error) {
        setError(result.error);
      }
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <FormContainer>
      <Row className="py-5">
        <h2> #{checkOutId}</h2>
        {error && <AlertMessage>{error} </AlertMessage>}
        <p>Please enter your email and your main address to proceed ahead</p>
        <p>For now, we only accept stripe payment.</p>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              placeholder="Email Address"
            />
          </Form.Group>
          <Form.Group controlId="formBasicAddress">
            <Form.Label>Main Address</Form.Label>
            <Form.Control
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              required
              placeholder="Eg:- Mainstreet 123, New York"
            />
          </Form.Group>
          {loading ? (
            <LoadingButton> Continuing...</LoadingButton>
          ) : (
            <Button className="mt-3" variant="success" type="submit">
              Continue
            </Button>
          )}
        </Form>
      </Row>
    </FormContainer>
  );
};

export default CheckOutScreen;
