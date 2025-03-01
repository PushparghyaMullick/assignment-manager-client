import React, { useState } from "react";

const Tabs = ({ defaultValue, onValueChange, children }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  const handleTabChange = (value) => {
    setActiveTab(value);
    onValueChange?.(value); // Call parent function if provided
  };

  return (
    <div className="flex flex-col">
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { activeTab, onTabChange: handleTabChange })
      )}
    </div>
  );
};

const TabsList = ({ children, activeTab, onTabChange }) => {
  return (
    <div className="flex space-x-2 border-b">
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { activeTab, onTabChange })
      )}
    </div>
  );
};

const TabsTrigger = ({ value, activeTab, onTabChange, children }) => {
  return (
    <button
      className={`px-4 py-2 transition ${
        activeTab === value
          ? "border-b-2 border-blue-600 font-bold cursor-pointer"
          : "text-gray-600 cursor-pointer"
      }`}
      onClick={() => onTabChange(value)}
    >
      {children}
    </button>
  );
};

export { Tabs, TabsList, TabsTrigger };
