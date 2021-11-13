import React, { useEffect, useState } from 'react';
import { Row, Col, ListGroup, Image, Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getCartItem, deleteItemCart } from '../actions/cartActions';
import Loader from '../components/Loader';
import AlertMessage from '../components/AlertMessage';
import LoadingButton from '../components/LoadingButton';
import { Link } from 'react-router-dom';
import { DELETE_CART_RESET } from '../actions/constants';
import emptyCart from '../Images/emptycart.png';
import axios from 'axios';

const CartScreen = ({ history }) => {
  const dispatch = useDispatch();
  const { loading, error, cartItem } = useSelector((state) => state.cartState);
  const {
    loading: cartLoading,
    error: cartError,
    success,
  } = useSelector((state) => state.cartAction);
  const [qty, setQty] = useState([]);
  const [checkOutId, setCheckOutId] = useState('');
  const [checkOutLoading, setCheckOutLoading] = useState(false);

  useEffect(() => {
    dispatch({ type: DELETE_CART_RESET });
    dispatch(getCartItem());
  }, [dispatch, success]);
  useEffect(() => {
    if (cartItem?.length > 0) {
      cartItem.map((item) => setQty((old) => [...old, item.qty]));
    }
  }, [cartItem]);
  useEffect(() => {
    if (checkOutId) {
      history.push(`/checkout/${checkOutId}`);
    }
  }, [checkOutId, history]);
  const qtyChangeHandler = (e, index) => {
    const result = [...qty];
    result[index] = Number(e.target.value);
    setQty(result);
  };

  const deleteHandler = (id) => {
    dispatch(deleteItemCart(id));
  };

  const checkOutHandler = async () => {
    setCheckOutLoading(true);
    const lineItem = [];
    if (cartItem.length > 0) {
      cartItem.map((item, index) =>
        lineItem.push({
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.name,
              images: [item.image],
            },
            unit_amount_decimal: Number(
              (item.price * qty[index]).toFixed(2) * 100
            ),
          },
          quantity: qty[index],
        })
      );
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post(
        `/api/checkout`,
        { lineItems: lineItem },
        config
      );
      setCheckOutId(res.data.id);
      setCheckOutLoading(false);
    } catch (error) {
      setCheckOutLoading(false);
      console.log(error.response);
    }
  };

  return (
    <>
      <Row className="pt-5 px-5 mt-5 bg-light">
        <Col md={12}>
          <h2 className="text-center">My Cart</h2>
          <Button
            className="mb-2"
            variant="outline-primary"
            onClick={() => history.push('/')}
          >
            Go back
          </Button>
          {loading ? (
            <Loader />
          ) : error ? (
            <>
              <h4 className="text-center ms-5">
                Your cart is empty.Shop and fill it
              </h4>
              <Row className="d-flex justify-content-center">
                <Col md={3}>
                  <Image alt="Cart" src={emptyCart} />
                </Col>
              </Row>
            </>
          ) : cartItem.length <= 0 ? (
            <>
              <h4 className="text-center ms-5">
                Your cart is empty.Shop and fill it
              </h4>
              <Row className="d-flex justify-content-center">
                <Col md={3}>
                  <Image alt="Cart" src={emptyCart} />
                </Col>
              </Row>
            </>
          ) : (
            <>
              <ListGroup className="p-2" variant="flush">
                {cartError && <AlertMessage>{cartError}</AlertMessage>}
                {cartItem.map((item, index) => (
                  <React.Fragment key={item.product}>
                    <ListGroup.Item>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            fluid
                            rounded
                            alt="cart-image"
                          />
                        </Col>
                        <Col md={4} className="d-flex align-self-center">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={2} className="d-flex align-self-center">
                          ${item.price}
                        </Col>
                        <Col md={2}>
                          <Form.Control
                            as="select"
                            value={qty[index]}
                            onChange={(e) => qtyChangeHandler(e, index)}
                          >
                            {[...Array(10)].map((opt, index) => (
                              <option key={index + 1} value={index + 1}>
                                {index + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                        <Col md={2}>
                          {cartLoading ? (
                            <LoadingButton></LoadingButton>
                          ) : (
                            <Button
                              onClick={() => deleteHandler(item.product)}
                              type="button"
                              variant="light"
                            >
                              <i className="fas fa-trash"></i>
                            </Button>
                          )}
                        </Col>
                        <Col md={1} className="d-flex align-self-center">
                          ${(item.price * qty[index]).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  </React.Fragment>
                ))}
              </ListGroup>
              <Row className="py-3">
                <Col className=" d-flex justify-content-end ">
                  <p>
                    <strong className="bg-light p-3 text-primary">
                      Total: $
                      {cartItem
                        .reduce((a, b, index) => {
                          return a + b.price * qty[index];
                        }, 0)
                        .toFixed(2)}
                    </strong>
                  </p>
                </Col>
              </Row>
              <Row className="py-3">
                <Col className="d-flex justify-content-center">
                  {checkOutLoading ? (
                    <LoadingButton variant="success">
                      Proceeding...
                    </LoadingButton>
                  ) : (
                    <Button variant="success" onClick={checkOutHandler}>
                      Proceed to checkout
                    </Button>
                  )}
                </Col>
              </Row>
              <Row className="py-3">
                <Col className="d-flex justify-content-center">
                  <Button variant="danger">
                    <i className="fas fa-times"></i> Reset
                  </Button>
                </Col>
              </Row>
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default CartScreen;
