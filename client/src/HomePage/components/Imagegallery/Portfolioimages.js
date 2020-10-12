import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import Images from "./Images";
import "./Imagegallery.css";
import "./Images.css";
import { Link } from "react-router-dom";

const Portfolioimages = ({ match }) => {
  const [portfolio, setPortfolio] = useState();
  const [images, setImages] = useState();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND}/photoshoots/${match.params.id}`)
      .then((res) => {
        setPortfolio(res.data);
        setImages(res.data.images);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [match.params.id]);

  return (
    <div>
      <div style={{ margin: "5px", backgroundColor: "grey" }}>
        <div>
          {portfolio && (
            <Row style={{ margin: "0px" }}>
              <Col
                lg={5}
                className="portfolio-intro-image"
                style={{
                  height: "80vh",
                  backgroundColor: "black",
                  backgroundImage: `url(${process.env.REACT_APP_ASSETS_IMAGES}/photoshoots/${portfolio.url})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  overflow: "hidden",
                }}
              >
                <Link
                  to="/imagegallery"
                  style={{
                    position: "fixed",
                    zIndex: "+2",
                    fontSize: "30px",
                    padding: "10px 20px",
                  }}
                >
                  <i className="fas fa-chevron-circle-left"></i>
                </Link>
              </Col>

              <Col>
                <a
                  className="backlink"
                  style={{
                    position: "fixed",
                    zIndex: "+2",
                    fontSize: "30px",
                    padding: "10px 20px",
                  }}
                  href="/imagegallery"
                >
                  <i className="fas fa-arrow-circle-left"></i>
                </a>
                <div className="image-header">
                  <div style={{ fontSize: "60px", fontFamily: "Lobster" }}>
                    {portfolio.name}
                  </div>
                  <div style={{ fontSize: "20px" }}>
                    {Date().slice(4, 16)}
                    &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;NISHA SHARMA
                  </div>
                </div>
              </Col>
            </Row>
          )}
        </div>
      </div>
      <div>
        <div>
          <Row style={{ margin: "5px" }}>
            {images &&
              images.map((image) => {
                return (
                  <Col
                    lg={4}
                    key={image}
                    style={{
                      padding: "0px",
                      margin: "0px",
                    }}
                  >
                    <Images id={image} />
                  </Col>
                );
              })}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Portfolioimages;
