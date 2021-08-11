import React, { Component, useState } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosNoAuth from "../../../../hooks/useAxiosNoAuth";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

import FormError from "../../../common/FormError";
import Swal from "sweetalert2";
import * as Icon from "react-bootstrap-icons";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Please enter your name")
    .min(3, "Your name needs to be atleast 3 characters"),
  email: yup
    .string()
    .required("Please enter your email address")
    .email("Please enter a valid email address"),
  housingname: yup
    .string()
    .required("Please enter the name of the establishment")
    .min(5, "The establishment name needs to be atleast 5 characters"),
  message: yup
    .string()
    .required("Please enter your message")
    .min(10, "Your message needs to be atleast 10 characters"),
});

export default function UpdateItem() {
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);

  const http = useAxiosNoAuth();

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    setSubmitting(true);
    setServerError(null);

    console.log(data);

    try {
      axios.defaults.headers.common = { Authorization: `bearer ${token}` };
      axios.put(`${baseURL}/${id}`).then(() => {
        setPost(null);
      });
    } catch (error) {
      console.log("error", error);
      setServerError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return <></>;
}
