import React, { useState } from "react";
import "../styles/switch-tabs.scss";

const SwitchTabs = ({ data, setTab, setInputError }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [left, setLeft] = useState(0);

  const activeTab = (tab, index) => {
      setLeft(index * 140);
      setTab(tab.tabName)
      setTimeout(() => {
          setSelectedTab(index);
      }, 300);
      setInputError("")
  };

  return (
      <div className="switching-tabs bg-gray-200 p-0.5 flex justify-center">
          <div className="flex relative items-center tabItems">
              {data.map((tab, index) => (
                  <button
                      key={index}
                      className={`flex border-none bg-transparent justify-center items-center text-sm relative cursor-pointer h-full text-gray-600 text-base z-10 tabItem ${
                          selectedTab === index ? "active text-gray-800 font-bold" : ""
                      }`}
                      onClick={() => activeTab(tab, index)}
                      type="button"
                  >
                    <img src={tab.tabLogo} alt="smartphone-line"/>  {tab.tabName}
                  </button>
              ))}
              <span className="movingBg bg-white left-0 absolute" style={{ left }} />
          </div>
      </div>
  );
};

export default SwitchTabs;