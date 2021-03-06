import React from "react";
import Spinner from "react-bootstrap/Spinner";
import { SolarSystemLoading } from "react-loadingg";

export const BookLoaderComponent = () => {
  return (
    <>
      <div className="loader-background">
        <SolarSystemLoading color="white" />
      </div>
    </>
  );
};

export function Loader() {
  return (
    <>
      <div className="loader-background">
        <div className="d-flex justify-content-center">
          <Spinner animation="grow" variant="info" />
        </div>
      </div>
    </>
  );
}
