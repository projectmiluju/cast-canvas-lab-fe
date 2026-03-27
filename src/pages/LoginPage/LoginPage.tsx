import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLogin } from '../../features/auth/hooks/useLogin';
import styles from './LoginPage.module.scss';

const MailIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m2 7 10 7 10-7" />
  </svg>
);

const LockIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </svg>
);

const EyeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

export const LoginPage = () => {
  const navigate = useNavigate();
  const { mutate: login, isPending, error } = useLogin();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login(
      { email, password },
      {
        onSuccess: () => navigate('/'),
      },
    );
  };

  return (
    <div className={styles.page}>
      <div className={styles.brand}>
        <img src="/logo.svg" alt="" className={styles.brandMark} aria-hidden="true" />
        <span className={styles.brandName}>CastCanvas Lab</span>
      </div>

      <div className={styles.card}>
        <div className={styles.titleBlock}>
          <h1 className={styles.title}>로그인</h1>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="email">
              이메일
            </label>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}>
                <MailIcon />
              </span>
              <input
                id="email"
                className={styles.input}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div className={styles.field}>
            <div className={styles.fieldHeader}>
              <label className={styles.label} htmlFor="password">
                비밀번호
              </label>
            </div>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}>
                <LockIcon />
              </span>
              <input
                id="password"
                className={styles.input}
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className={styles.inputToggle}
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          {error && <p className={styles.error}>{error.message}</p>}

          <button className={styles.submitButton} type="submit" disabled={isPending}>
            {isPending ? '로그인 중...' : '로그인'}
          </button>
        </form>

        <div className={styles.cardFooter}>
          계정이 없으신가요?
          <Link className={styles.link} to="/signup">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
};
