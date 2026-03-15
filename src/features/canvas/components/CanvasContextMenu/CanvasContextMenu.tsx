import { useEffect, useRef } from 'react';
import styles from './CanvasContextMenu.module.scss';

interface CanvasContextMenuProps {
  x: number;
  y: number;
  onAddNote: () => void;
  onClose: () => void;
}

export const CanvasContextMenu = ({ x, y, onAddNote, onClose }: CanvasContextMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

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
    <div ref={menuRef} className={styles.menu} style={{ top: y, left: x }}>
      <button
        className={styles.item}
        onClick={() => {
          onAddNote();
          onClose();
        }}
      >
        노트 추가
      </button>
    </div>
  );
};
