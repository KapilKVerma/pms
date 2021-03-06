import React from "react";
import { Jumbotron } from "react-bootstrap";

const PageInto = (props) => {
  return (
    <div>
      <Jumbotron
        className="shadow"
        style={{
          borderRadius: "0px",
          margin: "0px",
          padding: "0px",
        }}
      >
        <div
          style={{
            backgroundColor: "black",
            opacity: "0.8",
            width: "100wh",
            height: "100%",
            padding: "40px",
            color: "white",
          }}
        >
          <h1>{props.page}</h1>
          <p>{props.pageintroMessage}</p>
        </div>
      </Jumbotron>
    </div>
  );
};

export default PageInto;
