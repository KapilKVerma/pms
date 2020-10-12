import React, { useState } from "react";
import { Button, Row, Col, Form, Modal } from "react-bootstrap";
import axios from "axios";

const PersonalInfoForm = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { modelDetails } = props;
  const [modelData, setModelData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    number: "",
    addressline1: "",
    addressline2: "",
    city: "",
    postcode: "",
  });

  const submitForm = (e) => {
    e.preventDefault();
    if (!modelData.firstname) {
      alert("First name field is empty.");
      return;
    }
    if (!modelData.lastname) {
      alert("Last name field is empty.");
      return;
    }
    if (!modelData.email) {
      alert("Email field is empty.");
      return;
    }
    if (!modelData.number) {
      alert("Number field is empty.");
      return;
    }
    if (!modelData.addressline1) {
      alert("Address field is empty.");
      return;
    }
    if (!modelData.addressline2) {
      alert("Address field is empty.");
      return;
    }
    if (!modelData.city) {
      alert("Address field is empty.");
      return;
    }
    if (!modelData.postcode) {
      alert("Address field is empty.");
      return;
    } else {
      axios
        .post(
          `${process.env.REACT_APP_BACKEND}/userdetails/${modelDetails._id}/update/pi`,
          modelData
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#ececec",
          borderRadius: "0px",
        }}
      >
        <h6 className="p-2">Your Profile Information</h6>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h6 className="p-2">Personal Information</h6>
        <Button className="m-2" variant="dark" size="sm" onClick={handleShow}>
          <i className="far fa-edit"></i>
        </Button>
      </div>
      <Row className="row-style">
        <Col lg={4}>Name:</Col>
        <Col>
          {modelDetails.firstname} {modelDetails.lastname}
        </Col>
      </Row>
      <Row className="row-style">
        <Col lg={4}>Email:</Col>
        <Col>{modelDetails.email}</Col>
      </Row>
      <Row className="row-style">
        <Col lg={4}>Contact No.:</Col>
        <Col>{modelDetails.number}</Col>
      </Row>
      <Row className="row-style">
        <Col lg={4}>Address:</Col>
        <Col>
          {modelDetails.address.addressline1},{" "}
          {modelDetails.address.addressline2}, {modelDetails.address.city}{" "}
          {modelDetails.address.postcode}
        </Col>
      </Row>

      <Modal
        show={show}
        size="lg"
        onHide={handleClose}
        className="personaldetails-form "
      >
        <Form encType="multipart/form-data">
          <Modal.Header closeButton>
            <h4> Edit Personal Information</h4>
          </Modal.Header>
          <Modal.Body>
            <Row className="p-1">
              <Col>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  placeholder={modelDetails.firstname}
                  onChange={(e) => {
                    setModelData({
                      ...modelData,
                      firstname: e.target.value,
                    });
                  }}
                  type="text"
                />
              </Col>
              <Col>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  placeholder={modelDetails.lastname}
                  onChange={(e) => {
                    setModelData({
                      ...modelData,
                      lastname: e.target.value,
                    });
                  }}
                  type="text"
                />
              </Col>
            </Row>
            <Row className="p-1">
              <Col>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  placeholder={modelDetails.email}
                  onChange={(e) => {
                    setModelData({
                      ...modelData,
                      email: e.target.value,
                    });
                  }}
                  type="email"
                />
              </Col>
              <Col>
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  placeholder={modelDetails.number}
                  onChange={(e) => {
                    setModelData({
                      ...modelData,
                      number: e.target.value,
                    });
                  }}
                  type="number"
                />
              </Col>
            </Row>

            <div className="p-3">
              <Row className="pt-1">
                <Form.Group>
                  <Row>
                    <Form.Label className="m-3">Address:</Form.Label>
                  </Row>

                  <Row>
                    <Col>
                      <Form.Control
                        placeholder={modelDetails.address.addressline1}
                        onChange={(e) => {
                          setModelData({
                            ...modelData,
                            addressline1: e.target.value,
                          });
                        }}
                        type="text"
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        placeholder={modelDetails.address.addressline2}
                        onChange={(e) => {
                          setModelData({
                            ...modelData,
                            addressline2: e.target.value,
                          });
                        }}
                        type="text"
                      />
                    </Col>
                  </Row>

                  <Row className="pt-1">
                    <Col>
                      <Form.Control
                        placeholder={modelDetails.address.city}
                        onChange={(e) => {
                          setModelData({
                            ...modelData,
                            city: e.target.value,
                          });
                        }}
                        type="text"
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        placeholder={modelDetails.address.postcode}
                        onChange={(e) => {
                          setModelData({
                            ...modelData,
                            postcode: e.target.value,
                          });
                        }}
                        type="text"
                      />
                    </Col>
                  </Row>
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

export default PersonalInfoForm;
