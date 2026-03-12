import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ArticleIcon from '@mui/icons-material/Article';
import PeopleIcon from '@mui/icons-material/People';
import { Action, ActionType } from '@/contants';
import { useHaveAccess } from '@/hooks';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const { haveAccess } = useHaveAccess();

  const links = [
    {
      name: 'Words',
      path: '/dashboard',
      icon: (<LibraryBooksIcon className="w-6 h-6" />),
      entitlement: Action.VIEW_WORD
    },
    {
      name: 'Articles',
      path: '/dashboard/article',
      icon: (<ArticleIcon className="w-6 h-6" />),
      entitlement: Action.VIEW_ARTICLE
    },
    {
      name: 'Users',
      path: '/dashboard/users',
      icon: (<PeopleIcon className="w-6 h-6" />),
      entitlement: Action.VIEW_USER
    },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar drawer */}
      <aside className={`fixed inset-y-0 left-0 w-64 bg-surface shadow-elevation-8 z-30 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full pt-16 md:pt-4">
          <nav className="flex-1 px-4 space-y-2 mt-4">
            {links.map((link) => {
              const isActive = pathname === link.path;
              const haveAccessToLink = haveAccess(link.entitlement as ActionType);
              return haveAccessToLink ? (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-primary-light/20 text-primary' : 'text-text-secondary hover:bg-gray-100 hover:text-text-primary'}`}
                >
                  <span className={isActive ? 'text-primary' : 'text-text-secondary'}>{link.icon}</span>
                  <span className="font-medium">{link.name}</span>
                </Link>
              ) : null;
            })}
          </nav>
        </div>
      </aside>
    </>
  );
};
