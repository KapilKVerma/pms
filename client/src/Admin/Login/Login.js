import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";
import fire from "../../fire";
import { UserContext } from "../../App";

import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const model = useContext(UserContext);
  const [buttontype, setButtontype] = useState("password");

  const handleButtontype = () => {
    if (buttontype === "password") {
      setButtontype("text");
    } else {
      setButtontype("password");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {})
      .catch((err) => {
        if (err) alert("Login details are not correct.");
        setError(console.log(err.message));
      });
  };

  return (
    <div
      style={{
        backgroundImage: `url(${process.env.REACT_APP_ASSETS_IMAGES}/user-images/${model.homeimage})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Link to="/">
        <i
          className="fas fa-arrow-circle-left"
          style={{
            fontSize: "40px",
            color: "#d5dbdb",
            margin: "5px",
            // display: "absolute",
            position: "fixed",
            top: "0",
          }}
        ></i>
      </Link>
      <div className="loginForm">
        <Card style={{ width: "23rem", margin: "0 auto", padding: "10px" }}>
          <Card.Body>
            <div style={{ textAlign: "center", padding: "20px" }}>
              <div>
                <i className="far fa-user" style={{ fontSize: "40px" }}></i>
              </div>
              <div style={{ fontSize: "20px" }}>Sign in</div>
            </div>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  autoFocus
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <Form.Control
                    type={buttontype}
                    autoFocus
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                  />
                  {buttontype === "password" ? (
                    <Button
                      variant="outline-dark"
                      onClick={handleButtontype}
                      style={{
                        marginLeft: "-15%",
                        borderTopLeftRadius: "0px",
                        borderBottomLeftRadius: "0px",
                      }}
                    >
                      <i className="fas fa-eye"></i>
                    </Button>
                  ) : (
                    <Button
                      variant="outline-dark"
                      style={{
                        marginLeft: "-15%",
                        borderTopLeftRadius: "0px",
                        borderBottomLeftRadius: "0px",
                      }}
                    >
                      <i
                        className="fas fa-eye-slash"
                        onClick={handleButtontype}
                      ></i>
                    </Button>
                  )}
                </div>
              </Form.Group>

              <Button
                variant="dark"
                type="submit"
                style={{ width: "100%" }}
                className="mt-3"
                onClick={handleLogin}
              >
                Sign In
              </Button>
              <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                {error}
              </p>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Login;
