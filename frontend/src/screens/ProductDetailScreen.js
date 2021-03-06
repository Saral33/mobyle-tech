import React, { useEffect, useState } from 'react';
import {
  Button,
  Col,
  Image,
  ListGroup,
  Row,
  Form,
  Card,
  OverlayTrigger,
} from 'react-bootstrap';
import Rating from '../components/Ratings';
import { Link } from 'react-router-dom';
import { getProductDetails, giveReview } from '../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import AlertMessage from '../components/AlertMessage';
import LoadingButton from '../components/LoadingButton';
import axios from 'axios';
import { CREATE_REVIEW_RESET, ADD_CART_RESET } from '../actions/constants';
import { addToCart } from '../actions/cartActions';

const ProductDetailScreen = ({ match, history, location }) => {
  const dispatch = useDispatch();
  const [star, setStar] = useState(0); //For rating
  const [id, setId] = useState('');
  const [showMagnifier, setShowMagnifier] = useState(false); //For magnifying image
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [[x, y], setXY] = useState([0, 0]); //For magnifying image
  const [show, setShow] = useState('');
  const [comment, setComment] = useState(''); //For review

  const [color, setColor] = useState('');
  const [version, setVersion] = useState('');
  const { loading, product, error } = useSelector(
    (state) => state.singleProduct
  );
  const {
    loading: reviewLoading,
    success,
    error: reviewError,
  } = useSelector((state) => state.reviewState);
  const { authenticated } = useSelector((state) => state.authState);
  const {
    loading: cartLoading,
    success: cartSuccess,
    error: cartError,
  } = useSelector((state) => state.cartAction);
  const redirect = location.search ? location.search.split('=')[1] : null;

  useEffect(() => {
    dispatch({ type: ADD_CART_RESET });
    dispatch({ type: CREATE_REVIEW_RESET });
    if (success || match.params.id || match.params.name) {
      if (match.params.id) {
        dispatch(getProductDetails(match.params.id));
      } else {
        const fetchId = async () => {
          const { data } = await axios.get(
            `/api/products/search/${match.params.name}`
          );
          dispatch(getProductDetails(data));
          setId(data);
        };
        fetchId();
      }
      setComment('');
      setStar('');
    }
    if (success) {
      setShow('Review Submitted');
    }
  }, [match, dispatch, success]);

  useEffect(() => {
    if (cartSuccess) {
      history.push('/cart');
    }
  }, [cartSuccess]);
  const reviewHandler = (e) => {
    e.preventDefault();
    dispatch(
      giveReview(
        { rating: star, review: comment },
        match.params.id || (id && id)
      )
    );
  };

  const addToCartHandler = () => {
    if (!authenticated) {
      return history.push(
        `/login?redirect=/product/${match.params.id || (id && id)}`
      );
    }
    let price = version.split(' ')[0];
    const finalVersion = version.split(' ')[1];
    if (price.includes('$')) {
      price = price.replace('$', '');
    }
    if (price && finalVersion) {
      dispatch(
        addToCart(
          { price, version: finalVersion, image: color },
          match.params.id || (id && id)
        )
      );
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="my-5 p-3">
      <Button
        variant="outline-dark"
        onClick={() =>
          history.push(redirect ? `/${redirect}/${product?.brand}` : '/')
        }
      >
        <i className="fas fa-arrow-left"></i> Back
      </Button>

      {loading ? (
        <Loader />
      ) : error ? (
        <AlertMessage>{error}</AlertMessage>
      ) : (
        <>
          <Row className="my-4">
            {cartError && <AlertMessage>{cartError}</AlertMessage>}

            <Col md={3}>
              <div style={{ position: 'relative' }}>
                <Image
                  onMouseEnter={(e) => {
                    // update image size and turn-on magnifier
                    const elem = e.currentTarget;
                    const { width, height } = elem.getBoundingClientRect();
                    setSize([width, height]);
                    setShowMagnifier(true);
                  }}
                  onMouseMove={(e) => {
                    // update cursor position
                    const elem = e.currentTarget;
                    const { top, left } = elem.getBoundingClientRect();

                    // calculate cursor position on the image
                    const x = e.pageX - left - window.pageXOffset;
                    const y = e.pageY - top - window.pageYOffset;
                    setXY([x, y]);
                  }}
                  onMouseLeave={() => setShowMagnifier(false)}
                  style={{ width: '100%', height: 'auto' }}
                  alt={product.name}
                  fluid
                  src={product.mainImage}
                />
                <div
                  style={{
                    display: showMagnifier ? '' : 'none',
                    position: 'absolute',

                    // prevent magnifier blocks the mousemove event of img
                    pointerEvents: 'none',
                    // set size of magnifier
                    height: `400px`,
                    width: `250px`,
                    // move element center to cursor pos
                    top: `${y - 400 / 2}px`,
                    left: `${x - 250 / 2}px`,
                    opacity: '1', // reduce opacity so you can verify position
                    border: '1px solid lightgray',
                    backgroundColor: 'white',
                    backgroundImage: `url('${product.mainImage}')`,
                    backgroundRepeat: 'no-repeat',

                    //calculate zoomed image size
                    backgroundSize: `${imgWidth * 1.55}px ${
                      imgHeight * 1.55
                    }px`,

                    //calculate position of zoomed image.
                    backgroundPositionX: `${-x * 1.55 + 250 / 2}px`,
                    backgroundPositionY: `${-y * 1.55 + 400 / 2}px`,
                  }}
                ></div>
              </div>
            </Col>

            <Col md={5}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.ratings}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Quantity: {product.quantity}</ListGroup.Item>
                <ListGroup.Item>Buyers: {product.sale}</ListGroup.Item>
                <ListGroup.Item>
                  <h5>Choose Version :</h5>
                  <ListGroup.Item>
                    <Row>
                      {product.version.map((pro) => (
                        <Col
                          key={pro._id}
                          className="my-2 d-flex align-items-stretch"
                          md={6}
                        >
                          <Card>
                            <Card.Body>
                              <Form.Check
                                label={pro.version}
                                type="radio"
                                onChange={(e) => setVersion(e.target.value)}
                                inline
                                name="group1"
                                aria-label="radio 1"
                                value={`${pro.price} ${pro.version}`}
                              />
                              <h6>
                                Price:{' '}
                                {pro.price.includes('$')
                                  ? pro.price
                                  : '$' + pro.price}{' '}
                              </h6>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </ListGroup.Item>
                </ListGroup.Item>

                <ListGroup.Item>
                  <h5>Choose Color :</h5>
                  <Row>
                    {product.colors.map((pro) => (
                      <Col key={pro._id} md={5}>
                        <Card>
                          <Card.Img src={pro.image} variant="top" fluid />
                          <Card.Body>
                            <Form.Check
                              type="radio"
                              inline
                              name="group2"
                              label={pro.color}
                              aria-label="radio 3"
                              value={pro.image}
                              onChange={(e) => setColor(e.target.value)}
                            />
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </ListGroup.Item>
              </ListGroup>
              <ListGroup>
                {cartLoading ? (
                  <LoadingButton varinat="dark">Adding....</LoadingButton>
                ) : !color || !version ? (
                  <>
                    <OverlayTrigger
                      placement="top-end"
                      overlay={
                        <div id="tooltip__display">
                          You have to select color and version inorder to add to
                          cart
                        </div>
                      }
                    >
                      <Col md={12}>
                        <Button
                          style={{ pointerEvents: 'none', width: '100%' }}
                          className="my-3"
                          disabled
                        >
                          <i className="fas fa-plus"></i> Add to cart
                        </Button>
                      </Col>
                    </OverlayTrigger>
                  </>
                ) : (
                  <Button
                    variant="primary"
                    className="my-3"
                    onClick={addToCartHandler}
                  >
                    <i className="fas fa-plus"></i> Add to cart
                  </Button>
                )}
              </ListGroup>
            </Col>

            <Col md={4}>
              <ListGroup>
                <ListGroup.Item>
                  <h5>Phone Details</h5>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col md={5}>Available :</Col>
                    <Col md={7}>{product.quantity > 0 ? 'Yes' : 'No'}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col md={5}>Screen :</Col>
                    <Col md={7}>{product.screen}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col md={5}>OS :</Col>
                    <Col md={7}>{product.os}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col md={5}>Ram :</Col>
                    <Col md={7}>{product.ram}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col md={5}>Front Camera :</Col>
                    <Col md={7}>{product.frontCamera}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col md={5}>Rear Camera :</Col>
                    <Col md={7}>{product.rearCamera}</Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row className="my-5">
            <Col md={8}>
              <h2>Description</h2>
              <h5>{product.description}</h5>
            </Col>
          </Row>
          <Row className="py-3">
            <Col md={6}>
              <h2>Reviews</h2>
              <ListGroup variant="flush">
                {!authenticated ? (
                  <AlertMessage>
                    You have to{' '}
                    <Link to={`/login?redirect=/product/${product._id}`}>
                      Login
                    </Link>{' '}
                    to review the product{' '}
                  </AlertMessage>
                ) : (
                  <>
                    <ListGroup.Item className="py-3">
                      <h4>Write a review</h4>
                      {show && (
                        <AlertMessage variant="info">{show}</AlertMessage>
                      )}
                      {reviewError && (
                        <AlertMessage>{reviewError}</AlertMessage>
                      )}
                      <Form onSubmit={reviewHandler}>
                        <Form.Group controlId="rating">
                          <Form.Label>Rating</Form.Label>
                          <Form.Control
                            value={star}
                            as="select"
                            onChange={(e) => setStar(e.target.value)}
                          >
                            <option value="">Select...</option>
                            <option value="1">1- Poor</option>
                            <option value="2">2- Acceptable</option>
                            <option value="3">3- Good</option>
                            <option value="4">4- Best</option>
                            <option value="5">5- Excellent</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="comment">
                          <Form.Label>Your opinion in this product</Form.Label>
                          <Form.Control
                            as="textarea"
                            row="3"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                        {!reviewLoading ? (
                          <Button
                            className="my-4"
                            variant="success"
                            type="submit"
                          >
                            Submit
                          </Button>
                        ) : (
                          <LoadingButton varinat="dark">
                            Submitting....
                          </LoadingButton>
                        )}
                      </Form>
                    </ListGroup.Item>
                  </>
                )}
              </ListGroup>
            </Col>
            <Col md={6}>
              <h2>Some reviews from user</h2>
              <ListGroup variant="flush">
                {product.reviews.length <= 0 ? (
                  <AlertMessage variant="info">
                    No reviews for this product. You can write one.
                  </AlertMessage>
                ) : (
                  product.reviews.map((el) => (
                    <>
                      <ListGroup.Item>
                        <Row>
                          <Col md={1}>
                            <Image roundedCircle fluid src={el.image} />
                          </Col>
                          <Col md={3}>{el.name}</Col>
                          <Col>
                            <Rating value={el.rating} />
                          </Col>
                        </Row>
                        <p>
                          {el.updatedAt.substring(0, 10) ||
                            el.createdAt.substring(0, 10)}
                        </p>
                        <p>{el.review}</p>
                      </ListGroup.Item>
                    </>
                  ))
                )}
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default ProductDetailScreen;
