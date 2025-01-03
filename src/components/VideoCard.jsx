import React, { useRef, useEffect, useState } from "react";
import VideoUploadInfo from "./VideoUploadInfo";
import FooterLeft from "./FooterLeft";
import FooterRight from "./FooterRight";
import "./VideoCard.css";

const VideoCard = (props) => {
  const {
    url,
    username,
    title,
    description,
    song,
    likes,
    shares,
    comments,
    saves,
    profilePic,
    setVideoRef,
    autoplay,
    uploadDate, // Thêm trường uploadDate
    location, // Thêm trường location
  } = props;

  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (autoplay && videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Error attempting to play", error);
      });
    }
  }, [autoplay]);

  const onVideoPress = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch((error) => {
          console.error("Error attempting to play", error);
        });
      } else {
        videoRef.current.pause();
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div className="video">
      {/* The video element */}
      <video
        className="player"
        onClick={onVideoPress}
        ref={(ref) => {
          videoRef.current = ref;
          setVideoRef(ref);
        }}
        loop
        src={url}
      ></video>

      {/* Hiển thị thông tin video */}
      <VideoUploadInfo
        video={{
          title,
          username,
          uploadDate, // Truyền thông tin ngày tải lên
          location, // Truyền thông tin vị trí
        }}
      />
      <div className="bottom-controls">
        <div className="footer-left">
          {/* The left part of the container */}
          <FooterLeft
            username={username}
            description={description}
            song={song}
          />
        </div>
        <div className="footer-right">
          {/* The right part of the container */}
          <FooterRight
            likes={likes}
            shares={shares}
            comments={comments}
            saves={saves}
            profilePic={profilePic}
            isMuted={isMuted}
            onMuteToggle={toggleMute}
            url={url}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
