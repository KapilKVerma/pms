import React, { useState, useEffect } from "react";
import { Card, Row, Col, Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import EditPhotoshoot from "./EditPhotoshoot";

import "./Editportfoliopage.css";
const Editaboutmepage = () => {
  const [newPhotoshoot, setNewPhotoshoot] = useState({
    name: "",
    url: "",
  });
  const [photoshoots, setPhotoshoots] = useState();
  const [photoshootCreate, setPhotoshootCreate] = useState(false);
  const [photoshootDelete, setPhotoshootDelete] = useState(false);
  const [updatePhotoshoot, setUpdatePhotoshoot] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setPhotoshootCreate(false);
    setPhotoshootDelete(false);
    setUpdatePhotoshoot(false);
    axios
      .get(`${process.env.REACT_APP_BACKEND}/photoshoots/`)
      .then((res) => {
        setPhotoshoots(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [photoshootCreate, photoshootDelete, updatePhotoshoot]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Creating Photoshoot
  const handlePhotshootCreate = () => {
    if (!newPhotoshoot.url)
      alert("Photshoot's image is not selected!. Try again");
    const photoshootData = new FormData();
    photoshootData.append("name", newPhotoshoot.name);
    photoshootData.append("url", newPhotoshoot.url);

    axios
      .post(`${process.env.REACT_APP_BACKEND}/photoshoots/add`, photoshootData)
      .then((res) => {
        if (res) setPhotoshootCreate(true);
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Card>
      <Row className="m-3">
        {photoshoots &&
          photoshoots.map((photoshoot) => {
            return (
              <Col lg={3} className="p-1 " key={photoshoot._id}>
                <EditPhotoshoot
                  photoshoot={photoshoot}
                  setPhotoshootDelete={setPhotoshootDelete}
                  setUpdatePhotoshoot={setUpdatePhotoshoot}
                />
              </Col>
            );
          })}
        <Col
          lg={3}
          className="p-1 "
          style={{
            margin: " 10px 0",
            borderRadius: "2px",
            textAlign: "center",
          }}
        >
          <Button
            variant="dark"
            style={{ height: "100%", width: "100%", fontSize: "100px" }}
            onClick={handleShow}
          >
            +
          </Button>
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Photoshoot</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form encType="multipart/form-data">
            <Form.Group>
              <Form.Label>Photoshoot Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                onChange={(e) => {
                  setNewPhotoshoot({ ...newPhotoshoot, name: e.target.value });
                }}
              />
            </Form.Group>

            <Form.Group>
              <Form.File
                label="Upload Image"
                onChange={(e) => {
                  setNewPhotoshoot({
                    ...newPhotoshoot,
                    url: e.target.files[0],
                  });
                }}
              />
            </Form.Group>

            <Button
              className="m-2"
              variant="dark"
              type="submit"
              onClick={handlePhotshootCreate}
            >
              Submit
            </Button>
            <Button className="m-2" variant="dark" onClick={handleClose}>
              Close
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Card>
  );
};

export default Editaboutmepage;
