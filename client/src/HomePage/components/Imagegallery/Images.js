import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";

const Images = (props) => {
  const [image, setImage] = useState();
  const [show, setShow] = useState(false);
  const [views, setViews] = useState(0);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const viewsCounter = () => {
    if (show === false) {
      setViews(views + 1);
      console.log(views + 1);
      axios
        .post(
          `${process.env.REACT_APP_BACKEND}/images/${props.id}/updateviews`,
          {
            views: views + 1,
          }
        )
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND}/images/` + props.id)
      .then((res) => {
        setImage(res.data);
        setViews(res.data.views);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.id, views]);

  return (
    <div onClick={viewsCounter}>
      {image && (
        <>
          <div
            className="photoshoot-image"
            style={{
              backgroundImage: `url("${process.env.REACT_APP_ASSETS_IMAGES}/images/${image.url}")`,
            }}
            onClick={handleShow}
          />
          <Modal show={show} onHide={handleClose} size="xl">
            <Modal.Header closeButton className="p-0 m-0">
              <div
                style={{
                  padding: "15px 5px ",
                  backgroundColor: "black",
                  color: "#d5dbdb",
                }}
              >
                Views: {views ? views : "0"}
              </div>
            </Modal.Header>
            <Modal.Body
              style={{
                height: "100vh",
                width: "100%",
                justifyContent: "center",
                display: "flex",
                backgroundColor: "#d5dbdb",
              }}
              className="p-0 m-0"
            >
              <img
                src={`${process.env.REACT_APP_ASSETS_IMAGES}/images/${image.url}`}
                style={{ height: "100%" }}
                alt={image.name}
              ></img>
            </Modal.Body>
          </Modal>
        </>
      )}
    </div>
  );
};

export default Images;
