import React, { useContext } from "react";
import { UserContext } from "./App";

const LoadingSpinner = () => {
  const modelDetails = useContext(UserContext);

  return (
    <div
      style={{
        height: "100vh",
        textAlign: "center",
      }}
    >
      {modelDetails ? (
        <div>
          <h1
            style={{
              fontFamily: "Lobster",
              fontSize: "50px",
            }}
          >
            {modelDetails.firstname.slice(0, 1)}{" "}
            {modelDetails.lastname.slice(0, 1)}
          </h1>
          <h4>Loading...</h4>
        </div>
      ) : null}
    </div>
  );
};

export default LoadingSpinner;
