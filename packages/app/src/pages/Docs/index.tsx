import React, { useState, useCallback } from 'react';
import cx from 'classnames';
import styles from './index.module.scss';
import useScrollToTop from '../../hooks/use-scroll-to-top';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import NodeSDK from './NodeSDK';
import CommandLineTool from './CommandLineTool';
import WebAPI from './WebAPI';

export type TPageId = 'node-sdk' | 'cli' | 'web-api';

export default function Docs() {
  const [activePage, setActivePage] = useState<TPageId>('node-sdk');
  useScrollToTop();

  const handleView = useCallback((pageId: TPageId) => {
    setActivePage(pageId);
  }, []);

  return (
    <div className={styles.wrapper}>
      <Header />

      <nav className={styles.navbar}>
        <div className={styles.absolute}>
          <ul>
            <li className={cx(activePage === 'node-sdk' && styles.active)}>
              <a href="#nodeSDK">Node SDK</a>
            </li>
            <li className={cx(activePage === 'cli' && styles.active)}>
              <a href="#cli">Command Line Tool</a>
            </li>
            <li className={cx(activePage === 'web-api' && styles.active)}>
              <a href="#webAPI">Web API</a>
            </li>
          </ul>
        </div>
      </nav>

      <main className={styles.main}>
        <NodeSDK onEnter={handleView} />
        <CommandLineTool onEnter={handleView} />
        <WebAPI onEnter={handleView} />
      </main>
      <Footer />
    </div>
  );
}
