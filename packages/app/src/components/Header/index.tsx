import React from 'react';
import styles from './index.module.scss';

export default function Header() {
  return (
    <header className={styles.wrapper}>
      <img src="/logo.svg" alt="logo" />
    </header>
  );
}
