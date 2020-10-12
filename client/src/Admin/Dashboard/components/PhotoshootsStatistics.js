import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import axios from "axios";

const PhotoshootsStatistics = () => {
  const [totalPhotoshoots, setTotalPhotoshoots] = useState();

  const findTotalviews = () => {
    let view = 0;
    if (totalPhotoshoots) {
      for (let i = 0; i < totalPhotoshoots.length; i++) {
        view = view + totalPhotoshoots[i].views;
      }
    }
    return view;
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND}/photoshoots/`)
      .then((res) => {
        setTotalPhotoshoots(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Row>
        <Col
          style={{
            backgroundColor: "black",
            color: "white",
          }}
          className="p-3 m-1"
        >
          Total Photoshoots:{" "}
          <h1>{totalPhotoshoots ? totalPhotoshoots.length : null}</h1>
        </Col>
        <Col
          style={{
            backgroundColor: "black",
            color: "white",
          }}
          className="p-3 m-1"
        >
          Photoshoots combined views:<h1>{findTotalviews()}</h1>
        </Col>
      </Row>
    </>
  );
};

export default PhotoshootsStatistics;
