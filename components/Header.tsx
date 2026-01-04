import React from 'react';
import { Tab } from '../types';
import { ICONS } from '../constants';

interface HeaderProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { name: Tab.Home, icon: ICONS.home, label: 'Home' },
    { name: Tab.Radio, icon: ICONS.radio, label: 'Radio' },
    { name: Tab.Network, icon: ICONS.community, label: 'Network' },
    { name: Tab.Profile, icon: ICONS.profile, label: 'Profile' },
  ];

  return (
    <header className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm border-t border-gray-800 z-50">
      <nav className="flex justify-around items-center h-20">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`flex flex-col items-center justify-center transition-colors duration-300 w-20 ${
              activeTab === tab.name ? 'text-purple-500' : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab.icon}
            <span className="text-xs mt-1">{tab.label}</span>
          </button>
        ))}
      </nav>
    </header>
  );
};

export default Header;
