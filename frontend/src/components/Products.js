import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Loader from './Loader';
import AlertMessage from './AlertMessage';
import { useDispatch, useSelector } from 'react-redux';
import Rating from './Ratings';
import { getProducts } from '../actions/productActions';

const Products = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const { loading, remaining, products, error } = useSelector(
    (state) => state.productsReducer
  );

  useEffect(() => {
    dispatch(getProducts(page));
  }, [dispatch, page]);

  return (
    <>
      <h2 className="text-center">Recommendations</h2>

      {loading ? (
        <Loader />
      ) : error ? (
        <AlertMessage>{error}</AlertMessage>
      ) : (
        <Row>
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
                    <Link className="link" to={`/product/${product._id}`}>
                      {product.name}
                    </Link>
                  </Card.Title>
                  <Card.Text as="h5" className="text-center">
                    ${product.version[0]?.price}
                  </Card.Text>
                  <Card.Text as="h4" className="text-center">
                    <Rating value={product.ratings} />
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
          <Col className="d-flex justify-content-center my-4">
            {remaining > 0 && (
              <Button
                onClick={() => setPage(page + 1)}
                variant="outline-primary"
              >
                Load More
              </Button>
            )}
          </Col>
        </Row>
      )}
    </>
  );
};

export default Products;
