import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";

const EditImage = (props) => {
  const { deleteImage, setDeleteImage } = props;
  const [image, setImage] = useState();
  const imageId = props.image;

  useEffect(() => {
    setDeleteImage(false);
    axios
      .get(`${process.env.REACT_APP_BACKEND}/images/${imageId}`)
      .then((res) => {
        setImage(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [imageId, deleteImage]);

  // Delete Image
  const handleImageDelete = (id) => {
    setDeleteImage(true);
    const photoshootId = {
      id: props.id,
    };
    axios
      .post(
        `${process.env.REACT_APP_BACKEND}/images/${id}/delete`,
        photoshootId
      )
      .then((res) => alert(res.data))
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {image && (
        <div
          className="shadow"
          style={{
            height: "70vh",
            backgroundImage: `url(${process.env.REACT_APP_ASSETS_IMAGES}/images/${image.url})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            borderRadius: "2px",
            padding: "3%",
          }}
        >
          <div
            style={{
              color: "#d5dbdb",
              backgroundColor: "black",
              width: "40%",
              padding: "5px",
              fontSize: "18px",
              marginBottom: "2px",
              marginTop: "115%",
            }}
          >
            Views: {image.views}
          </div>
          <div
            style={{
              color: "#d5dbdb",
              backgroundColor: "black",
              width: "60%",
              padding: "5px",
              fontSize: "16px",
              marginBottom: "2px",
            }}
          >
            Name: {image.name}
          </div>
          <Button size="sm" variant="dark">
            <i
              className="far fa-trash-alt"
              onClick={() => handleImageDelete(image._id)}
            ></i>
          </Button>
        </div>
      )}
    </div>
  );
};

export default EditImage;
