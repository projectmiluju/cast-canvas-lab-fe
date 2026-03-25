import styles from './Toolbar.module.scss';

interface ToolbarProps {
  onAddNote: () => void;
  userName: string;
  onLogout: () => void;
}

export const Toolbar = ({ onAddNote, userName, onLogout }: ToolbarProps) => (
  <div className={styles.toolbar}>
    <button className={styles.button} onClick={onAddNote} title="노트 추가">
      Note
    </button>
    <span className={styles.userName}>{userName}</span>
    <button className={styles.button} onClick={onLogout}>
      로그아웃
    </button>
  </div>
);
