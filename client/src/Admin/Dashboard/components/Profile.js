import React, { useState, useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";
import PageIntro from "./PageIntro/PageInto";
import PersonalInfoForm from "./PersonalInfoForm";
import AboutMeForm from "./AboutMeForm";
import ProfileImageForm from "./ProfileImageForm";

import "./Profile.css";

const Profile = (props) => {
  const { modelDetails } = props;
  const [uploadImages, setUploadImages] = useState(false);

  const setState = (value) => {
    setUploadImages(true);
  };

  useEffect(() => {
    setUploadImages(false);
  }, [uploadImages]);

  return (
    <div>
      <div
        style={{
          top: "60px",
          position: "sticky",
          fontFamily: "Open Sans Condensed, sans-serif",
        }}
      >
        <PageIntro page={"Profile"} pageintroMessage={"Edit your profile."} />
      </div>

      <Row
        className="m-3"
        style={{
          top: "-20px",
        }}
      >
        <Col lg={8}>
          {modelDetails ? (
            <div>
              <Card style={{ top: "-50px" }}>
                <Card.Body className="p-3">
                  <PersonalInfoForm
                    modelDetails={modelDetails}
                    setState={setState}
                    uploadImages={uploadImages}
                  />
                  <AboutMeForm modelDetails={modelDetails} />
                  <ProfileImageForm modelDetails={modelDetails} />
                </Card.Body>
              </Card>
            </div>
          ) : (
            <Card>Personal Info</Card>
          )}
        </Col>
        <Col>
          {modelDetails ? (
            <Card
              style={{
                marginTop: "-50px",
                width: "100%",
                textAlign: "center",
                position: "sticky",
                top: "80px",
              }}
            >
              <Card.Img
                variant="top"
                src={`${process.env.REACT_APP_ASSETS_IMAGES}/user-images/${modelDetails.homeimage}`}
              />
              <Card.Body>
                <Card.Title style={{ fontFamily: "Lobster" }}>
                  {modelDetails.firstname} {modelDetails.lastname}
                </Card.Title>

                <div>"{modelDetails.quote}"</div>
                <div>{modelDetails.email}</div>
                <div>{modelDetails.number}</div>
              </Card.Body>
            </Card>
          ) : (
            <Card>Information Card</Card>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
