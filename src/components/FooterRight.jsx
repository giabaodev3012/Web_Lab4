import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faCircleCheck,
  faHeart,
  faCommentDots,
  faBookmark,
  faShare,
  faVolumeUp,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";
import "./FooterRight.css";

function FooterRight({
  likes,
  comments,
  saves,
  shares,
  profilePic,
  isMuted,
  onMuteToggle,
}) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [userAddIcon, setUserAddIcon] = useState(faCirclePlus);

  const handleUserAddClick = () => {
    setUserAddIcon(faCircleCheck);
    setTimeout(() => {
      setUserAddIcon(null);
    }, 3000); // Change the delay time (in milliseconds) as needed
  };

  const parseLikesCount = (count) => {
    if (typeof count === "string") {
      if (count.endsWith("k")) {
        return parseFloat(count) * 1000;
      }
      return parseInt(count, 10);
    }
    return count;
  };

  const formatLikesCount = (count) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + "k";
    }
    return count;
  };

  const handleLikeClick = () => {
    setLiked((prevLiked) => !prevLiked);
  };

  const handleSaveClick = () => {
    setSaved((prevSaved) => !prevSaved);
  };

  return (
    <div className="footer-right">
      <div className="sidebar-icon">
        {profilePic && (
          <img
            src={profilePic}
            className="userprofile"
            alt="Profile"
            style={{ width: "45px", height: "45px", color: "#616161" }}
          />
        )}
        <FontAwesomeIcon
          icon={userAddIcon}
          className="useradd"
          style={{ width: "15px", height: "15px", color: "#FF0000" }}
          onClick={handleUserAddClick}
        />
      </div>
      <div className="sidebar-icon">
        <FontAwesomeIcon
          icon={faHeart}
          style={{
            width: "35px",
            height: "35px",
            color: liked ? "#FF0000" : "white",
          }}
          onClick={handleLikeClick}
        />
        <p>{formatLikesCount(parseLikesCount(likes) + (liked ? 1 : 0))}</p>
      </div>
      <div className="sidebar-icon">
        <FontAwesomeIcon
          icon={faCommentDots}
          style={{ width: "35px", height: "35px", color: "white" }}
        />
        <p>{comments}</p>
      </div>
      <div className="sidebar-icon">
        <FontAwesomeIcon
          icon={faBookmark}
          style={{
            width: "35px",
            height: "35px",
            color: saved ? "#FFD700" : "white",
          }}
          onClick={handleSaveClick}
        />
        <p>{saves + (saved ? 1 : 0)}</p>
      </div>
      <div className="sidebar-icon">
        <FontAwesomeIcon
          icon={faShare}
          style={{ width: "35px", height: "35px", color: "white" }}
        />
        <p>{shares}</p>
      </div>

      <div className="sidebar-icon" onClick={onMuteToggle}>
        <FontAwesomeIcon
          icon={isMuted ? faVolumeMute : faVolumeUp}
          style={{ width: "35px", height: "35px", color: "white" }}
        />
      </div>

      <div className="sidebar-icon record">
        <img
          src="https://static.thenounproject.com/png/934821-200.png"
          alt="Record Icon"
          style={{ width: "35px", height: "35px" }}
        />
      </div>
    </div>
  );
}

export default FooterRight;
