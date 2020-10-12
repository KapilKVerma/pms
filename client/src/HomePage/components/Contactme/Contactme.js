import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Card, Col, Row, Button, Form } from "react-bootstrap";
import Navigation from "../navigation/navigation";
import Footer from "../Footer/Footer";
import { UserContext } from "../../../App";
import "./Contactme.css";

const Contactme = (porps) => {
  const modelDetails = useContext(UserContext);
  const image = modelDetails.contactmeimage;
  const [message, setMessage] = useState({
    name: "",
    email: "",
    contactnumber: "",
    message: "",
  });

  useEffect(() => {}, [message]);

  const onSubmit = () => {
    axios
      .post(`${process.env.REACT_APP_BACKEND}/messages/add`, message)

      .then((res) => {
        if (res)
          setMessage({ name: "", email: "", contactnumber: "", message: "" });
        alert("Message sent!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Navigation page={"Contact"} />
      <Card>
        {image && (
          <Row
            style={{
              backgroundImage: `url(${process.env.REACT_APP_ASSETS_IMAGES}/user-images/${image})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <Col className="contactme-column-show " lg={6}></Col>
            <Col className="contactme-content">
              <div className="contactme-text">
                <Form>
                  <Form.Label>
                    <h3>Get In Touch</h3>
                  </Form.Label>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      placeholder="Name"
                      value={message.name}
                      style={{ borderRadius: "0px", borderWidth: "0px" }}
                      onChange={(e) => {
                        e.preventDefault();
                        setMessage({ ...message, name: e.target.value });
                      }}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      value={message.email}
                      style={{ borderRadius: "0px", borderWidth: "0px" }}
                      onChange={(e) => {
                        e.preventDefault();
                        setMessage({ ...message, email: e.target.value });
                      }}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      type="number"
                      placeholder="+61-"
                      value={message.contactnumber}
                      style={{ borderRadius: "0px", borderWidth: "0px" }}
                      onChange={(e) => {
                        e.preventDefault();
                        setMessage({
                          ...message,
                          contactnumber: e.target.value,
                        });
                      }}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      as="textarea"
                      rows="3"
                      placeholder="Message"
                      value={message.message}
                      style={{ borderRadius: "0px", borderWidth: "0px" }}
                      onChange={(e) => {
                        e.preventDefault();
                        setMessage({ ...message, message: e.target.value });
                      }}
                    />
                  </Form.Group>
                  <Button
                    type="submit"
                    variant="dark"
                    style={{ borderRadius: "0px" }}
                    onClick={onSubmit}
                  >
                    Send
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        )}
      </Card>
      <Footer />
    </div>
  );
};

export default Contactme;
