import "./sass/style.scss";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./js/pages/Home";
import Login from "./js/pages/login/Login";
import { AuthProvider } from "./js/context/AuthContext";

import FooterLayout from "./js/layout/Footer";
import NavbarLayout from "./js/layout/Nav";

import ScrollToTop from "./js/common/ScrollToTop";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>

          <ScrollToTop />
          <NavbarLayout />
          <div id="container">
            <div id="main-content">
              <Switch>
                <Route path="/home">
                  <Home />
                </Route>
                <Route path="/login">
                  <Login />
                </Route>
              </Switch>
            </div>
          </div>
          <FooterLayout />
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
