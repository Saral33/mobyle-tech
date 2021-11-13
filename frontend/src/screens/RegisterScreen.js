import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import { registerUser } from '../actions/userActions';
import { useSelector, useDispatch } from 'react-redux';
import AlertMessage from '../components/AlertMessage';
import LoadingButton from '../components/LoadingButton';

const RegisterScreen = ({ history }) => {
  const [message, setMessage] = useState('');
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const {
    loading,
    error,
    authenticated,
    message: activationMessage,
  } = useSelector((state) => state.authState);

  useEffect(() => {
    if (!authenticated) {
      if (password !== confirmPassword && password && confirmPassword) {
        setMessage('Password do not matches');
      } else {
        setMessage('');
      }
    } else {
      history.push('/');
    }
  }, [confirmPassword, password, authenticated, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      dispatch(registerUser({ email, username, password }));
    }
  };

  return (
    <FormContainer>
      <h2 className="my-3 text-center">
        <i className="fas fa-user-lock"></i> Register
      </h2>
      {activationMessage && (
        <AlertMessage variant="info">{activationMessage}</AlertMessage>
      )}
      {error && <AlertMessage>{error}</AlertMessage>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="username">
          <Form.Label>UserName</Form.Label>
          <Form.Control
            required
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            placeholder="Username"
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            placeholder="Enter Password"
          />
        </Form.Group>
        <Form.Group controlId="formBasicConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            minLength={8}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            type="password"
            placeholder="Enter Confirm Password"
          />
          {message && <Form.Text className="text-danger">{message}</Form.Text>}
        </Form.Group>
        <Row className="my-3 ">
          {loading ? (
            <LoadingButton> Registering.....</LoadingButton>
          ) : (
            <Button className="p-2" variant="success" type="submit">
              Regsiter
            </Button>
          )}
        </Row>
      </Form>
      <Row>
        <Col md={12}>
          Already have an account? {<Link to="/login">Login here</Link>}
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
