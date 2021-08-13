import React from "react";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import logo from "../../../media/list.png";

import Row from "react-bootstrap/Row";

import LoginForm from "./LoginForm";

export default function Login() {
  return (
    <>
      <Container>
        <Row xs={1} lg={2} className="login-row">
          <Col>
            {" "}
            <Card className="text-center login-card-background">
              <Card.Body className="login-card-background">
                <Image src={logo} roundedCircle width="100" height="100" />{" "}
                <Card.Title>
                  <h1>ToDo4U</h1>
                </Card.Title>
                <Card.Text>
                  ToDo4U helps you to stay focused and in control with all your
                  tasks and goals.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            {" "}
            <div className="hero-wrapper-login">
              <LoginForm />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
