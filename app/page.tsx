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
  const [sectionLoading, setSectionLoading] = useState(false); // Add a loading state

  // Function to handle section change
  const handleSectionChange = (section: string) => {
    setSectionLoading(true); // Set loading state to true
    setActiveSection(section);
  };

  return (
    <main className="min-h-full min-w-full">
      <Navbar onSectionChange={handleSectionChange} />

      {/* Add a loading indicator */}
      {sectionLoading && (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
          <div className="loader" />
        </div>
      )}

      {/* Section with Animation */}
      <AnimatePresence>
        <motion.div
          key={activeSection} // Use key for animation on section change
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
          aria-live="polite" // Improve accessibility
          onAnimationComplete={() => setSectionLoading(false)} // Set loading state to false when animation completes
        >
          {activeSection === 'home' && <HomeSection />}
          {activeSection === 'task' && <TaskSection />}
          {activeSection === 'friends' && <FriendsSection />}
          {activeSection === 'wallet' && (  
            <TonConnectUIProvider manifestUrl="https://raw.githubusercontent.com/ton-blockchain/wallets-list/main/wallets-v2.json">
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
