import React from 'react';
import { Button, Col, Row, Image } from 'react-bootstrap';
import Sorry from '../Images/sorry.jpg';

const ErrorScreen = ({ history }) => {
  return (
    <div className="py-5 bg-light my-5">
      <Row className="text-center p-4">
        <h1 className="text-danger">
          <i className="fas fa-exclamation-circle"></i> 404 Not found
        </h1>
        <p>
          Page you have requested doesn't exist. The link maybe broken or page
          simply doesn't exist.
        </p>
        <Col className="my-4 d-flex justify-content-center">
          <Button variant="success" onClick={() => history.push('/')}>
            <i className="fas fa-home"></i> Take me back home
          </Button>
        </Col>
        <Row className=" my-4 d-flex justify-content-center">
          {' '}
          <Col md={3}>
            <Image fluid src={Sorry} />
          </Col>
        </Row>
      </Row>
    </div>
  );
};

export default ErrorScreen;
