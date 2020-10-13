import React, { useState, useEffect } from "react";
import PageIntro from "../../components/PageIntro/PageInto";
import { Row, Col, Card } from "react-bootstrap";
import axios from "axios";

const ImagesAll = () => {
  const [images, setImages] = useState();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND}/images/`)
      .then((res) => {
        setImages(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <div
        style={{
          top: "60px",
          position: "sticky",
          fontFamily: "Open Sans Condensed, sans-serif",
        }}
      >
        <PageIntro
          page={"Images"}
          pageintroMessage={
            "Here is the collection of all the uploaded images."
          }
        />
      </div>

      <Row className="m-3">
        <Card style={{ top: "-50px", width: "100%" }}>
          <Row className="m-3">
            {images &&
              images.map((image) => {
                return (
                  <Col lg={3} className=" p-1" key={image._id}>
                    <div
                      style={{
                        height: "50vh",
                        backgroundImage: `url("${process.env.REACT_APP_ASSETS_IMAGES}/images/${image.url}")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        borderRadius: "2px",
                        margin: "5px 0",
                      }}
                    ></div>
                  </Col>
                );
              })}
          </Row>
        </Card>
      </Row>
    </div>
  );
};

export default ImagesAll;
