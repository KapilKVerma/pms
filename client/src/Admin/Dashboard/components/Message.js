import React, { useState, useEffect } from "react";
import { Modal, Row, Col } from "react-bootstrap";
import axios from "axios";

const Message = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [message, setMessage] = useState();
  const { messageId } = props;

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND}/messages/${messageId}`)
      .then((res) => {
        setMessage(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [messageId]);

  const handleDelete = (messageId, e) => {
    e.preventDefault();
    axios
      .delete(`${process.env.REACT_APP_BACKEND}/messages/${messageId}/delete`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setMessage("");
  };
  return (
    <React.Fragment>
      {message ? (
        <Row
          key={message._id}
          style={{
            backgroundColor: "#ececec",
            margin: "2px",
            borderRadius: "5px",
            fontSize: "14px",
            padding: "5px",
          }}
        >
          <Col>{message.name}</Col>
          <Col lg={2}>{message.contactnumber}</Col>
          <Col lg={5}>{message.email}</Col>
          <Col
            lg={2}
            style={{
              borderRadius: "5px",
              backgroundColor: "#d8d8d8",
              textAlign: "center",
              fontWeight: "600",
              padding: "5px",
            }}
          >
            <span onClick={handleShow} style={{ cursor: "pointer" }}>
              Read
            </span>{" "}
            |{" "}
            <span
              onClick={(e) => {
                handleDelete(message._id, e);
              }}
              style={{ cursor: "pointer" }}
            >
              Delete
            </span>
          </Col>
        </Row>
      ) : null}
      {message && (
        <Modal centered show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title style={{ fontSize: "20px" }}>
              From: {message.name}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>{message.message}</Modal.Body>
        </Modal>
      )}
    </React.Fragment>
  );
};

export default Message;
