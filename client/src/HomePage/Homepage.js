import React, { useContext } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import { UserContext } from "../App";

import "./Homepage.css";

const Imagegallery = () => {
  const modelDetails = useContext(UserContext);
  // const [contactForm, setContactForm] = useState("contact-hide");
  // const [aboutMe, setAboutMe] = useState("about-hide");
  // const [adminDashboard, setAdmindashboard] = useState("admin-link-hide");
  // const [message, setMessage] = useState({
  //   name: "",
  //   email: "",
  //   contactnumber: "",
  //   message: "",
  // });

  // const handleAdminDashboard = () => {
  //   if (adminDashboard === "admin-link-hide") {
  //     setAdmindashboard("admin-link-show");
  //   } else {
  //     setAdmindashboard("admin-link-hide");
  //   }
  // };

  // const handleContactForm = () => {
  //   if (contactForm === "contact-hide") {
  //     setContactForm("contact-show");
  //     setAboutMe("about-hide");
  //   } else setContactForm("contact-hide");
  // };

  // const handleAboutMe = () => {
  //   if (aboutMe === "about-hide") {
  //     setAboutMe("about-show");
  //     setContactForm("contact-hide");
  //   } else {
  //     setAboutMe("about-hide");
  //   }
  // };

  // useEffect(() => {}, [message]);

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   axios
  //     .post(`${process.env.REACT_APP_BACKEND}/messages/add`, message)
  //     .then((res) => {
  //       if (res)
  //         setMessage({ name: "", email: "", contactnumber: "", message: "" });
  //       alert("Message sent!");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  return (
    <div style={{ overflowX: "hidden" }}>
      <Row
        id="home"
        className="p-5"
        style={{
          height: "100vh",
          backgroundImage: `url("${process.env.REACT_APP_ASSETS_IMAGES}/user-images/${modelDetails.homeimage}")`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <Col lg={9}></Col>
        <Col>
          <div
            style={{
              paddingTop: "160%",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {" "}
              {modelDetails && (
                <div className="model-initials">
                  {modelDetails.firstname} {modelDetails.lastname}{" "}
                </div>
              )}
            </div>
            <Link to="/imagegallery" style={{ color: "black" }}>
              Visit my portfolio <i className="fas fa-angle-double-right"></i>
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Imagegallery;
