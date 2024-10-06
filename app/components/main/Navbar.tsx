// components/Navbar.tsx
'use client'
import React, { useState } from "react";
import { IonIcon } from "@ionic/react";
import { homeOutline, home, gridOutline, grid, peopleOutline, people, walletOutline, wallet } from "ionicons/icons";

type IconName = 'home' | 'task' | 'friends' | 'wallet';

interface NavbarProps {
  onSectionChange: (section: IconName) => void; // Prop for section change
}

const Navbar: React.FC<NavbarProps> = ({ onSectionChange }) => {
  const [activeIcon, setActiveIcon] = useState<IconName | null>(null);

  const handleClick = (icon: IconName) => {
    setActiveIcon(icon);
    onSectionChange(icon); // Call the section change prop
  };

  return (
    <div className="w-full h-[65px] fixed bottom-0 shadow-lg shadow-[#2A0E61]/50 bg-[#03001417] backdrop-blur-md z-50 rounded-t-[20px]">
      <div className="w-full h-full flex flex-row items-center justify-evenly">
        <div 
          className={`flex flex-col items-center text-gray-200 cursor-pointer ${activeIcon === "home" ? "animate-pulse text-white" : ""}`} 
          onClick={() => handleClick("home")}
        >
          <IonIcon icon={activeIcon === "home" ? home : homeOutline} className="text-3xl" />
          <span className="text-xs mt-1">Home</span>
        </div>
        <div 
          className={`flex flex-col items-center text-gray-200 cursor-pointer ${activeIcon === "task" ? "animate-pulse text-white" : ""}`} 
          onClick={() => handleClick("task")}
        >
          <IonIcon icon={activeIcon === "task" ? grid : gridOutline} className="text-3xl" />
          <span className="text-xs mt-1">Task</span>
        </div>
        <div 
          className={`flex flex-col items-center text-gray-200 cursor-pointer ${activeIcon === "friends" ? "animate-pulse text-white" : ""}`} 
          onClick={() => handleClick("friends")}
        >
          <IonIcon icon={activeIcon === "friends" ? people : peopleOutline} className="text-3xl" />
          <span className="text-xs mt-1">Friends</span>
        </div>
        <div 
          className={`flex flex-col items-center text-gray-200 cursor-pointer ${activeIcon === "wallet" ? "animate-pulse text-white" : ""}`} 
          onClick={() => handleClick("wallet")}
        >
          <IonIcon icon={activeIcon === "wallet" ? wallet : walletOutline} className="text-3xl" />
          <span className="text-xs mt-1">Wallet</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar
