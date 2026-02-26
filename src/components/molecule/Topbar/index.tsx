import React from 'react';
import { IconButton } from '@/components/atom';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';

interface TopbarProps {
  userName: string | null;
  onLogout: () => void;
  onToggleSidebar?: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ userName, onLogout, onToggleSidebar }) => {
  return (
    <header className="h-16 bg-primary text-on-primary shadow-elevation-4 flex items-center justify-between px-4 z-20">
      <div className="flex items-center">
        <IconButton color="default" className="text-on-primary hover:bg-white/10 mr-4 md:hidden" onClick={onToggleSidebar}>
          <MenuIcon className="w-6 h-6" />
        </IconButton>
        <h1 className="text-xl font-bold tracking-wide">Kribi Admin 2.0</h1>
      </div>
      <div className="flex items-center space-x-4">
        {userName && <span className="hidden sm:inline-block font-medium">Welcome, {userName}</span>}
        <IconButton color="default" className="text-on-primary hover:bg-white/10" onClick={onLogout} title="Logout">
          <LogoutIcon className="w-6 h-6" />
        </IconButton>
      </div>
    </header>
  );
};
