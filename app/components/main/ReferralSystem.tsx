'use client'
import { useState, useEffect } from 'react';
import { IonIcon } from "@ionic/react";
import { copyOutline, personAddOutline } from "ionicons/icons";

interface ReferralSystemProps {
  initData: string;
  userId: string;
  startParam: string;
}

const ReferralSystem: React.FC<ReferralSystemProps> = ({ initData, userId, startParam }) => {
  const [referrals, setReferrals] = useState<string[]>([]);
  const [referrer, setReferrer] = useState<string | null>(null);
  const INVITE_URL = "https://t.me/test_1234111111_bot/start";

  useEffect(() => {
    const checkReferral = async () => {
      if (startParam && userId) {
        try {
          const response = await fetch('/api/referrals', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, referrerId: startParam }),
          });
          if (!response.ok) throw new Error('Failed to save referral');
        } catch (error) {
          console.error('Error saving referral:', error);
        }
      }
    };

    const fetchReferrals = async () => {
      if (userId) {
        try {
          const response = await fetch(`/api/referrals?userId=${userId}`);
          if (!response.ok) throw new Error('Failed to fetch referrals');
          const data = await response.json();
          setReferrals(data.referrals);
          setReferrer(data.referrer);
        } catch (error) {
          console.error('Error fetching referrals:', error);
        }
      }
    };

    checkReferral();
    fetchReferrals();
  }, [userId, startParam]);

  const handleInviteFriend = async () => {
    const inviteLink = `${INVITE_URL}?startapp=${userId}`;
    const shareText = `Join me on this awesome Telegram mini app!`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Invite to Telegram App',
          text: shareText,
          url: inviteLink,
        });
        console.log('Link shared successfully');
      } catch (error) {
        console.error('Error sharing link:', error);
      }
    } else {
      console.log('Web Share API is not supported. Falling back to open link.');
      window.open(`https://t.me/share/url?url=${encodeURIComponent(inviteLink)}&text=${encodeURIComponent(shareText)}`, '_blank');
    }
  };

  const handleCopyLink = () => {
    const inviteLink = `${INVITE_URL}?startapp=${userId}`;
    navigator.clipboard.writeText(inviteLink);
    // No notification will be shown
  };

  return (
    <div className="w-full max-w-md relative">
      {referrer && (
        <p className="text-green-500 mb-4">You were referred by user {referrer}</p>
      )}
      <div className="flex items-center justify-center space-x-4">
        <button
          onClick={handleInviteFriend}
          className="bg-[#03001480] backdrop-blur-md text-white font-bold py-2 px-4 rounded border border-transparent hover:border-blue-500 transition duration-300 ease-in-out flex items-center space-x-2"
        >
          <IonIcon icon={personAddOutline} className="text-xl" />
          <span>Invite Friends</span>
        </button>
        <button
          onClick={handleCopyLink}
          className="bg-[#03001480] backdrop-blur-md text-white font-bold py-2 px-4 rounded border border-transparent hover:border-blue-500 transition duration-300 ease-in-out flex items-center justify-center"
        >
          <IonIcon icon={copyOutline} className="text-2xl" />
        </button>
      </div>
      {referrals.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Your Referrals</h2>
          <ul>
            {referrals.map((referral, index) => (
              <li key={index} className="bg-gray-100 p-2 mb-2 rounded">
                User {referral}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ReferralSystem
