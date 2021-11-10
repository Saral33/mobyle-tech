import React, { useEffect, useState } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

const Search = ({ history }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [term, setTerm] = useState([]);

  const fetchNames = async () => {
    const res = await axios.get('/api/products/names');
    setOptions(res.data);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchNames();
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    if (term.length > 0) {
      history.push(`/search/${term}`);
    }
  };
  return (
    <>
      <Row className="px-3">
        <Col md={12}>
          <Form onSubmit={submitHandler} className="d-flex my-4 search__form">
            <>
              <Typeahead
                style={{ width: '90%' }}
                isLoading={isLoading}
                minLength={3}
                id="basic-typeahead-single"
                labelKey="name"
                placeholder="Search MobX Store"
                className="mx-2"
                options={options}
                onChange={setTerm}
              />
            </>
            <Button type="submit" variant="outline-success">
              <i className="fas fa-search"></i>
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default withRouter(Search);
