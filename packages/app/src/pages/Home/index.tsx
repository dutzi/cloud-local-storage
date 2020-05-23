import React, { useEffect, useRef } from 'react';
import styles from './index.module.scss';
import { Link } from 'react-router-dom';
import useScrollToTop from '../../hooks/use-scroll-to-top';
import highlightCode from '../../utils/highlight-code';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const codeWelcome = highlightCode(
  `
import cls from 'cloud-local-storage'

await cls.setItem('foo', {bar: 1})
await cls.getItem('foo') // {bar: 1}
`,
  styles
);

const codeUUID = highlightCode(
  `
await cls.setItem({bar: 1}) // c6cd9316…
await cls.getItem('c6cd9316…') // {bar: 1}
`,
  styles
);

const codeToken = highlightCode(
  `
const myStorage = cls('afde3b08…')
myStorage.setItem('userData', {a: 1})
myStorage.getItem('userData') // {a: 1}
`,
  styles
);

export default function Docs() {
  const arrowDownRef = useRef<HTMLImageElement>(null);

  useScrollToTop();

  useEffect(() => {
    function handleScroll() {
      if (!arrowDownRef.current) {
        return;
      }

      arrowDownRef.current.style.opacity = window.scrollY > 20 ? '0' : '1';
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <Header />

      <main className={styles.sections}>
        <div className={styles.section}>
          <h2>Serverless storage exposed via simple, familiar API</h2>
          <p>
            Simply call getItem &amp; setItem, passing a name and a value and
            your data is stored forever on cloud-local-storage.
          </p>

          <pre className={styles.code}>
            <code dangerouslySetInnerHTML={{ __html: codeWelcome }}></code>
          </pre>

          <div className={styles.gutter}>
            <Link to="/docs" className={styles.linkButton}>
              Read Docs
            </Link>
          </div>
        </div>

        <img
          ref={arrowDownRef}
          className={styles.arrow}
          alt="arrow down"
          src="/chevron-down.svg"
        />

        <div className={styles.section}>
          <h2>What if someone overwrites my data?</h2>
          <p>
            Call setItem, passing it only the data, cloud-local-storage will
            generate a unique key using uuidv4 and return it to you. There’s
            little chance someone will get the same key*.
          </p>

          <pre className={styles.code}>
            <code dangerouslySetInnerHTML={{ __html: codeUUID }}></code>
          </pre>

          <a
            href="https://en.wikipedia.org/wiki/Universally_unique_identifier#Collisions"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footnote}
          >
            * The number of random version-4 UUIDs which need to be generated in
            order to have a 50% probability of at least one collision is 2.71
            quintillion
          </a>
        </div>

        <div className={styles.section}>
          <h2>That’s not enough, I want to namespace my storage!</h2>
          <p>
            No problem! Call cls passing it your token (generated through
            cloud-local-storage’s <Link to="/docs#cli">CLI tool</Link>), that
            will return a namespaced version of cls, calling setItem and getItem
            on it will save/load data from
            <i>your</i> storage.
          </p>

          <pre className={styles.code}>
            <code dangerouslySetInnerHTML={{ __html: codeToken }}></code>
          </pre>
        </div>

        <div className={styles.section}>
          <h2>Stored On Firebase. Forever Free.</h2>
          <p>
            Cloud Local Stoage stores your data on firebase servers and has an
            SDK for Node and Web.{' '}
          </p>
          <p>
            If you prefer you can use its API directly, docs are{' '}
            <Link to="/docs">here</Link>.
          </p>
          <p>
            It also offers a simple <Link to="/docs#cli">CLI tool</Link> that
            helps manage your stored items.
          </p>
          <p>It’s open-source and free, and will always be.</p>
          <p>
            Icons by{' '}
            <a
              href="https://fontawesome.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.muted}
            >
              Font Awesome
            </a>
            , logos from{' '}
            <a
              href="https://svgporn.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.muted}
            >
              SVG Porn
            </a>
            .
          </p>

          <div className={styles.logos}>
            <a
              href="https://firebase.google.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                style={{ width: '60px' }}
                src="/firebase.svg"
                alt="firebase logo"
              />
            </a>
            <a
              href="https://npmjs.com/cloud-local-storage"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img style={{ width: '120px' }} src="/npm.svg" alt="npm logo" />
            </a>
            <a
              href="https://github.com/dutzi/cloud-local-storage"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                style={{ width: '120px' }}
                src="/github.svg"
                alt="github logo"
              />
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
