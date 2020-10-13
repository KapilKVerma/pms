import React, { useState } from "react";
import { Button, Row, Col, Form, Modal } from "react-bootstrap";
import axios from "axios";

const ProfileImageForm = (props) => {
  const { modelDetails } = props;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [modelData, setModelData] = useState({
    homeimage: "",
    contactmeimage: "",
    aboutmeimage: "",
  });

  const submitForm = (e) => {
    e.preventDefault();
    if (!modelData.homeimage) {
      alert("Fields are empty! Try again");
      return;
    }
    if (!modelData.contactmeimage) {
      alert("Fields are empty! Try again");
      return;
    }
    if (!modelData.aboutmeimage) {
      alert("Fields are empty! Try again");
      return;
    } else {
      const data = new FormData();
      data.append("images", modelData.homeimage);
      data.append("images", modelData.contactmeimage);
      data.append("images", modelData.aboutmeimage);

      axios
        .post(
          `${process.env.REACT_APP_BACKEND}/userdetails/${modelDetails._id}/update/images`,
          data
        )
        .then((res) => {
          if (res) alert(res.data);
          handleClose();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h6 className="p-2">Profile Images</h6>
        <Button className="m-2" variant="dark" size="sm" onClick={handleShow}>
          <i className="far fa-edit"></i>
        </Button>
      </div>
      <Row className="row-style">
        <Col lg={4}>Home Page Background:</Col>
        <Col>
          <div
            className="background-images shadow"
            style={{
              backgroundImage: `url("${process.env.REACT_APP_ASSETS_IMAGES}/user-images/${modelDetails.homeimage}")`,
              width: "100%",
            }}
          />
        </Col>
      </Row>
      <Row className="row-style">
        <Col lg={4}>About Page Background:</Col>
        <Col>
          <div
            className="background-images shadow"
            style={{
              backgroundImage: `url("${process.env.REACT_APP_ASSETS_IMAGES}/user-images/${modelDetails.aboutmeimage}")`,
              width: "100%",
            }}
          ></div>
        </Col>
      </Row>

      <Row className="row-style">
        <Col lg={4}>Contact Page Background:</Col>
        <Col>
          <div
            className="background-images shadow"
            style={{
              backgroundImage: `url("${process.env.REACT_APP_ASSETS_IMAGES}/user-images/${modelDetails.contactmeimage}")`,
              width: "100%",
            }}
          ></div>
        </Col>
      </Row>
      <Modal
        show={show}
        size="lg"
        onHide={handleClose}
        className="personaldetails-form "
      >
        {" "}
        <Form encType="multipart/form-data">
          <Modal.Header closeButton>
            <h4> Upload Profile Images</h4>
          </Modal.Header>
          <Modal.Body>
            <div className="p-3">
              <Row className="pt-1">
                <Form.Group>
                  <Form.File
                    label="Home Page Background:"
                    onChange={(e) => {
                      setModelData({
                        ...modelData,
                        homeimage: e.target.files[0],
                      });
                    }}
                  />
                </Form.Group>
              </Row>
              <Row className="pt-1">
                <Form.Group>
                  <Form.File
                    label="Contact Page Background:"
                    onChange={(e) => {
                      setModelData({
                        ...modelData,
                        contactmeimage: e.target.files[0],
                      });
                    }}
                  />
                </Form.Group>
              </Row>
              <Row className="pt-1">
                <Form.Group>
                  <Form.File
                    label="About Page Background:"
                    onChange={(e) => {
                      setModelData({
                        ...modelData,
                        aboutmeimage: e.target.files[0],
                      });
                    }}
                  />
                </Form.Group>
              </Row>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="dark"
              type="submit"
              className="m-1"
              onClick={submitForm}
            >
              Submit
            </Button>
            <Button
              variant="dark"
              type="submit"
              className="m-1"
              onClick={handleClose}
            >
              Close
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default ProfileImageForm;
