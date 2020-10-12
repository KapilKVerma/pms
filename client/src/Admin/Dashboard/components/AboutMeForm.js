import React, { useState } from "react";
import { Button, Row, Col, Form, Modal } from "react-bootstrap";
import axios from "axios";

const AboutMeForm = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { modelDetails } = props;
  const [modelData, setModelData] = useState();

  const submitForm = (e) => {
    e.preventDefault();
    if (
      !modelData.aboutme ||
      !modelData.waist ||
      !modelData.bust ||
      !modelData.hip
    ) {
      alert("Fields are empty.");
      return;
    } else {
      axios
        .put(
          `${process.env.REACT_APP_BACKEND}/userdetails/${modelDetails._id}/update/am`,
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
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h6 className="p-2">About Me</h6>
        <Button className="m-2" variant="dark" size="sm" onClick={handleShow}>
          <i className="far fa-edit"></i>
        </Button>
      </div>
      <Row className="row-style">
        <Col lg={4}>Message:</Col>
        <Col>{modelDetails.aboutme}</Col>
      </Row>
      <Row className="row-style">
        <Col lg={4}>My Quote:</Col>
        <Col> "{modelDetails.quote}"</Col>
      </Row>
      <Row className="row-style">
        <Col lg={4}> Body Dimensions:</Col>
        <Col>
          <div>
            Height {modelDetails.dimensions.height} | Waist
            {modelDetails.dimensions.waist} | Weight
            {modelDetails.dimensions.weight} | Bust
            {modelDetails.dimensions.bust} | Hair {modelDetails.dimensions.hair}
            | Hip {modelDetails.dimensions.hip}
          </div>
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
            <h4> Edit About Me</h4>
          </Modal.Header>
          <Modal.Body>
            <div className="p-3">
              <Row className="pt-1">
                <Form.Label>My Quote</Form.Label>
                <Form.Control
                  placeholder={modelDetails.quote}
                  onChange={(e) => {
                    setModelData({
                      ...modelData,
                      quote: e.target.value,
                    });
                  }}
                  type="text"
                />
              </Row>
              <Row className="p-1">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  placeholder={modelDetails.aboutme}
                  onChange={(e) => {
                    setModelData({
                      ...modelData,
                      aboutme: e.target.value,
                    });
                  }}
                  as="textarea"
                  rows="3"
                />
              </Row>
              <Row className="pt-1">
                <Form.Group>
                  <Row>
                    <Form.Label className="m-3"> Body dimesions:</Form.Label>
                  </Row>

                  <Row>
                    <Col>
                      <Form.Control
                        placeholder={modelDetails.dimensions.height}
                        onChange={(e) => {
                          setModelData({
                            ...modelData,
                            height: e.target.value,
                          });
                        }}
                        type="text"
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        placeholder={modelDetails.dimensions.waist}
                        onChange={(e) => {
                          setModelData({
                            ...modelData,
                            waist: e.target.value,
                          });
                        }}
                        type="text"
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        placeholder={modelDetails.dimensions.weight}
                        onChange={(e) => {
                          setModelData({
                            ...modelData,
                            weight: e.target.value,
                          });
                        }}
                        type="text"
                      />
                    </Col>
                  </Row>

                  <Row className="pt-1">
                    <Col>
                      <Form.Control
                        placeholder={modelDetails.dimensions.hip}
                        onChange={(e) => {
                          setModelData({
                            ...modelData,
                            hip: e.target.value,
                          });
                        }}
                        type="text"
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        placeholder={modelDetails.dimensions.bust}
                        onChange={(e) => {
                          setModelData({
                            ...modelData,
                            bust: e.target.value,
                          });
                        }}
                        type="text"
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        placeholder={modelDetails.dimensions.hair}
                        onChange={(e) => {
                          setModelData({
                            ...modelData,
                            hair: e.target.value,
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

export default AboutMeForm;
