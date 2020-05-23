import React from 'react';
import styles from './index.module.scss';
import useScrollToTop from '../../hooks/use-scroll-to-top';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import NodeSDK from './NodeSDK';
import CommandLineTool from './CommandLineTool';
import WebAPI from './WebAPI';

export default function Docs() {
  useScrollToTop();

  return (
    <div className={styles.wrapper}>
      <Header />

      <nav className={styles.navbar}>
        <div className={styles.absolute}>
          <ul>
            <li>
              <a href="#nodeSDK">Node SDK</a>
            </li>
            <li>
              <a href="#cli">Command Line Tool</a>
            </li>
            <li>
              <a href="#webAPI">Web API</a>
            </li>
          </ul>
        </div>
      </nav>

      <main className={styles.main}>
        <NodeSDK />
        <CommandLineTool />
        <WebAPI />
      </main>
      <Footer />
    </div>
  );
}
