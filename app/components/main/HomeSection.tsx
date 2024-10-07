'use client';
import React, { useEffect, useState } from 'react';
import Profile from './Profile';
import { WebApp as WebAppType } from '@twa-dev/types';
import WebApp from '@twa-dev/sdk';

declare global {
  interface Window {
    Telegram?: {
      WebApp: WebAppType;
    };
  }
}

const HomeSection = () => {
  const [canClaim, setCanClaim] = useState<boolean>(true);
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<string>('');

  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    if (tg) {
      tg.ready();

      const initDataUnsafe = tg.initDataUnsafe || {};
      if (initDataUnsafe.user && !user) {
        fetch('/api/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(initDataUnsafe.user),
        })
          .then((res) => res.json())
          .then((data) => {
            if (!data.error) {
              setUser(data);
              checkClaim(data.telegramId); // Check claim status
            } else {
              setError(data.error);
            }
          })
          .catch(() => setError('Failed to fetch user data'));
      }
    }
  }, [user]);

  const checkClaim = async (telegramId: number) => {
    const res = await fetch('/api/check-claim', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ telegramId }),
    });
    const data = await res.json();
    if (data.canClaim !== undefined) {
      setCanClaim(data.canClaim);
    }
  };

  const handleClaim = async () => {
    if (canClaim && user) {
      const res = await fetch('/api/update-claim', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ telegramId: user.telegramId }),
      });
  
      const data = await res.json();
      if (data.success) {
        setNotification('+1000 claimed!');
        setCanClaim(false); // Disable claim button after successful claim
        checkClaim(user.telegramId); // Refresh claim status
  
        // Clear notification after 2 seconds
        setTimeout(() => {
          setNotification('');
        }, 2000);
      } else {
        setError(data.error || 'Failed to claim points');
      }
    }
  };
  

  return (
    <main>
      <div className='flex flex-col items-center justify-between h-screen w-full p-4'>
        <Profile />
        <div className="glass-panel flex justify-center items-center h-full p-4 mb-4 relative"> {/* Add relative positioning here */}
          <button
            className={`glass-button ${!canClaim ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleClaim}
            disabled={!canClaim}
          >
            {canClaim ? 'Claim Your Token' : 'You have claimed points!'}
          </button>

          {/* Notification with absolute positioning */}
          {notification && (
            <div className="absolute top-[-20px] left-1/2 transform -translate-x-1/2 mt-2 p-2 bg-green-100 text-green-700 rounded">
              {notification}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default HomeSection;
