import React from "react";

import Card from "react-bootstrap/Card";
import Moment from "react-moment";

function ToDoItem({ Title, Description, id, Due, Finished }) {
  const dateToFormat = `${Due}`;

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
        </Card.Body>
      </Card>
    </>
  );
}

export default ToDoItem;
