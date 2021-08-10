import React from "react";
import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { TODO_LIST } from "../../constants/api";
import ToDoItem from "./ToDoItem";
import ErrorMessage from "../../common/ErrorMessage";

const url = TODO_LIST;

function ToDoList() {
  const [contacts, setToDoList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(function () {
    async function fetchData() {
      try {
        const response = await fetch(url);

        if (response.ok) {
          const json = await response.json();
          console.log(json);
          setToDoList(json);
        } else {
          setError("A server error occured");
        }
      } catch (error) {
        setError(error.toString());
      }
    }
    fetchData();
  }, []);

  if (error) {
    return <ErrorMessage message={`Error: ${error}`} />;
  }

  return (
    <>
      {" "}
      <Card>
        <Card.Body className="accordion-card-body">
          {contacts.map(function (contact) {
            const { id, Title, Description, Due, Finished } = contact;

            return (
              <ToDoItem
                key={id}
                Title={Title}
                Description={Description}
                id={id}
                Finished={Finished}
                Due={Due}
              />
            );
          })}
        </Card.Body>
      </Card>
    </>
  );
}

export default ToDoList;
