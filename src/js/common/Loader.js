import React from "react";
import Spinner from "react-bootstrap/Spinner";
import { SolarSystemLoading } from "react-loadingg";

export const BookLoaderComponent = () => {
  return (
    <>
      <SolarSystemLoading color="white" />
    </>
  );
};

export function Loader() {
  return (
    <div className="d-flex justify-content-center">
      <Spinner animation="grow" variant="info" />
    </div>
  );
}
