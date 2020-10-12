import React, { useContext } from "react";
import { UserContext } from "../../../App";
import "./Footer.css";

const Footer = () => {
  const details = useContext(UserContext);
  const modelDetails = details;
  return (
    <div style={{ overflowX: "hidden" }}>
      {modelDetails ? (
        <div className="imagegallery-footer">
          <div>
            {modelDetails.firstname}
            {modelDetails.lastname}
            &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; {modelDetails.number}
            &nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp; {modelDetails.email}
          </div>
          <div>© 2020 Web Form., All Rights Reserved.</div>
        </div>
      ) : null}
    </div>
  );
};

export default Footer;
