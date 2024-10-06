'use client'
import React, { useEffect, useState } from 'react';
import Profile from './Profile'; // Ensure the path is correct
import { WebApp as WebAppType } from '@twa-dev/types';
import WebApp from '@twa-dev/sdk';

declare global {
  interface Window {
    Telegram?: {
      WebApp: WebAppType
    }
  }
}

const HomeSection = () => {
  const [timeLeft, setTimeLeft] = useState<number>(3600);
  const [canClaim, setCanClaim] = useState<boolean>(true);
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();

      const initDataUnsafe = tg.initDataUnsafe || {};
      console.log('Telegram initDataUnsafe:', initDataUnsafe);

      if (initDataUnsafe.user && !user) { // Only fetch if user data is available and user is not set
        fetch('/api/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(initDataUnsafe.user),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              setError(data.error);
            } else {
              setUser(data);
            }
          })
          .catch((err) => {
            setError('Failed to fetch user data');
          });
      } else if (!initDataUnsafe.user) {
        setError('No user data available');
      }
    } else {
      setError('This app should be opened in Telegram');
    }
  }, [user]); // Only run when 'user' changes

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (!canClaim) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setCanClaim(true); // Re-enable the button after countdown ends
            return 3600; // Reset to 1 hour
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer); // Cleanup the timer
  }, [canClaim]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleClaim = () => {
    if (canClaim) {
      setCanClaim(false); // Disable button
      console.log('Token claimed!');
      // Additional logic for claiming tokens can be added here
    }
  };

  const handleIncreasePoints = async () => {
    if (!user) return;

    try {
      const res = await fetch('/api/increase-points', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ telegramId: user.telegramId }),
      });
      const data = await res.json();
      if (data.success) {
        setUser({ ...user, points: data.points });
        setNotification('Points increased successfully!');
        setTimeout(() => setNotification(''), 3000);
      } else {
        setError('Failed to increase points');
      }
    } catch (err) {
      setError('An error occurred while increasing points');
    }
  };

  return (
    <main>
      <div className='flex flex-col items-center justify-between h-screen w-full p-4'>
        {/* Profile component at the top */}
        <Profile />
        {/* Glass panel or other content */}
        <div className="glass-panel flex justify-center items-center h-full p-4 mb-4">
          <div className="flex justify-center items-center h-full">
            <button
              className={`glass-button ${!canClaim ? 'opacity-50 cursor-not-allowed' : ''}`}
              style={{
                backgroundColor: 'rgba(113, 47, 255, 0.12)',
                backdropFilter: 'blur(12px)', 
                boxShadow: 'inset 0 0 12px #bf97ff3d',
                borderRadius: '1px',
                padding: '12px 24px',
                fontSize: '18px',
                fontWeight: '600', 
                lineHeight: '24px',
                letterSpacing: '0.2px',
                textAlign: 'center',
                textTransform: 'uppercase', 
                color: '#fff', 
                border: 'none',
                cursor: 'pointer',
              }}
              onClick={() => {
                handleClaim();
                handleIncreasePoints();
              }}
              disabled={!canClaim}
            >
              <span className="text-center text-sm">{canClaim ? 'Claim Your Token' : `Claim Again in ${formatTime(timeLeft)}`}</span>
            </button>

            {notification && (
              <div className="mt-4 p-2 bg-green-100 text-green-700 rounded">
                {notification}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomeSection;
