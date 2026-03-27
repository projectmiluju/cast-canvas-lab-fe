import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSignup } from '../../features/auth/hooks/useSignup';
import styles from './SignupPage.module.scss';

const PersonIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
  </svg>
);

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

export const SignupPage = () => {
  const navigate = useNavigate();
  const { mutate: signup, isPending, error } = useSignup();

  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signup(
      { nickname, email, password },
      {
        onSuccess: () => navigate('/login'),
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
          <h1 className={styles.title}>회원가입</h1>
          <p className={styles.subtitle}>CastCanvas Lab과 함께 창의적인 여정을 시작하세요.</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="nickname">
              닉네임
            </label>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}>
                <PersonIcon />
              </span>
              <input
                id="nickname"
                className={styles.input}
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="사용하실 닉네임을 입력하세요"
                required
                autoComplete="nickname"
              />
            </div>
          </div>

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
            <label className={styles.label} htmlFor="password">
              비밀번호
            </label>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}>
                <LockIcon />
              </span>
              <input
                id="password"
                className={styles.input}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="8자 이상의 영문, 숫자 조합"
                required
                autoComplete="new-password"
              />
            </div>
          </div>

          {error && <p className={styles.error}>{error.message}</p>}

          <button className={styles.submitButton} type="submit" disabled={isPending}>
            {isPending ? '가입 중...' : '회원가입'}
          </button>
        </form>

        <div className={styles.cardFooter}>
          이미 계정이 있으신가요?
          <Link className={styles.link} to="/login">
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
};
