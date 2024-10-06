// UserData.tsx
'use client'

import WebApp from '@twa-dev/sdk'
import { useEffect, useState } from 'react'

// Define the interface for user data
interface UserData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  is_premium?: boolean;
  photo_url?: string; // Add this line for the profile picture
}

const UserData: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    if (WebApp.initDataUnsafe.user) {
      setUserData(WebApp.initDataUnsafe.user as UserData);
    }
  }, []);

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-md p-6 border border-white/20 shadow-lg">
      {userData ? (
        <div className="flex flex-col items-center">
          {userData.photo_url && (
            <img
              src={userData.photo_url}
              alt="User Profile"
              className="w-24 h-24 rounded-full mb-4"
            />
          )}
          <h2 className="text-xl text-w font-bold mb-4">User Information!</h2>
          <ul className="space-y-2 text-gray-200 text-center">
            <li>ID: <span className="text-white">{userData.id}</span></li>
            <li>First Name: <span className="text-white">{userData.first_name}</span></li>
            <li>Last Name: <span className="text-white">{userData.last_name || 'N/A'}</span></li>
            <li>Username: <span className="text-white">{userData.username || 'N/A'}</span></li>
            <li>Is Premium: <span className="text-white">{userData.is_premium ? 'Yes' : 'No'}</span></li>
          </ul>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default UserData
