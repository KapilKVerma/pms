import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./navigation.css";

const navigation = (props) => {
  return (
    <div
      className="shadow"
      style={{
        padding: "0px",
        position: "sticky",
        top: "0",
        zIndex: "+2",
        backgroundColor: "white",
        overflowX: "hidden",
      }}
    >
      <Row>
        <Col lg={1} style={{ padding: "0px" }}>
          <div className="logo">NS </div>
        </Col>
        <Col lg={2} className="pt-2">
          <span
            className="m-4"
            style={{ fontFamily: " Lobster", fontSize: "30px" }}
          >
            {props.page}
          </span>
        </Col>
        <Col
          style={{
            display: "flex",
            flexDirection: "row",
            fontSize: "13px",
            margin: "5px",
            justifyContent: "flex-end",
          }}
          className="pt-2"
        >
          <Link to="/" className="link">
            <div className="m-1 mr-3 ">Home</div>
          </Link>
          <Link to="/imagegallery" className="link">
            <div className="m-1 mr-3 ">Portfolio</div>
          </Link>

          <Link to="/aboutme" className="link">
            <div className="m-1 mr-3 ">About Me</div>
          </Link>
          <Link to="/contact" className="link">
            <div className="m-1 mr-5 ">Contant</div>
          </Link>
          <Row className="">
            <i className="fab fa-instagram-square m-2"></i>
            <i className="fab fa-facebook-square m-2 mr-5"></i>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default navigation;
