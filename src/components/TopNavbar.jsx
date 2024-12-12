import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTv, faSearch } from "@fortawesome/free-solid-svg-icons";

const TopNavbar = () => {
  return (
    <div classname="top-navbar">
      <FontAwesomeIcon icon={faTv} classname="icon" />
      <h2>
        Following | <span>For You</span>
      </h2>
      <FontAwesomeIcon icon={faSearch} classname="icon" />
    </div>
  );
};

export default TopNavbar;
