import React, { useState, useContext, useEffect } from "react";
import { TODO_LIST } from "../../constants/api";
import ToDoItem from "./ToDoItem";
import ErrorMessage from "../../common/ErrorMessage";
import AuthContext from "../../context/AuthContext";
import { useHistory } from "react-router-dom";

const url = TODO_LIST;

// Henter api med fetch
function ToDoList() {
  const [TaskItems, setToDoList] = useState([]);
  const [error, setError] = useState(null);
  const [auth, setAuth] = useContext(AuthContext);
  const history = useHistory();

  useEffect(function () {
    async function fetchData() {
      //vist man ikke er logget inn redirectes man til login siden.
      if (auth === null) {
        history.push("/login");
      } else {
        try {
          const response = await fetch(url);

          if (response.ok) {
            const json = await response.json();
            //console.log(json);
            setToDoList(json);
          } else {
            setError("A server error occured");
          }
        } catch (error) {
          setError(error.toString());
        }
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
      {TaskItems.map(function (TaskItem) {
        const { id, Title, Description, Due, Finished } = TaskItem;

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
    </>
  );
}

export default ToDoList;
