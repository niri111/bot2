// components/Profile.tsx
'use client';
import React from 'react';
import { IonIcon } from '@ionic/react';
import { personOutline } from 'ionicons/icons';

interface ProfileProps {
  userData: {
    first_name: string;
    level: number;
    balance: number;
    power: string;
  } | null; // Adjust according to your user data shape
}

const Profile: React.FC<ProfileProps> = ({ userData }) => {
  return (
    <div className="w-full fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#03001417] backdrop-blur-md z-50 rounded-b-[20px] p-4 glass-effect"> {/* Added glass-effect class */}
      <div className="flex items-center">
        <div className="flex flex-col items-center"> {/* Flex container for icon and level */}
          <IonIcon icon={personOutline} className="text-4xl text-white glow" /> {/* White glowing icon */}
          <p className="text-gray-400">Level: {userData?.level || 0}</p> {/* Level under the icon */}
        </div>
        <div className="ml-4 text-white">
          <h2 className="text-xl font-bold">{userData?.first_name || 'User'}</h2>
          <p className="text-gray-200">Crypto Balance: <span className="text-white glow">{userData?.balance || 0} DOT</span></p> {/* Added glow class */}
          <p className="text-gray-200">Power: <span className="text-white glow">{userData?.power || '0'} D/H</span></p> {/* Added glow class */}
        </div>
      </div>
    </div>
  );
};

export default Profile
