import React, { useState, useEffect } from "react";
import "./VideoUploadInfo.css";

function VideoUploadInfo({ video }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(true);
    };

    const handleKeyPress = (event) => {
      if (event.key === "ArrowRight") {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div className={`video-upload-info ${isVisible ? "visible" : ""}`}>
      <div className="info-content">
        <h3>{video.title}</h3>
        <p>@{video.username}</p>
        <p>{video.uploadDate}</p>
        <p>{video.location}</p>
      </div>
    </div>
  );
}

export default VideoUploadInfo;
