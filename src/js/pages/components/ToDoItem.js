import React, { useState, useContext } from "react";
import axios from "axios";
import { TODO_LIST } from "../../constants/api";
import AuthContext from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../../common/FormError";
import * as Icon from "react-bootstrap-icons";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import Moment from "react-moment";
import { Redirect } from "react-router-dom";

const baseURL = TODO_LIST;

const schema = yup.object().shape({
  Due: yup.date().required("Set a date").typeError("Set a date"),

  Title: yup.string().required("Update task"),
});

function ToDoItem({ Title, id, Due, Finished }) {
  const [show, setShow] = useState(false);
  const [post, setPost] = useState(null);

  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [date, setDate] = useState(new Date());
  const [auth, setAuth] = useContext(AuthContext);

  const dateToFormat = `${Due}`;

  const token = auth.jwt;

  function deletePost() {
    var ConfirmDelete = window.confirm("Delete the task?");

    try {
      axios.defaults.headers.common = { Authorization: `bearer ${token}` };
      if (ConfirmDelete == true) {
        axios.delete(`${baseURL}/${id}`).then(() => {
          setPost(null);
          window.location.reload(false);
        });
      } else {
        //Do nothing
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    setSubmitting(true);
    setServerError(null);

    let formData = new FormData();
    formData.append("data", JSON.stringify(data));

    try {
      axios.defaults.headers.common = { Authorization: `bearer ${token}` };
      const response = await axios.put(`${baseURL}/${id}`, formData);
      console.log("response", response);
    } catch (error) {
      console.log("error", error);
      setServerError(error.toString());
    } finally {
      setSubmitting(false);
      window.location.reload(false);
    }
  }

  function UpdateItem() {
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
      <>
        <Button variant="icon-button" onClick={handleShow}>
          <Icon.PencilSquare color="white" size={20} />
        </Button>

        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Body>
            {" "}
            <Container>
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
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                      {errors.Due && (
                        <FormError>
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
                        placeholder={Title}
                        name="Title"
                        ref={register}
                        autoFocus
                      />
                      {errors.Title && (
                        <FormError>
                          <Icon.ExclamationCircle color="white" size={20} />
                          {errors.Title.message}
                        </FormError>
                      )}
                    </Form.Group>
                  </Col>
                </Form.Row>

                <Form.Group name="buttonSend">
                  <Button type="submit" value="Submit" variant="outline-dark">
                    {submitting ? "Submitting..." : "Submit"}
                  </Button>
                </Form.Group>
              </Form>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  return (
    <>
      <Row>
        <Col>
          <Container className="todo-item-background" key={id}>
            <Row>
              <Col>
                <Card.Title>{Title}</Card.Title>
              </Col>
            </Row>

            <Row>
              <Col>
                {" "}
                <small className="text-muted">
                  {" "}
                  <Moment format="dddd DD - MMM   YY">{dateToFormat}</Moment>
                </small>
              </Col>
            </Row>
          </Container>
        </Col>
        <Col sm={2}>
          <Container className="icons-background">
            {" "}
            <Button onClick={deletePost} variant="icon-button">
              <Icon.Trash color="white" size={20} />
            </Button>
            <UpdateItem />
          </Container>
        </Col>
      </Row>
    </>
  );
}

export default ToDoItem;
