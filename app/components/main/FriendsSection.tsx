// FriendsSection.tsx
'use client'

import React, { useEffect, useState } from 'react';
import WebApp from '@twa-dev/sdk';
import ReferralSystem from '@/app/components/main/ReferralSystem'; // Adjust the path as needed

const FriendsSection: React.FC = () => {
  const [initData, setInitData] = useState('');
  const [userId, setUserId] = useState('');
  const [startParam, setStartParam] = useState('');

  useEffect(() => {
    const initWebApp = async () => {
      if (typeof window !== 'undefined') {
        const WebApp = (await import('@twa-dev/sdk')).default;
        WebApp.ready();
        setInitData(WebApp.initData);
        setUserId(WebApp.initDataUnsafe.user?.id.toString() || '');
        setStartParam(WebApp.initDataUnsafe.start_param || '');
      }
    };

    initWebApp();
  }, []);

  const friends = [
    { username: 'User 1', reward: '+20 COIN', link: 'https://example.com/user1' },
    { username: 'User 2', reward: '+40 COIN', link: 'https://example.com/user2' },
    { username: 'User 3', reward: '+60 COIN', link: 'https://example.com/user3' },
    { username: 'User 4', reward: '+80 COIN', link: 'https://example.com/user4' },
    { username: 'User 5', reward: '+100 COIN', link: 'https://example.com/user5' },
    { username: 'User 6', reward: '+120 COIN', link: 'https://example.com/user6' },
    { username: 'User 7', reward: '+140 COIN', link: 'https://example.com/user7' },
    { username: 'User 8', reward: '+160 COIN', link: 'https://example.com/user8' },
    { username: 'User 9', reward: '+180 COIN', link: 'https://example.com/user9' },
    { username: 'User 10', reward: '+200 COIN', link: 'https://example.com/user10' },
  ];

  return (
    <section className="min-h-screen flex flex-col items-center justify-start bg-[#1a1333] backdrop-blur-xl text-white p-4">
      {/* Invite Friends Section */}
      <div className="mb-6 w-full max-w-md text-center">
        <h2 className="text-3xl font-bold mb-2">Invite friends</h2>
        <p className="text-lg mb-6">and get more COIN</p>
        <img src="/coin.png" alt="COIN Logo" className="w-40 h-auto mx-auto mb-4 mix-blend-screen" />
        
      </div>

      {/* Referral System */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-md p-6 border border-white/20 mb-6">
        <ReferralSystem initData={initData} userId={userId} startParam={startParam} />
      </div>

      {/* Friends List */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-md p-6 border border-white/20">
        <h2 className="text-lg font-bold mb-4">{friends.length} users</h2>
        <div className="space-y-4">
          {friends.map((friend, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b border-white/20 pb-2 mb-2 last:mb-0"
            >
              <a 
                href={friend.link} 
                className="font-semibold hover:underline" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                {friend.username}
              </a>
              <span className="text-gray-300">{friend.reward}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FriendsSection
