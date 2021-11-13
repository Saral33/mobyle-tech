import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import { useSelector, useDispatch } from 'react-redux';
import AlertMessage from '../components/AlertMessage';
import LoadingButton from '../components/LoadingButton';
import { googleLoginUser, loginUser } from '../actions/userActions';
import { GoogleLogin } from 'react-google-login';

const LoginScreen = ({ history, location }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { loading, error, authenticated } = useSelector(
    (state) => state.authState
  );
  const redirectRoute = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (authenticated) {
      history.push(redirectRoute);
    }
  }, [authenticated, history, redirectRoute]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };
  const responseGoogle = (response) => {
    dispatch(googleLoginUser({ tokenId: response.tokenId }));
  };
  return (
    <FormContainer>
      <h2 className="my-3 text-center">
        <i className="fas fa-lock"></i> Login
      </h2>
      {error && <AlertMessage>{error}</AlertMessage>}
      {location.search && <AlertMessage>You have to login first</AlertMessage>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>

          <Form.Control
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            placeholder="Password"
          />
        </Form.Group>
        <Row className="my-4">
          {loading ? (
            <LoadingButton> Loging in.....</LoadingButton>
          ) : (
            <Button className="pt-2" variant="success" type="submit">
              Login
            </Button>
          )}
        </Row>
      </Form>
      <Row>
        <Col md={10} sm={10}>
          No Account? {<Link to="/register">Register Here</Link>}
        </Col>
      </Row>
      <Row className="py-3">
        <Col>
          <hr />
        </Col>
        <Col md="auto" xs="auto">
          {' '}
          OR{' '}
        </Col>
        <Col>
          <hr />
        </Col>
      </Row>
      <Row>
        <Col md={12} className="d-flex justify-content-center">
          <GoogleLogin
            clientId="1078753984247-o7o9g8irhe361boeb2flcbjpau9p73rb.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                variant="dark"
                style={{ textTransform: 'none', width: '70%' }}
              >
                <img
                  width="20px"
                  style={{ marginBottom: '3px', marginRight: '5px' }}
                  alt="Google sign-in"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                />
                Login with Google
              </Button>
            )}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
