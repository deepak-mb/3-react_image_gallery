import React from "react";
import "./image.css";

const Image = props => {
  // console.log(props);
  return (
    <div className="image-inner-container" id="photos">
      {props.images.map(image => (
        <a
          href={image.urls.regular}
          target="_blank"
          className="anch"
          key={image.id}
          rel="noopener noreferrer"
        >
          <img src={image.urls.small} alt="" className="" key={image.id} />
          <div className="overlay">
            <div className="text">
              <img
                src={image.user.profile_image.medium}
                alt="Profile pic"
                className="profile-picture"
              />
              <p>{image.user.name}</p>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default Image;
