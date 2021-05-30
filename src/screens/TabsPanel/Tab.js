import React from "react";

const Tab = props => {
  const {
    text,
    isActive,
    setActiveTab
  } = props;

  const clickTab = () => {
    setActiveTab(text);
  }

  return (
    <li
      className={`nav-item ${isActive && "active-tab"}`}
      onClick={clickTab}
    >
      {text}
    </li>
  );
};

export default Tab;
