import React, { useState } from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import EditImage from "./EditImage";
import axios from "axios";
import { useEffect } from "react";

const EditPhotoshoot = (props) => {
  const { setPhotoshootDelete, setUpdatePhotoshoot } = props;
  const [show, setShow] = useState(false);
  const [smShow, setSmShow] = useState(false);
  const [showForm, setShowForm] = useState("Show-Form");
  const [deleteImage, setDeleteImage] = useState(false);
  const [photoshoot, setPhotoshoot] = useState({
    name: props.photoshoot.name,
    url: "",
  });
  const [newImage, setNewImage] = useState({
    name: "",
    url: "",
    photoshootId: props.photoshoot._id,
  });
  const [imageCreate, setImageCreate] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleImageModalClose = () => setSmShow(false);

  useEffect(() => {
    setImageCreate(false);
  }, [imageCreate, deleteImage]);

  const handleShowForm = () => {
    if (showForm === "Show-Form") setShowForm();
    else setShowForm("Show-Form");
  };

  // Update Photoshoot
  const handlePhotoshootUpdate = () => {
    if (!photoshoot.url) alert("Image is not selected! Try again.");
    const data = new FormData();
    data.append("name", photoshoot.name);
    data.append("url", photoshoot.url);
    axios
      .post(
        `${process.env.REACT_APP_BACKEND}/photoshoots/${props.photoshoot._id}/update`,
        data
      )
      .then((res) => {
        setUpdatePhotoshoot(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Delete Photoshoot
  const handlePhotoshootDelete = () => {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND}/photoshoots/${props.photoshoot._id}/delete`
      )
      .then((res) => {
        if (res) {
          setPhotoshootDelete(true);
          alert("Photoshoot successfully deleted!!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Create Image
  const handleImageCreate = () => {
    if (!newImage.url) alert("Image is not selected! Try again");
    const data = new FormData();
    data.append("name", newImage.name);
    data.append("url", newImage.url);
    data.append("photoshootId", newImage.photoshootId);

    axios
      .post(`${process.env.REACT_APP_BACKEND}/images/add`, data)
      .then((res) => {
        handleImageModalClose();
        setImageCreate(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      className="shadow"
      style={{
        height: "70vh",
        backgroundImage: `url("${process.env.REACT_APP_ASSETS_IMAGES}/photoshoots/${props.photoshoot.url}")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        borderRadius: "2px",
        margin: "5px 0",
      }}
    >
      <div style={{ textAlign: "end", margin: "5px" }}>
        <div
          style={{
            textAlign: "start",
            padding: "30px",
            color: "#d5dbdb",
            backgroundColor: "Black",
            margin: "0px",
            display: "absolute",
            top: "0",
          }}
          className={showForm}
        >
          {/* Update Form */}
          <Form>
            <Form.Group encType="multipart/form-data">
              <Form.Label>Photoshoot Name</Form.Label>
              <Form.Control
                type="text"
                placeholder={photoshoot.name}
                value={photoshoot.name}
                onChange={(e) => {
                  setPhotoshoot({ ...photoshoot, name: e.target.value });
                }}
              />
            </Form.Group>

            <Form.Group>
              <Form.File
                label="Upload Image"
                onChange={(e) => {
                  setPhotoshoot({
                    ...photoshoot,
                    url: e.target.files[0],
                  });
                }}
              />
            </Form.Group>

            <Button
              className="m-1"
              variant="dark"
              type="submit"
              onClick={handlePhotoshootUpdate}
            >
              Submit
            </Button>

            <Button
              className="m-1"
              variant="dark"
              type="button"
              onClick={handleShowForm}
            >
              Close
            </Button>
          </Form>
        </div>
      </div>

      <div>
        <div
          style={{
            marginLeft: "10px",
            width: "100%",
            marginTop: "38%",
          }}
        >
          <div
            style={{
              color: "#d5dbdb",
              backgroundColor: "black",
              width: "40%",
              padding: "5px",
              fontSize: "16px",
              marginBottom: "2px",
            }}
          >
            Views: {props.photoshoot.views}
          </div>
          <div
            style={{
              color: "#d5dbdb",
              backgroundColor: "black",
              width: "60%",
              padding: "5px",
              fontSize: "14px",
            }}
          >
            Name: {props.photoshoot.name}
          </div>
          <Button
            size="sm"
            style={{ margin: "5px" }}
            variant="dark"
            onClick={handleShowForm}
          >
            <i className="far fa-edit"></i>
          </Button>
          <Button
            size="sm"
            style={{ margin: "5px" }}
            variant="dark"
            onClick={handlePhotoshootDelete}
          >
            <i className="far fa-trash-alt"></i>
          </Button>
          <Button
            size="sm"
            style={{ margin: "5px" }}
            variant="outline-light"
            onClick={handleShow}
          >
            <i className="fas fa-angle-double-right"></i>
          </Button>
        </div>

        {/* Photoshoot Model */}
        <Modal size="xl" centered show={show} onHide={handleClose}>
          <Modal.Body>
            {props.photoshoot.name} - Add Images
            <Row>
              {props.photoshoot.images &&
                props.photoshoot.images.map((image) => {
                  return (
                    <Col lg={4} key={image}>
                      <EditImage
                        image={image}
                        id={props.photoshoot._id}
                        deleteImage={deleteImage}
                        setDeleteImage={setDeleteImage}
                      />
                    </Col>
                  );
                })}
              <Col
                lg={4}
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
                  onClick={() => setSmShow(true)}
                >
                  +
                </Button>
              </Col>

              {/* Add Image - Model */}
              <Modal
                size="md"
                show={smShow}
                onHide={() => setSmShow(false)}
                aria-labelledby="example-modal-sizes-title-sm"
                centered
              >
                <Modal.Header closeButton>
                  <Modal.Title id="example-modal-sizes-title-sm">
                    Add Image
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form encType="multipart/form-data">
                    <Form.Group>
                      <Form.Label>Image Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Name"
                        onChange={(e) => {
                          setNewImage({
                            ...newImage,
                            name: e.target.value,
                          });
                        }}
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.File
                        label="Upload Image"
                        onChange={(e) => {
                          setNewImage({ ...newImage, url: e.target.files[0] });
                        }}
                      />
                    </Form.Group>

                    <Button
                      className="m-2"
                      variant="dark"
                      type="submit"
                      onClick={handleImageCreate}
                    >
                      Submit
                    </Button>
                    <Button
                      className="m-2"
                      variant="dark"
                      onClick={handleImageModalClose}
                    >
                      Close
                    </Button>
                  </Form>
                </Modal.Body>
              </Modal>
            </Row>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default EditPhotoshoot;
