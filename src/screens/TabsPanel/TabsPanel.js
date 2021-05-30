import React, { useState } from 'react';

import "./style.css";
import Tab from "./Tab";
import Posts from "../Users";
import MarkedUsers from "../MarkedUsers/MarkedUsers";

const TabsPanel = () => {
  const [activeTab, setActiveTab] = useState("Redux Users");

  const tabNames = [
    "Redux Users", "Marked Users"
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case "Redux Users" :
        return <Posts/>
      case "Marked Users" :
        return <MarkedUsers/>
    }
  };

  return (
    <div>
      <ul
        className={"nav "}
      >
        {
          tabNames.map((name) =>
            <Tab
              id={name}
              key={name}
              text={name}
              isActive={name === activeTab}
              setActiveTab={setActiveTab}
              handleClick={setActiveTab}
            />)
        }
      </ul>
      <div className="tab-option">
        {renderActiveTab()}
      </div>
    </div>
  );
};

export default TabsPanel;
