import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from '@/components/ui/use-toast';

interface AppContextType {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  autoUpdateEnabled: boolean;
  setAutoUpdateEnabled: (enabled: boolean) => void;
}

const defaultAppContext: AppContextType = {
  sidebarOpen: false,
  toggleSidebar: () => {},
  autoUpdateEnabled: true,
  setAutoUpdateEnabled: () => {},
};

const AppContext = createContext<AppContextType>(defaultAppContext);

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [autoUpdateEnabled, setAutoUpdateEnabled] = useState(() => {
    const saved = localStorage.getItem('autoUpdateEnabled');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  // Save auto-update preference to localStorage
  useEffect(() => {
    localStorage.setItem('autoUpdateEnabled', JSON.stringify(autoUpdateEnabled));
  }, [autoUpdateEnabled]);

  // Show welcome message about auto-updates on first load
  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('hasSeenAutoUpdateWelcome');
    if (!hasSeenWelcome) {
      setTimeout(() => {
        toast({
          title: 'Auto-Updates Enabled! 🚀',
          description: 'SUPER DUPER COMPUTER will automatically check for and install AI model updates to keep you on the cutting edge.',
          duration: 5000
        });
        localStorage.setItem('hasSeenAutoUpdateWelcome', 'true');
      }, 2000);
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        sidebarOpen,
        toggleSidebar,
        autoUpdateEnabled,
        setAutoUpdateEnabled,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};