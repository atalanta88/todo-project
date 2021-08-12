import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Icon from "react-bootstrap-icons";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import FormError from "../../common/FormError";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import { TODO_LIST } from "../../constants/api";

const schema = yup.object().shape({
  Due: yup.date().required("Set a date").typeError("Set a date"),

  Title: yup
    .string()
    .required("Update task")
    .min(3, "Task needs to be atleast 3 characters"),
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
      <Container fluid className="add-todo-item-background">
        <div className="add-todo-item-wrapper">
          <h1>Add a task</h1>

          <Form disabled={submitting} onSubmit={handleSubmit(onSubmit)}>
            {serverError && <FormError>{serverError}</FormError>}
            <Form.Row>
              <Col>
                {" "}
                <Form.Group controlId="duedate">
                  <Form.Control
                    type="date"
                    name="Due"
                    ref={register}
                    placeholder="Due date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                  {errors.Due && (
                    <FormError>
                      {" "}
                      <Icon.ExclamationCircle color="white" size={20} />
                      {errors.Due.message}
                    </FormError>
                  )}
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <Form.Group controlId="formTitle">
                  <Form.Control
                    placeholder="What to do?"
                    aria-label="What to do?"
                    name="Title"
                    ref={register}
                    autoFocus
                  />
                  {errors.Title && (
                    <FormError>
                      {" "}
                      <Icon.ExclamationCircle color="white" size={20} />
                      {errors.Title.message}
                    </FormError>
                  )}
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <Form.Group name="buttonSend">
                  <Button type="submit" value="Submit" variant="outline-light">
                    {submitting ? "ADDING..." : "ADD"}
                  </Button>
                </Form.Group>
              </Col>
            </Form.Row>
          </Form>
        </div>
      </Container>
    </>
  );
}
