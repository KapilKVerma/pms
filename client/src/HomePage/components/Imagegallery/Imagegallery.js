import React, { useState, useEffect } from "react";

import Footer from "../Footer/Footer";
import Navigation from "../navigation/navigation";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import "./Imagegallery.css";
import "./Images.css";
import Photoshoot from "./Photoshoots";

const Imagegallery = () => {
  const [photoshoots, setPhotoshoots] = useState();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND}/photoshoots/`)
      .then((res) => {
        setPhotoshoots(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Navigation page={"Portfolio"} />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Row
          className="imagegallery-work"
          id="portfolio"
          style={{ width: "99.3%" }}
        >
          {photoshoots &&
            photoshoots.map((photoshoot) => {
              return (
                <Col
                  lg={3}
                  className="p-0 m-0"
                  key={photoshoot._id}
                  style={{
                    backgroundImage: `url(${process.env.REACT_APP_ASSETS_IMAGES}/photoshoots/${photoshoot.url})`,
                  }}
                >
                  <Photoshoot photoshoot={photoshoot} />
                </Col>
              );
            })}
        </Row>
      </div>
      <Footer />
    </>
  );
};

export default Imagegallery;
