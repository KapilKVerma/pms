import React from "react";
import PageIntro from "../components/PageIntro/PageInto";
import { Row, Card } from "react-bootstrap";
import Editportfoliopage from "./components/Editportfoliopage";

import "./Editwebsite.css";

const Editwebsite = () => {
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
          page={"Photoshoots"}
          pageintroMessage={"Edit your photoshoots."}
        />
      </div>

      <Row className="m-3">
        <Card style={{ top: "-50px", width: "100%" }}>
          <Editportfoliopage />
        </Card>
      </Row>
    </div>
  );
};

export default Editwebsite;
