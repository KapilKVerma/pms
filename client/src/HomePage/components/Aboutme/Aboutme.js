import React, { useContext } from "react";
import { Card, Row, Col } from "react-bootstrap";
import Footer from "../Footer/Footer";
import Navigation from "../navigation/navigation";
import { UserContext } from "../../../App";
import "./Aboutme.css";

const Aboutme = () => {
  const modelDetails = useContext(UserContext);

  const image = modelDetails.aboutmeimage;
  const email = modelDetails.email;
  const dimensions = modelDetails.dimensions;
  const firstname = modelDetails.firstname;
  const lastname = modelDetails.lastname;

  return (
    <div>
      <Navigation page={"About Me"} />
      <Card
        style={{
          backgroundImage: `url("${process.env.REACT_APP_ASSETS_IMAGES}/user-images/${image}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderRadius: "0px",
        }}
      >
        {image && (
          <Row>
            <Col className="aboutme-content">
              <div className="aboutme-text">
                <div className="aboutme-body">
                  <div>
                    Hi all! My name is{" "}
                    <span style={{ fontWeight: "500" }}>
                      {firstname} {lastname}
                    </span>
                    . Below are my model stats: ​
                  </div>
                  <table>
                    <tbody>
                      <tr>
                        <td>Height:</td>
                        <td>{dimensions.height} "</td>
                      </tr>
                      <tr>
                        <td>Weight:</td>
                        <td>{dimensions.weight} "</td>
                      </tr>
                      <tr>
                        <td>Eyes:</td>
                        <td>Dark Brown</td>
                      </tr>
                      <tr>
                        <td>Hair</td>
                        <td>{dimensions.hair} "</td>
                      </tr>
                      <tr>
                        <td>Bust</td>
                        <td>{dimensions.bust} "</td>
                      </tr>
                      <tr>
                        <td>Waist:</td>
                        <td>{dimensions.waist} "</td>
                      </tr>
                      <tr>
                        <td>Hip:</td>
                        <td>{dimensions.hip} "</td>
                      </tr>
                    </tbody>
                  </table>
                  ​ ​
                  <div>
                    For more information, please email me at
                    <h6>{email}</h6>
                  </div>
                </div>
              </div>
            </Col>{" "}
            <Col className="aboutme-column-show" lg={6}></Col>
          </Row>
        )}
      </Card>
      <Footer />
    </div>
  );
};

export default Aboutme;
