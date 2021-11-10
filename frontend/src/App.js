import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Components
import { Container } from 'react-bootstrap';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import BrandScreen from './screens/BrandScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import ActivateAccountScreen from './screens/ActivateAccountScreen';
import ErrorScreen from './screens/ErrorScreen';
import PrivateRoute from './PrivateRoute';
import ScrollToTop from './ScrollToTop';
//Action
import { getUser } from './actions/userActions';
import { getCartItem } from './actions/cartActions';
import UserProfileScreen from './screens/UserProfileScreen';
import CartScreen from './screens/CartScreen';
import CheckOutScreen from './screens/CheckOutScreen';
import PaymentResultScreen from './screens/PaymentResultScreen';
import TransactionScreen from './screens/TransactionScreen';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
    dispatch(getCartItem());
  }, [dispatch]);
  return (
    <Router>
      <NavBar />
      <ScrollToTop />
      <main className="py-3">
        <Container>
          <Switch>
            <Route exact path="/" component={HomeScreen} />
            <Route path="/brands/:brand" component={BrandScreen} />
            <Route exact path="/product/:id" component={ProductDetailScreen} />
            <Route path="/search/:name" component={ProductDetailScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/login" component={LoginScreen} />
            <PrivateRoute path="/cart" component={CartScreen} />
            <PrivateRoute path="/profile" component={UserProfileScreen} />
            <PrivateRoute path="/checkout/:id" component={CheckOutScreen} />
            <PrivateRoute path="/payment" component={PaymentResultScreen} />
            <PrivateRoute path="/transactions" component={TransactionScreen} />
            <Route
              exact
              path="/activate/:id/:token"
              component={ActivateAccountScreen}
            />
            <Route path="*" component={ErrorScreen} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
