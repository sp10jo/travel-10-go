import { useState } from 'react';

const TabMenu = ({ tabs, defaultActiveTab, onClick }) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab || tabs[0].name);

  return (
    <div className="flex border-b border-gray-300">
      {tabs.map((tab) => (
        <button
          key={tab.name}
          className={`px-4 py-2 bg-transparent cursor-pointer font-bold text-base ${
            activeTab === tab.name ? 'text-black border-b-2 border-black border-solid' : 'text-gray-500'
          } hover:text-black`}
          onClick={() => {
            setActiveTab(tab.name);
            // if (onClick) {
            //   onClick?();
            // }
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabMenu;
