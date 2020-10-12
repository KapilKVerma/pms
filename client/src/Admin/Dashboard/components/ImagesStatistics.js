import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import axios from "axios";

const ImagesStatistics = () => {
  const [totalImages, setTotalimages] = useState();

  const findTotalviews = () => {
    let view = 0;
    if (totalImages) {
      for (let i = 0; i < totalImages.length; i++) {
        view = view + totalImages[i].views;
      }
    }
    return view;
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND}/images/`)
      .then((res) => {
        setTotalimages(res.data);
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
          Total Images: <h1>{totalImages ? totalImages.length : null}</h1>
        </Col>
        <Col
          style={{
            backgroundColor: "black",
            color: "white",
          }}
          className="p-3 m-1"
        >
          Images combined views:<h1> {findTotalviews()}</h1>
        </Col>
      </Row>
    </>
  );
};

export default ImagesStatistics;
