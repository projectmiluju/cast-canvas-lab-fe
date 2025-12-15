import styles from './Toolbar.module.scss';

interface ToolbarProps {
  onAddNote: () => void;
}

export const Toolbar = ({ onAddNote }: ToolbarProps) => (
  <div className={styles.toolbar}>
    <button className={styles.button} onClick={onAddNote} title="노트 추가">
      Note
    </button>
  </div>
);
