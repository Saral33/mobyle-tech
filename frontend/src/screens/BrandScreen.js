import React, { useEffect, useState } from 'react';
import { Button, Row, Card, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsByBrand } from '../actions/productActions';
import Loader from '../components/Loader';
import AlertMessage from '../components/AlertMessage';
import { Link } from 'react-router-dom';

const BrandScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  const { error, loading, products, remaining } = useSelector(
    (state) => state.productCategories
  );
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getProductsByBrand(match.params.brand, page));
  }, [dispatch, match, page]);

  return (
    <div className="my-5">
      <Button variant="outline-dark" onClick={() => history.push('/')}>
        <i className="fas fa-arrow-left"></i> Back
      </Button>
      <h3 className="text-center">Mobiles from {match.params.brand}</h3>

      {loading ? (
        <Loader />
      ) : error ? (
        <AlertMessage>{error}</AlertMessage>
      ) : (
        <>
          <Row className="my-4">
            {' '}
            {products.map((product) => (
              <Col
                key={product._id}
                sm={12}
                md={6}
                lg={4}
                xl={3}
                className="d-flex align-items-stretch"
              >
                <Card className="my-3 p-3">
                  <Link to={`/product/${product._id}`}>
                    <Card.Img src={product.mainImage} />
                  </Link>
                  <Card.Body>
                    <Card.Title as="h5" className="text-center">
                      <Link
                        className="link"
                        to={`/product/${product._id}?redirect=brands`}
                      >
                        {product.name}
                      </Link>
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
            <Col className="d-flex justify-content-center">
              {remaining > 0 && (
                <Button
                  onClick={() => setPage(page + 1)}
                  className="align-center"
                  variant="dark"
                >
                  Load More
                </Button>
              )}
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default BrandScreen;
