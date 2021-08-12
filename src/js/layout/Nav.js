import React from "react";

import { useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../context/AuthContext";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { Image } from "react-bootstrap";

import logo from "../../media/list.png";

import Button from "react-bootstrap/Button";
import * as Icon from "react-bootstrap-icons";

import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";

function NavbarLayout() {
  const [auth, setAuth] = useContext(AuthContext);

  const history = useHistory();

  function logout() {
    setAuth(null);
    history.push("/Login");
  }

  return (
    <>
      <Navbar className="fixed-bottom-nav" bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>
            <Image src={logo} roundedCircle width="50" height="50" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {auth ? (
              <>
                {" "}
                <LinkContainer to="/Home">
                  <Nav.Link>
                    <Icon.PersonCheckFill color="#00beaf" size={30} />
                  </Nav.Link>
                </LinkContainer>{" "}
                <Button variant="outline-light" type="submit" onClick={logout}>
                  Log out
                </Button>
              </>
            ) : (
              <>
                <LinkContainer to="/login">
                  <Nav.Link>
                    {" "}
                    <Icon.PersonFill color="#00beaf" size={30} />
                  </Nav.Link>
                </LinkContainer>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarLayout;
