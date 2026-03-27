import styles from './Toolbar.module.scss';

const PlusIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const LogoutIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

interface ToolbarProps {
  onAddNote: () => void;
  userName: string;
  onLogout: () => void;
}

export const Toolbar = ({ onAddNote, userName, onLogout }: ToolbarProps) => (
  <div className={styles.toolbar}>
    <div className={styles.brand}>
      <img src="/logo.svg" alt="" className={styles.brandMark} aria-hidden="true" />
    </div>

    <div className={styles.divider} />

    <button className={styles.button} onClick={onAddNote} title="노트 추가">
      <PlusIcon />
      <span>노트</span>
    </button>

    <div className={styles.spacer} />

    <span className={styles.userName}>{userName}</span>
    <button className={styles.button} onClick={onLogout} title="로그아웃">
      <LogoutIcon />
      <span>로그아웃</span>
    </button>
  </div>
);
