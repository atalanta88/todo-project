import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import ToDoList from "./components/ToDoList";

export default function HomePage() {
  return (
    <>
      <div className="background-wrapper-home">
        <Jumbotron>
          <Container className="text-container-home">
            <h1>To do list</h1>
            <ToDoList />
          </Container>
        </Jumbotron>
      </div>
    </>
  );
}
