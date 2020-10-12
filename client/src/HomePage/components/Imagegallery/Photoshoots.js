import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Photoshoots = (props) => {
  const { photoshoot } = props;
  const [views, setViews] = useState(0);

  const viewsCounter = () => {
    setViews(views + 1);
    console.log(views + 1);
    axios
      .post(
        `${process.env.REACT_APP_BACKEND}/photoshoots/${photoshoot._id}/updateviews`,
        {
          views: views + 1,
        }
      )
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND}/photoshoots/${photoshoot._id}`)
      .then((res) => {
        setViews(res.data.views);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [photoshoot._id, views]);

  return (
    <>
      {photoshoot ? (
        <Link to={`/p/${photoshoot._id}`} onClick={viewsCounter}>
          <div className="cont">
            <span className="photoshoot-name ">{photoshoot.name}</span>
          </div>
        </Link>
      ) : null}
    </>
  );
};

export default Photoshoots;
