import React, { useEffect } from 'react';

export enum DrawerDirection {
  TOP_TO_BOTTOM = 'top-to-bottom',
  BOTTOM_TO_TOP = 'bottom-to-top',
  LEFT_TO_RIGHT = 'left-to-right',
  RIGHT_TO_LEFT = 'right-to-left',
}

export enum DrawerSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

const DRAWER_WIDTH_SIZES = {
  [DrawerSize.SMALL]: 'w-1/4',
  [DrawerSize.MEDIUM]: 'w-1/2',
  [DrawerSize.LARGE]: 'w-3/4',
}

const DRAWER_HEIGHT_SIZES = {
  [DrawerSize.SMALL]: 'h-1/4',
  [DrawerSize.MEDIUM]: 'h-1/2',
  [DrawerSize.LARGE]: 'h-3/4',
}

const DRAWER_DIRECTIONS = {
  [DrawerDirection.TOP_TO_BOTTOM]: (size: DrawerSize = DrawerSize.MEDIUM) => 'top-0 left-0 right-0 ' + DRAWER_HEIGHT_SIZES[size],
  [DrawerDirection.BOTTOM_TO_TOP]: (size: DrawerSize = DrawerSize.MEDIUM) => 'bottom-0 left-0 right-0 ' + DRAWER_HEIGHT_SIZES[size],
  [DrawerDirection.LEFT_TO_RIGHT]: (size: DrawerSize = DrawerSize.MEDIUM) => 'top-0 left-0 bottom-0 ' + DRAWER_WIDTH_SIZES[size],
  [DrawerDirection.RIGHT_TO_LEFT]: (size: DrawerSize = DrawerSize.MEDIUM) => 'top-0 right-0 bottom-0 ' + DRAWER_WIDTH_SIZES[size],
}

export interface DrawerProps {
  direction: DrawerDirection;
  children: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
  size?: DrawerSize;
}

export function Drawer({
  direction,
  children,
  onClose,
  isOpen,
  size = DrawerSize.MEDIUM,
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
    return DRAWER_DIRECTIONS[directionValue](size);
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
