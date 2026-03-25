import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './CanvasContextMenu.module.scss';

export interface ContextMenuItem {
  label: string;
  onClick: () => void;
}

interface CanvasContextMenuProps {
  x: number;
  y: number;
  items: ContextMenuItem[];
  onClose: () => void;
}

const VIEWPORT_PADDING = 8;

export const CanvasContextMenu = ({ x, y, items, onClose }: CanvasContextMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x, y });

  useLayoutEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    const { width, height } = menu.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const clampedX = Math.min(x, viewportWidth - width - VIEWPORT_PADDING);
    const clampedY = Math.min(y, viewportHeight - height - VIEWPORT_PADDING);

    setPosition({
      x: Math.max(VIEWPORT_PADDING, clampedX),
      y: Math.max(VIEWPORT_PADDING, clampedY),
    });
  }, [x, y]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div ref={menuRef} className={styles.menu} style={{ top: position.y, left: position.x }}>
      {items.map((item) => (
        <button
          key={item.label}
          className={styles.item}
          onClick={() => {
            item.onClick();
            onClose();
          }}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};
