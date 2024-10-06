// components/Profile.tsx
'use client';
import React from 'react';
import { IonIcon } from '@ionic/react';
import { personOutline } from 'ionicons/icons';
import WebApp from '@twa-dev/sdk';
import { useEffect, useState } from 'react';

interface UserData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code: string;
  is_premium?: boolean;
}

const Profile: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && WebApp.initDataUnsafe.user) {
      setUserData(WebApp.initDataUnsafe.user as UserData);
    }
  }, []);

  return (
    <div className="w-full fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#03001417] backdrop-blur-md z-50 rounded-b-[20px] p-4 glass-effect">
      <div className="flex items-center">
        <div className="flex flex-col items-center">
          <IonIcon icon={personOutline} className="text-4xl text-white glow" />
          <p className="text-gray-400">Level: </p>
        </div>
        <div className="ml-4 text-white">
          <h2 className="text-xl font-bold">{userData?.first_name || 'User'}</h2>
          <p className="text-gray-200">
            Crypto Balance: <span className="text-white glow">0 DOT</span>
          </p>
          <p className="text-gray-200">
            Power: <span className="text-white glow">0 D/H</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
