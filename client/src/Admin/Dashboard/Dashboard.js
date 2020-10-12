import React, { useState, useContext, useEffect } from "react";
import {
  Card,
  Col,
  Row,
  Nav,
  Tab,
  Navbar,
  Button,
  Modal,
} from "react-bootstrap";

import Profile from "./components/Profile";
import Editwebsite from "../Dashboard/EditWebsite/Editwebsite";
import Message from "./components/Message";
import PopularImage from "./components/PopularImage";
import PopularPhotoshoot from "./components/PopularPhotoshoot";
import ImagesSatistics from "./components/ImagesStatistics";
import PhotoshootsStatistics from "./components/PhotoshootsStatistics";

import { UserContext } from "../../App";
import fire from "../../fire";

import "./Dashboard.css";

const Dashboard = () => {
  const [displayPane, setDisplayPane] = useState("displayPane");
  const [messages, setMessages] = useState();
  const modelDetails = useContext(UserContext);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setMessages(modelDetails.emailmessage.reverse());
  }, [modelDetails.emailmessage]);

  const handlePaneDisplay = () => {
    if (displayPane === "displayPane") {
      setDisplayPane("");
    } else {
      setDisplayPane("displayPane");
    }
  };

  const handleLogOut = () => {
    fire.auth().signOut();
  };

  return (
    <Tab.Container defaultActiveKey="first">
      <Row className=" m-0 ">
        <Col
          lg={2}
          className={displayPane}
          style={{
            height: "100vh",
            backgroundImage:
              "url(https://papers.co/wallpaper/papers.co-vk39-rainbow-abstract-colors-pattern-34-iphone6-plus-wallpaper.jpg)",
            color: "white",
            backgroundSize: "cover",
            padding: "0px",
            position: "sticky",
            top: "0",
            margin: "0px",
          }}
        >
          <div
            style={{
              height: "100vh",

              backgroundColor: "black",
              textAlign: "center",
              padding: "10px",
              opacity: "0.8",
            }}
          >
            <div>
              <h1 style={{ fontWeight: "bold" }}>
                <u>Amend</u>
              </h1>
            </div>
            <div>
              <Nav
                variant="pills"
                className="flex-column "
                style={{ textAlign: "start", margin: "25px auto" }}
              >
                <Nav.Item>
                  <Nav.Link
                    eventKey="first"
                    style={{
                      borderRadius: "0px",
                      color: "white",
                    }}
                  >
                    <i className="fas fa-columns p-1"></i> Dashboard
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link
                    eventKey="second"
                    style={{
                      borderRadius: "0px",
                      color: "white",
                    }}
                  >
                    <i className="fas fa-id-card-alt p-1"></i> Profile
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link
                    eventKey="third"
                    style={{
                      borderRadius: "0px",
                      color: "white",
                    }}
                  >
                    <i className="fas fa-pen-square p-1"></i> Photoshoots
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link
                    style={{
                      borderRadius: "0px",
                      color: "white",
                    }}
                    onClick={handleShow}
                  >
                    <i className="fas fa-sign-out-alt p-1"></i> Sign Out
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Sign Out</Modal.Title>
              </Modal.Header>
              <Modal.Body>Are you sure you want to logout?</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  No
                </Button>
                <Button variant="primary" onClick={handleLogOut}>
                  Yes
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </Col>

        <Col
          style={{
            width: "100%",
            padding: "0px",
          }}
        >
          <Navbar
            bg="light"
            variant="light"
            className="shadow"
            style={{ width: "100%" }}
            sticky="top"
          >
            <Col lg={10}>
              <Navbar.Brand href="#home">
                <Button
                  onClick={handlePaneDisplay}
                  variant="outline-danger"
                  style={{ borderRadius: "0px" }}
                >
                  <i className="fas fa-bars"></i>
                </Button>
              </Navbar.Brand>
            </Col>
            <Col style={{ textAlign: "end" }}>
              <div
                style={{
                  fontSize: "20px",
                  fontFamily: "Lobster",
                }}
              >
                {modelDetails && (
                  <div>
                    {modelDetails.firstname}
                    <img
                      src={`${process.env.REACT_APP_ASSETS_IMAGES}/user-images/${modelDetails.homeimage}`}
                      alt="Profile Pic"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                      }}
                      className="ml-3"
                    ></img>
                  </div>
                )}
              </div>
            </Col>
          </Navbar>

          <Tab.Content>
            <Tab.Pane eventKey="first">
              <Row className=" m-1 ">
                <Col lg={6}>
                  <Row>
                    <Col className=" pt-2 ">
                      <Card>
                        <h6 className="p-2">Messages</h6>
                        {messages &&
                          messages.map((message) => {
                            return (
                              <Message messageId={message} key={message} />
                            );
                          })}
                      </Card>
                    </Col>
                  </Row>
                </Col>
                <Col lg={6}>
                  <Row>
                    <Col lg={6} className=" pt-2 ">
                      <PopularImage />
                    </Col>

                    <Col lg={6} className=" pt-2 ">
                      <PopularPhotoshoot />
                    </Col>
                  </Row>

                  <Row className="pt-3">
                    <Col>
                      {modelDetails && (
                        <Card
                          className="p-3"
                          style={{
                            height: "100%",
                            backgroundPosition: "center",
                            backgroundColor: "#e7eae8",
                          }}
                        >
                          <div
                            style={{
                              fontSize: "16px",
                              backgroundColor: "black",
                              width: "20%",
                              padding: "1%",
                              color: "white",
                              margin: "1%",
                            }}
                          >
                            Statistics
                          </div>
                          <Card.Body>
                            <ImagesSatistics />
                            <PhotoshootsStatistics />
                          </Card.Body>
                        </Card>
                      )}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Tab.Pane>

            <Tab.Pane eventKey="second">
              {modelDetails && <Profile modelDetails={modelDetails} />}
            </Tab.Pane>

            <Tab.Pane eventKey="third">
              <Editwebsite />
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
};

export default Dashboard;
