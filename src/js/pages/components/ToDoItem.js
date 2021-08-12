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
import { useHistory } from "react-router-dom";

const baseURL = TODO_LIST;

//Bruker yup som validation schema for forms.
//Det viser en beskjed/error message når brukere ikke legger inn riktige values.

const schema = yup.object().shape({
  Due: yup.date().required("Set a date").typeError("Set a date"),

  Title: yup.string().required("Update task"),
});

//Vi henter props fra ToDoList for å bruke her for å vise frem to do list.

function ToDoItem({ Title, id, Due }) {
  const [post, setPost] = useState(null);

  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);
  const history = useHistory();

  const [date, setDate] = useState(new Date());
  const dateToFormat = `${Due}`;

  //JWT token er lagret i local storage -
  // og vi lager en variabel som vi kan bruke når vi trenger autorisering.
  const [auth, setAuth] = useContext(AuthContext);
  const token = auth.jwt;

  //Brukeren kan slette en task ved å trykke på søppel ikonet.
  function deletePost() {
    var ConfirmDelete = window.confirm("Delete the task?");

    try {
      axios.defaults.headers.common = { Authorization: `bearer ${token}` };
      if (ConfirmDelete == true) {
        axios.delete(`${baseURL}/${id}`).then(() => {
          setPost(null);
          history.push("/");
        });
      } else {
        //Do nothing
      }
    } catch (error) {
      //console.log("error", error);
    }
  }

  // Det som blir skrevet på input fields,
  // i forms registreres i register og sendt til databasen vist autoriseringen blir godkjent.
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  //Når brukeren er ferdig å legge inn en task,
  //trigger denne funksjonen og sender autorisering til header,
  //sammen med data fra input som poster en ny task til databasen.
  async function onSubmit(data) {
    setSubmitting(true);
    setServerError(null);

    let formData = new FormData();
    formData.append("data", JSON.stringify(data));

    try {
      axios.defaults.headers.common = { Authorization: `bearer ${token}` };
      const response = await axios.put(`${baseURL}/${id}`, formData);
      //console.log("response", response);
    } catch (error) {
      //console.log("error", error);
      setServerError(error.toString());
    } finally {
      setSubmitting(false);
      history.push("/");
    }
  }

  const [show, setShow] = useState(false);

  function UpdateItem() {
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
      <>
        <Button variant="icon-button" onClick={handleShow}>
          <Icon.PencilSquare color="white" size={20} />
        </Button>

        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header>
            <Modal.Title>Update task</Modal.Title>
          </Modal.Header>
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
                        autoFocus={false}
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
                        autoFocus={false}
                        placeholder={Title}
                        name="Title"
                        ref={register}
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
                    {submitting ? "ADDING..." : "ADD"}
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
                  <Moment add={{ days: 1 }} format="dddd, MMMM Do YYYY">
                    {dateToFormat}
                  </Moment>
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
