import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Zap, Bot, Code, Upload, Folder, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import AIStatusIndicator from '@/components/AIStatusIndicator';

interface HeaderProps {
  onTabChange?: (tab: string) => void;
  activeTab?: string;
}

const Header: React.FC<HeaderProps> = ({ onTabChange, activeTab }) => {
  const { logout } = useAuth();

  const navItems = [
    { id: 'chat', label: 'AI Chat', icon: Bot },
    { id: 'generate', label: 'Generate', icon: Code },
    { id: 'projects', label: 'Projects', icon: Folder },
    { id: 'build', label: 'Build', icon: Zap },
    { id: 'publish', label: 'Publish', icon: Upload },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <header className="bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Zap className="w-8 h-8 text-yellow-300" />
              <div>
                <h1 className="text-xl font-bold">Ramzi Arcade's</h1>
                <p className="text-sm opacity-90">SUPER DUPER COMPUTER</p>
              </div>
            </div>
            <Badge className="bg-white text-green-600 font-bold animate-pulse">
              💚 100% FREE
            </Badge>
          </div>

          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  onClick={() => onTabChange?.(item.id)}
                  variant={activeTab === item.id ? 'secondary' : 'ghost'}
                  size="sm"
                  className={`text-white hover:bg-white/20 ${
                    activeTab === item.id ? 'bg-white/20' : ''
                  }`}
                >
                  <Icon className="w-4 h-4 mr-1" />
                  {item.label}
                </Button>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <AIStatusIndicator />
            <Button
              onClick={logout}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-3">
          <div className="flex flex-wrap gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  onClick={() => onTabChange?.(item.id)}
                  variant={activeTab === item.id ? 'secondary' : 'ghost'}
                  size="sm"
                  className={`text-white hover:bg-white/20 text-xs ${
                    activeTab === item.id ? 'bg-white/20' : ''
                  }`}
                >
                  <Icon className="w-3 h-3 mr-1" />
                  {item.label}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;