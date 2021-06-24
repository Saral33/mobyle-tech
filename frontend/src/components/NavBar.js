import React, { useEffect } from 'react';
import { Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUser, logoutUser } from '../actions/userActions';
import { getCartItem } from '../actions/cartActions';
import { ADD_CART_RESET } from '../actions/constants';

const NavBar = () => {
  const dispatch = useDispatch();
  const { authenticated } = useSelector((state) => state.authState);
  const { userInfo } = useSelector((state) => state.userState);
  const { cartItem } = useSelector((state) => state.cartState);
  const { success } = useSelector((state) => state.cartAction);
  const logoutHandler = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    dispatch({ type: ADD_CART_RESET });
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCartItem());
  }, [dispatch, success]);

  return (
    <header>
      <Navbar
        bg="danger"
        variant="dark"
        expand="lg"
        className="p-4"
        fixed="top"
      >
        <Container>
          <Link className="link" to="/">
            <Navbar.Brand>Mobyle Tech Shop</Navbar.Brand>
          </Link>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {!authenticated ? (
                <>
                  <Nav.Link>
                    <Link
                      style={{ textDecoration: 'none', color: '#fff' }}
                      to="/cart"
                    >
                      <i className="fas fa-shopping-cart"></i>
                    </Link>
                  </Nav.Link>
                  <Nav.Link>
                    <Link
                      style={{ textDecoration: 'none', color: '#fff' }}
                      to="/login"
                    >
                      Login
                    </Link>
                  </Nav.Link>
                  <Nav.Link>
                    <Link
                      style={{ textDecoration: 'none', color: '#fff' }}
                      to="/register"
                    >
                      Register
                    </Link>
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link>
                    <Link
                      style={{ textDecoration: 'none', color: '#fff' }}
                      to="/cart"
                    >
                      <i className="fas fa-shopping-cart"></i>{' '}
                      <Badge className="rounded-pill bg-light text-dark px-1">
                        {cartItem?.length}
                      </Badge>
                    </Link>
                  </Nav.Link>
                  {userInfo?.role === 'admin' && (
                    <NavDropdown title="Admin">
                      <NavDropdown.Item
                        href="https://mobyletech-admin.netlify.app/login"
                        target="_blank"
                      >
                        Admin Panel
                      </NavDropdown.Item>
                    </NavDropdown>
                  )}

                  <NavDropdown
                    title={
                      <div className="pull-lefts">
                        <img
                          className="thumbnail-image"
                          src={userInfo?.image}
                          alt="user pic"
                        />
                        <div className="mx-1 text-light">
                          {userInfo?.username}
                        </div>
                      </div>
                    }
                    id="basic-nav-dropdown"
                  >
                    <NavDropdown.Item>
                      <Link style={{ textDecoration: 'none' }} to="/profile">
                        Profile
                      </Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Link
                        style={{ textDecoration: 'none' }}
                        to="/transactions"
                      >
                        Transactions
                      </Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default NavBar;
