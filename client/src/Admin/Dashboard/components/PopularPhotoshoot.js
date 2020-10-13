import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import axios from "axios";

const PopularPhotoshoot = () => {
  const [popularPhotoshoot, setPopularphotoshoot] = useState("");

  const mostviewedPhotoshoot = (items) => {
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
    setPopularphotoshoot(viewFilter[0]);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND}/photoshoots/`)
      .then((res) => {
        mostviewedPhotoshoot(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {popularPhotoshoot ? (
        <Card
          style={{
            backgroundImage: `url("${process.env.REACT_APP_ASSETS_IMAGES}/photoshoots/${popularPhotoshoot.url}")`,
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
                width: "45%",
                padding: "2%",
              }}
            >
              Popular Photoshoot
            </div>
            <div
              style={{
                marginTop: "20vh",
                fontSize: "14px",
                backgroundColor: "black",
                width: "60%",
                padding: "2%",
              }}
            >
              Name: {popularPhotoshoot.name}
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
              Views: {popularPhotoshoot.views}
            </div>
          </Card.Body>
        </Card>
      ) : (
        <Card className="p-3">Most viewed photoshoot will be shown here.</Card>
      )}
    </>
  );
};

export default PopularPhotoshoot;
