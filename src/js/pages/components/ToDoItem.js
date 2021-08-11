import React, { useState, useContext } from "react";
import axios from "axios";
import { TODO_LIST } from "../../constants/api";
import AuthContext from "../../context/AuthContext";

import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import Moment from "react-moment";

function ToDoItem({ Title, Description, id, Due, Finished }) {
  const dateToFormat = `${Due}`;
  const baseURL = TODO_LIST;

  const [post, setPost] = useState(null);
  const [auth, setAuth] = useContext(AuthContext);

  const token = auth.jwt;

  function deletePost() {
    try {
      axios.defaults.headers.common = { Authorization: `bearer ${token}` };
      axios.delete(`${baseURL}/${id}`).then(() => {
        alert("Post deleted!");
        setPost(null);
        window.location.reload(false);
      });
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <>
      <Card key={id} border="light" className="inner-accordion-card">
        <Card.Header className="card-header-remove-background-color" as="h6">
          {Title}
          <Card.Text>
            <small className="text-muted">
              {" "}
              <Moment format="dddd / MMM / DD / YYYY">{dateToFormat}</Moment>
            </small>
          </Card.Text>
        </Card.Header>
        <Card.Body className="inner-accordion-card-body">
          <Card>
            <Card.Body>
              <Card.Text>{Description}</Card.Text>
              <Card.Text>{Finished}</Card.Text>
            </Card.Body>
          </Card>
          <Button onClick={deletePost} variant="danger">
            Slett
          </Button>
          <Button variant="warning">Rediger</Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default ToDoItem;
