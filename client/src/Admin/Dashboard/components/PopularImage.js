import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import axios from "axios";

const PopularImage = () => {
  const [popularImage, setPopularImage] = useState("");

  const mostviewedImage = (items) => {
    let views = [];
    items.forEach((item) => {
      views.push(item.views);
    });
    views = views.sort(function (a, b) {
      return b - a;
    });
    const viewFilter = items.filter((item) => {
      return item.views === views[0];
    });
    setPopularImage(viewFilter[0]);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND}/images/`)
      .then((res) => {
        mostviewedImage(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {popularImage ? (
        <Card
          style={{
            backgroundImage: `url(${process.env.REACT_APP_ASSETS_IMAGES}/images/${popularImage.url})`,
            backgroundPosition: "top",
            backgroundSize: "cover",
            color: "white",
          }}
        >
          <Card.Body>
            <div
              style={{
                fontSize: "14px",
                backgroundColor: "black",
                width: "35%",
                padding: "2%",
              }}
            >
              Popular Image
            </div>
            <div
              style={{
                marginTop: "20vh",
                fontSize: "14px",
                backgroundColor: "black",
                width: "50%",
                padding: "2%",
              }}
            >
              Name: {popularImage.name}
            </div>
            <div
              style={{
                marginTop: "2px",
                fontSize: "12px",
                backgroundColor: "black",
                width: "25%",
                padding: "2%",
              }}
            >
              Views: {popularImage.views}
            </div>
          </Card.Body>
        </Card>
      ) : (
        <Card className="p-3">Most viewed image will be shown here</Card>
      )}
    </>
  );
};

export default PopularImage;
