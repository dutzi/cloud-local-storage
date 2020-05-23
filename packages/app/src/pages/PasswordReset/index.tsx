import React from 'react';
import styles from './index.module.scss';
import { Link } from 'react-router-dom';
import useScrollToTop from '../../hooks/use-scroll-to-top';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function PasswordReset() {
  useScrollToTop();

  return (
    <div className={styles.wrapper}>
      <Header />

      <main className={styles.main}>
        Your password was succefully reset{' '}
        <span role="img" aria-label="heart">
          🧡
        </span>
      </main>
      <Footer />
    </div>
  );
}
