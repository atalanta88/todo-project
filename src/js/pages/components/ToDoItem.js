import React, { useState, useContext } from "react";
import axios from "axios";
import { TODO_LIST } from "../../constants/api";
import AuthContext from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../../common/FormError";
import * as Icon from "react-bootstrap-icons";

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import Moment from "react-moment";

const baseURL = TODO_LIST;

const schema = yup.object().shape({
  Due: yup.date(),

  Title: yup
    .string()
    .required("Enter the title")
    .min(3, "Title needs to be atleast 3 characters"),

  Description: yup.string(),
});

function ToDoItem({ Title, Description, id, Due, Finished }) {
  const [show, setShow] = useState(false);
  const [post, setPost] = useState(null);

  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [date, setDate] = useState(new Date());
  const [auth, setAuth] = useContext(AuthContext);

  const dateToFormat = `${Due}`;

  const token = auth.jwt;

  function deletePost() {
    var ConfirmDelete = window.confirm(
      "You want to delete an user! are you sure?"
    );

    try {
      axios.defaults.headers.common = { Authorization: `bearer ${token}` };
      if (ConfirmDelete == true) {
        axios.delete(`${baseURL}/${id}`).then(() => {
          alert("Post deleted!");
          setPost(null);
          window.location.reload(false);
        });
      } else {
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
        <Button variant="outline-light" onClick={handleShow}>
          <Icon.PencilSquare color="grey" size={20} />
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
                </Form.Row>
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
      <Container key={id}>
        <Row>
          <Col>{Title}</Col>
          <Col>
            {" "}
            <small className="text-muted">
              {" "}
              <Moment format="dddd DD - MMM   YY">{dateToFormat}</Moment>
            </small>
          </Col>
          <Col>
            <Button onClick={deletePost} variant="outline-light">
              <Icon.Trash color="grey" size={20} />
            </Button>
            <UpdateItem />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ToDoItem;
