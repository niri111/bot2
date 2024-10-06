// components/main/HomeSection.tsx
import React from 'react';
import Profile from './Profile';
const HomeSection: React.FC = () => {
  return (
    <section id="home" className="h-screen flex items-center justify-center bg-[#1e1e2f] text-white">
      <Profile userData={null} />
      <div className="text-center">
        <h1 className="text-5xl mb-4">Welcome to My Portfolio</h1>
        <p className="text-lg mb-4">I am a Full Stack Developer</p>
        <p className="text-md">
          Explore my projects, skills, and experiences in web development.
        </p>
      </div>
    </section>
  );
};

export default HomeSection
