import React from "react";
import "./image.css";
import uuid from "uuid";
// import defaultImage from "../../images/download.jpeg";

const PixabayImages = props => {
  const { pixabayImages } = props;
  // console.log(props);
  return (
    <div className="image-inner-container" id="photos">
      {pixabayImages.map(image => (
        <a
          href={image.largeImageURL}
          target="_blank"
          className="anch"
          key={uuid()}
          rel="noopener noreferrer"
        >
          <img src={image.webformatURL} alt="" className="" key={uuid()} />
          <div className="overlay">
            <div className="text">
              <img
                src={image.userImageURL}
                alt="Profile pic"
                className="profile-picture"
              />
              <p className="user-name">{image.user}</p>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default PixabayImages;
