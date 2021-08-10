import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

import FormError from "../../common/FormError";
import axios from "axios";
import AuthContext from "../../../../context/AuthContext";
import { TODO_LIST } from "../../constants/api";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Enter the housing name")
    .min(3, "Housing name needs to be atleast 3 characters"),
  adress: yup
    .string()
    .required("Enter the housing adress")
    .min(5, "Housing adress needs to be atleast 5 characters"),

  type: yup
    .string()
    .required("Enter housing type")
    .min(3, "Housing type needs to be atleast 3 characters"),

  price: yup
    .number()
    .required("Must be a whole number")
    .integer("Must be a whole number")
    .typeError("Must be a whole number"),

  description: yup
    .string()
    .required("Enter the housing description")
    .min(10, "The message must be at least 10 characters"),
});

export default function AddHousing() {
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);

  const [auth, setAuth] = useContext(AuthContext);
  const url = TODO_LIST;

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    setSubmitting(true);
    setServerError(null);

    const token = auth.jwt;

    try {
      axios.defaults.headers.common = { Authorization: `bearer ${token}` };
      const response = await axios.post(url);
      console.log("response", response);
    } catch (error) {
      console.log("error", error);
      setServerError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  console.log(errors);

  return (
    <>
      {" "}
      <Card>
        <Card.Body>
          <Container>
            <Form disabled={submitting} onSubmit={handleSubmit(onSubmit)}>
              {serverError && <FormError>{serverError}</FormError>}
              <Form.Row>
                <Col>
                  <Form.Label>Housing name</Form.Label>
                  <Form.Group controlId="formHousingName">
                    <Form.Control name="name" ref={register} autoFocus />
                    {errors.name && (
                      <FormError>{errors.name.message}</FormError>
                    )}
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Label>Housing adress</Form.Label>
                  <Form.Group controlId="formAdress">
                    <Form.Control name="adress" ref={register} />
                    {errors.adress && (
                      <FormError>{errors.adress.message}</FormError>
                    )}
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Label>Type</Form.Label>
                  <Form.Group controlId="formType">
                    <Form.Control name="type" ref={register} />
                    {errors.type && (
                      <FormError>{errors.type.message}</FormError>
                    )}
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Label>Price</Form.Label>
                  <Form.Group controlId="formPrice">
                    <Form.Control name="price" ref={register} />
                    {errors.price && (
                      <FormError>{errors.price.message}</FormError>
                    )}
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  name="description"
                  as="textarea"
                  ref={register}
                  rows={3}
                />
                {errors.description && (
                  <FormError>{errors.description.message}</FormError>
                )}
              </Form.Group>
              <Form.Row>
                <Col>
                  <Form.Group controlId="formImage.one">
                    <Form.Label className="imageone">
                      Housing exterior
                    </Form.Label>
                    <Form.Control
                      name="imageone"
                      type="file"
                      ref={register}
                      onChange={handleInputChange}
                    />
                    {errors.imageone && (
                      <FormError>{errors.imageone.message}</FormError>
                    )}
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formImage.two">
                    <Form.Label className="imagetwo">
                      Housing interior
                    </Form.Label>
                    <Form.Control
                      name="imagetwo"
                      type="file"
                      ref={register}
                      onChange={handleInputChange}
                    />
                    {errors.imagetwo && (
                      <FormError>{errors.imagetwo.message}</FormError>
                    )}
                  </Form.Group>{" "}
                </Col>{" "}
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Group controlId="formImage.three">
                    <Form.Label className="imagethree">
                      Housing interior
                    </Form.Label>

                    <Form.Control
                      name="imagethree"
                      type="file"
                      ref={register}
                      onChange={handleInputChange}
                    />
                    {errors.imagethree && (
                      <FormError>{errors.imagethree.message}</FormError>
                    )}
                  </Form.Group>{" "}
                </Col>
                <Col>
                  <Form.Group controlId="formImage.four">
                    <Form.Label className="imagefour">
                      Housing interior
                    </Form.Label>

                    <Form.Control
                      name="imagefour"
                      type="file"
                      ref={register}
                      onChange={handleInputChange}
                    />
                    {errors.imagefour && (
                      <FormError>{errors.imagefour.message}</FormError>
                    )}
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Group name="buttonSend">
                <Button type="submit" value="Submit" variant="btn-submit">
                  {submitting ? "Submitting..." : "Submit"}
                  <Icon.ChevronRight color="white" size={20} />
                </Button>
              </Form.Group>
            </Form>
          </Container>
        </Card.Body>
      </Card>
    </>
  );
}
