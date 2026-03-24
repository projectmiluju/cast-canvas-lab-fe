import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSignup } from '../../features/auth/hooks/useSignup';
import styles from './SignupPage.module.scss';

export const SignupPage = () => {
  const navigate = useNavigate();
  const { mutate: signup, isPending, error } = useSignup();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signup(
      { name, email, password },
      {
        onSuccess: () => navigate('/'),
      },
    );
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>회원가입</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="name">
              이름
            </label>
            <input
              id="name"
              className={styles.input}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="email">
              이메일
            </label>
            <input
              id="email"
              className={styles.input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="password">
              비밀번호
            </label>
            <input
              id="password"
              className={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>
          {error && <p className={styles.error}>{error.message}</p>}
          <button className={styles.submitButton} type="submit" disabled={isPending}>
            {isPending ? '가입 중...' : '회원가입'}
          </button>
        </form>
        <p className={styles.footer}>
          이미 계정이 있으신가요?{' '}
          <Link className={styles.link} to="/login">
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
};
