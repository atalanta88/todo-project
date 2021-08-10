import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import ToDoList from "./components/ToDoList";
import AddToDoItem from "./components/AddToDoItem";

export default function HomePage() {
  return (
    <>
      <div className="background-wrapper-home">
        <Jumbotron>
          <AddToDoItem />
          <Container className="text-container-home">
            <h1>To do list</h1>
            <ToDoList />
          </Container>
        </Jumbotron>
      </div>
    </>
  );
}
