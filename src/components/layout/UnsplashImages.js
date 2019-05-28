import React from "react";
import "./image.css";
import uuid from "uuid";

const UnsplashImages = props => {
  // console.log(props);
  const { unsplashImages } = props;
  return (
    <div className="image-inner-container" id="photos">
      {unsplashImages.map(image => (
        <a
          href={image.urls.regular}
          target="_blank"
          className="anch"
          key={image.id}
          rel="noopener noreferrer"
        >
          <img src={image.urls.small} alt="" className="" key={uuid()} />
          <div className="overlay">
            <div className="text">
              <img
                src={image.user.profile_image.medium}
                alt="Profile pic"
                className="profile-picture"
              />
              <p className="user-name">{image.user.name}</p>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default UnsplashImages;
