import React from 'react';
import styles from './index.module.scss';

export default function Footer() {
  return (
    <footer className={styles.wrapper}>
      a side project by{' '}
      <a href="https://dutzi.party/" target="_blank" rel="noopener noreferrer">
        dutzi
      </a>
    </footer>
  );
}
