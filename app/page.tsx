'use client';
import { useState } from "react";
import HomeSection from "./components/main/HomeSection";
import Navbar from "./components/main/Navbar";
import TaskSection from "./components/main/TaskSection";
import FriendsSection from "./components/main/FriendsSection";
import WalletSection from "./components/main/WalletSection";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>('home'); // Initial section

  // Function to handle section change
  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  return (
    <main className="min-h-full min-w-full">
      <Navbar onSectionChange={handleSectionChange} />

      {/* Section with simplified animation */}
      <AnimatePresence>
        <motion.div
          key={activeSection} // Use key for animation on section change
          initial={{ opacity: 0 }} // Start fully transparent
          animate={{ opacity: 1 }} // Fade in
          exit={{ opacity: 0 }} // Fade out
          transition={{ duration: 0.5 }} // Duration of 0.5 seconds
          aria-live="polite" // Improve accessibility
        >
          {activeSection === 'home' && <HomeSection />}
          {activeSection === 'task' && <TaskSection />}
          {activeSection === 'friends' && <FriendsSection />}
          {activeSection === 'wallet' && (  
            <TonConnectUIProvider manifestUrl='https://f30f-105-235-135-100.ngrok-free.app/tonconnect-manifest.json'>
              <WalletSection />
            </TonConnectUIProvider>
          )}
          {/* Optional: Add a fallback for undefined sections */}
          {activeSection !== 'home' && activeSection !== 'task' && activeSection !== 'friends' && activeSection !== 'wallet' && (
            <div className="text-red-500">Section not found!</div>
          )}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
