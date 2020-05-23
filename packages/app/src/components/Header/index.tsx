import React from 'react';
import styles from './index.module.scss';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className={styles.wrapper}>
      <Link to="/">
        <img src="/logo.svg" alt="logo" />
      </Link>
    </header>
  );
}
