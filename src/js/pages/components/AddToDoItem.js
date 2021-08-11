import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Icon from "react-bootstrap-icons";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

import FormError from "../../common/FormError";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import { TODO_LIST } from "../../constants/api";

const schema = yup.object().shape({
  Title: yup
    .string()
    .required("Enter the title")
    .min(3, "Title needs to be atleast 3 characters"),

  Description: yup.string(),

  Due: yup.date().required("Enter a date"),
});

export default function AddHousing() {
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [date, setDate] = useState(new Date());

  const [auth, setAuth] = useContext(AuthContext);

  const url = TODO_LIST;

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    setSubmitting(true);
    setServerError(null);

    let formData = new FormData();
    formData.append("data", JSON.stringify(data));

    const token = auth.jwt;

    try {
      axios.defaults.headers.common = { Authorization: `bearer ${token}` };
      const response = await axios.post(url, formData);
      console.log("response", response);
    } catch (error) {
      console.log("error", error);
      setServerError(error.toString());
    } finally {
      setSubmitting(false);
      window.location.reload(false);
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
                  <Form.Label>Title</Form.Label>
                  <Form.Group controlId="formTitle">
                    <Form.Control name="Title" ref={register} autoFocus />
                    {errors.Title && (
                      <FormError>{errors.Title.message}</FormError>
                    )}
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  {" "}
                  <Form.Label>Due</Form.Label>
                  <Form.Group controlId="duedate">
                    <Form.Control
                      type="date"
                      name="Due"
                      ref={register}
                      placeholder="Due date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col> </Col>
                <Col>
                  <Form.Group controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      name="Description"
                      as="textarea"
                      ref={register}
                      rows={3}
                    />
                    {errors.description && (
                      <FormError>{errors.description.message}</FormError>
                    )}
                  </Form.Group>
                </Col>
              </Form.Row>

              <Form.Group name="buttonSend">
                <Button type="submit" value="Submit" variant="btn-submit">
                  {submitting ? "Submitting..." : "Submit"}
                  <Icon.PlusCircleFill color="white" size={20} />
                </Button>
              </Form.Group>
            </Form>
          </Container>
        </Card.Body>
      </Card>
    </>
  );
}
