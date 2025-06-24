import React, { useState } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { useIsMobile } from '@/hooks/use-mobile';
import Header from './Header';
import EnhancedChatInterface from './EnhancedChatInterface';
import WelcomeScreen from './WelcomeScreen';

const AppLayout: React.FC = () => {
  const { sidebarOpen, toggleSidebar } = useAppContext();
  const isMobile = useIsMobile();
  const [showWelcome, setShowWelcome] = useState(true);

  const handleGetStarted = () => {
    setShowWelcome(false);
  };

  if (showWelcome) {
    return (
      <div className="h-screen bg-black flex flex-col">
        <Header onMenuClick={toggleSidebar} onNewChat={handleGetStarted} />
        <WelcomeScreen onGetStarted={handleGetStarted} />
      </div>
    );
  }

  return (
    <div className="h-screen bg-black flex flex-col">
      <Header onMenuClick={toggleSidebar} onNewChat={() => setShowWelcome(true)} />
      <div className="flex-1 overflow-hidden">
        <EnhancedChatInterface />
      </div>
    </div>
  );
};

export default AppLayout;