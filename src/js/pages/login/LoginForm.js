import React from "react";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

import FormError from "../../common/FormError";

import { BASE_URL, TOKEN_PATH } from "../../constants/api";
import AuthContext from "../../context/AuthContext";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import logo from "../../../media/list.png";

const url = BASE_URL + TOKEN_PATH;

const schema = yup.object().shape({
  identifier: yup.string().required("Please enter your username or email"),
  password: yup.string().required("Please enter your password"),
});

export default function LoginForm() {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const history = useHistory();

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const [auth, setAuth] = useContext(AuthContext);

  async function onSubmit(data) {
    setSubmitting(true);
    setLoginError(null);

    //console.log(data);

    try {
      const response = await axios.post(url, data);
      console.log("response", response.data);
      setAuth(response.data);
      history.push("/Home");
    } catch (error) {
      console.log("error", error);
      setLoginError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Container className="login-container">
        {" "}
        <div className="login-background">
          <Image src={logo} roundedCircle width="200" height="200" />{" "}
          <Form onSubmit={handleSubmit(onSubmit)}>
            {loginError && <FormError>{loginError}</FormError>}
            <fieldset disabled={submitting}>
              <Form.Label>Username</Form.Label>
              <Form.Group controlId="formBasicUsername">
                <Form.Control name="identifier" ref={register}></Form.Control>
                {errors.identifier && (
                  <FormError>{errors.identifier.message}</FormError>
                )}
              </Form.Group>

              <Form.Label>Password</Form.Label>
              <Form.Group controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  name="password"
                  ref={register}
                ></Form.Control>
                {errors.password && (
                  <FormError>{errors.password.message}</FormError>
                )}
              </Form.Group>

              <Button variant="btn-submit" type="submit" block>
                {submitting ? "Loggin in..." : "Login"}{" "}
              </Button>
            </fieldset>
          </Form>
        </div>
      </Container>
    </>
  );
}
