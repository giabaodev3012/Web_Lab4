import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import VideoCard from "./components/VideoCard";
import BottomNavbar from "./components/BottomNavbar";
import TopNavbar from "./components/TopNavbar";

// This array holds information about different videos
const videoUrls = [
  {
    url: require("./videos/video1.mp4"),
    profilePic: require("./photos/meomeo1.jpg"),
    username: "csjackie",
    description: "Lol nvm #compsci #chatgpt #ai #openai #techtok",
    song: "Original sound - Famed Flames",
    likes: 430,
    comments: 13,
    saves: 23,
    shares: 1,
  },
  {
    url: require("./videos/video2.mp4"),
    profilePic: require("./photos/meomeo2.jpg"),
    username: "dailydotdev",
    description:
      "Every developer brain @francesco.ciulla #developerjokes #programming #programminghumor #programmingmemes",
    song: "tarawarolin wants you to know this isnt my sound - Chaplain J Rob",
    likes: "13.4K",
    comments: 3121,
    saves: 254,
    shares: 420,
  },
  {
    url: require("./videos/video3.mp4"),
    profilePic:
      "https://p77-sign-va.tiktokcdn.com/tos-maliva-avt-0068/4e6698b235eadcd5d989a665704daf68~c5_100x100.jpeg?x-expires=1688479200&x-signature=wkwHDKfNuIDqIVHNm29%2FRf40R3w%3D",
    username: "wojciechtrefon",
    description:
      "#programming #softwareengineer #vscode #programmerhumor #programmingmemes",
    song: "help so many people are using my sound - Ezra",
    likes: 5438,
    comments: 238,
    saves: 12,
    shares: 117,
  },
  {
    url: require("./videos/video4.mp4"),
    profilePic:
      "https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/4bda52cf3ad31c728153859262c329db~c5_100x100.jpeg?x-expires=1688486400&x-signature=ssUbbCpZFJj6uj33D%2BgtcqxMvgQ%3D",
    username: "faruktutkus",
    description:
      "Wait for the end | Im RTX 4090 TI | #softwareengineer #softwareengineer #coding #codinglife #codingmemes ",
    song: "orijinal ses - Computer Science",
    likes: 9689,
    comments: 230,
    saves: 1037,
    shares: 967,
  },
];

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRefs = useRef([]);

  // Hàm điều hướng video - gộp chung logic điều hướng
  const handleNavigation = (direction) => {
    setCurrentIndex((prevIndex) => {
      const newIndex =
        direction === "next"
          ? Math.min(prevIndex + 1, videoUrls.length - 1)
          : Math.max(prevIndex - 1, 0);

      // Cuộn tới video mới
      videoRefs.current[newIndex]?.scrollIntoView({ behavior: "smooth" });
      return newIndex;
    });
  };

  // Xử lý sự kiện di chuột
  useEffect(() => {
    let startY = 0;

    const handleMouseDown = (e) => {
      startY = e.clientY;
    };

    const handleMouseUp = (e) => {
      const endY = e.clientY;
      const diffY = startY - endY;

      // Điều kiện vuốt: khoảng cách > 100px
      if (Math.abs(diffY) > 100) {
        handleNavigation(diffY > 0 ? "next" : "prev");
      }
    };

    // Thêm sự kiện
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    // Dọn dẹp sự kiện
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // Observe video intersection (giữ nguyên logic cũ)
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.8,
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        entry.isIntersecting ? entry.target.play() : entry.target.pause();
      });
    };

    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions
    );
    videoRefs.current.forEach((videoRef) => observer.observe(videoRef));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="app">
      <div className="container">
        <TopNavbar className="top-navbar" />
        {videoUrls.map((video, index) => (
          <VideoCard
            key={index}
            {...video}
            setVideoRef={(ref) => (videoRefs.current[index] = ref)}
            autoplay={index === currentIndex}
          />
        ))}
        <BottomNavbar className="bottom-navbar" />
      </div>
    </div>
  );
}

export default App;
