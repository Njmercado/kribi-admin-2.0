import React, { useEffect } from 'react';

export enum DrawerDirection {
  TOP_TO_BOTTOM = 'top-to-bottom',
  BOTTOM_TO_TOP = 'bottom-to-top',
  LEFT_TO_RIGHT = 'left-to-right',
  RIGHT_TO_LEFT = 'right-to-left',
}

const DRAWER_DIRECTIONS = {
  [DrawerDirection.TOP_TO_BOTTOM]: 'top-0 left-0 right-0 h-1/2',
  [DrawerDirection.BOTTOM_TO_TOP]: 'bottom-0 left-0 right-0 h-1/2',
  [DrawerDirection.LEFT_TO_RIGHT]: 'top-0 left-0 bottom-0 w-1/2',
  [DrawerDirection.RIGHT_TO_LEFT]: 'top-0 right-0 bottom-0 w-1/2',
}

export interface DrawerProps {
  direction: DrawerDirection;
  children: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
}

export default function Drawer({
  direction,
  children,
  onClose,
  isOpen,
}: DrawerProps) {

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if ((event.target as HTMLElement).closest('.drawer-content') === null) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const getDrawerStyles = (directionValue: DrawerDirection) => {
    return DRAWER_DIRECTIONS[directionValue];
  };

  const getCloseButtonPosition = () => {
    switch (direction) {
      case DrawerDirection.TOP_TO_BOTTOM:
      case DrawerDirection.BOTTOM_TO_TOP:
      case DrawerDirection.RIGHT_TO_LEFT:
        return 'top-2 right-2';
      case DrawerDirection.LEFT_TO_RIGHT:
        return 'top-2 left-2';
      default:
        return '';
    }
  };

  return (
    isOpen &&
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className={`drawer-content fixed bg-white shadow-lg ${getDrawerStyles(direction)}`}>
        <button
          className={`absolute ${getCloseButtonPosition()} p-2 bg-red-500 text-white rounded`}
          onClick={onClose}
        >
          Close
        </button>
        <div className="p-4">{children}</div>
      </div>
    </div>
  )
};
