import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Navbar from "./components/layout/Nav";
import Landing from "./components/layout/Landing";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/layout/Dashboard";
import NotFound from './components/layout/NotFound';
import Profile from './components/profile/Profile';
import EditProfile from "./components/profile/EditProfile";
import PrivateRoute from "./components/routing/PrivateRoute";
import Authors from "./components/authors/Authors";
import Author from "./components/authors/Author";
import AddEditAuthor from "./components/authors/AddEditAuthor";
import Books from "./components/books/Books";
import Book from "./components/books/Book";
import AddEditBook from "./components/books/AddEditBook";

import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';

import { Provider } from 'react-redux';
import store from './store';

const App = () => {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    // window.addEventListener('storage', () => {
    //   if (!localStorage.token) store.dispatch({ type: LOGOUT });
    // });
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <section className="container">
          <Alert/>
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/" component={Landing} />
              <PrivateRoute exact path="/profile/:id" component={Profile} />
              <PrivateRoute exact path="/edit-profile" component={EditProfile} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/authors" component={Authors} />
              <PrivateRoute exact path="/authors/:id" component={Author} />
              <PrivateRoute exact path="/authors/edit/:id" component={AddEditAuthor} />
              <PrivateRoute exact path="/new-author" component={AddEditAuthor} />
              <PrivateRoute exact path="/books" component={Books} />
              <PrivateRoute exact path="/books/:id" component={Book} />
              <PrivateRoute exact path="/books/edit/:id" component={AddEditBook} />
              <PrivateRoute exact path="/new-book" component={AddEditBook} />
              <Route component={NotFound} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
