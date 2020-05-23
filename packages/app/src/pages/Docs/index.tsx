import React, { useEffect } from 'react';
import styles from './index.module.scss';
import { Link } from 'react-router-dom';
import highlightCode from '../../utils/highlight-code';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const codeWelcome = highlightCode(
  `
import cls from 'cloud-local-storage';

await cls.setItem('foo', {bar: 1})
await cls.getItem('foo'); // {bar: 1}
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
const myStorage = cls('afde3b08…');
myStorage.setItem('userData', {a: 1});
myStorage.getItem('userData') // {a: 1}
`,
  styles
);

export default function Docs() {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className={styles.wrapper}>
      <Header />

      <main className={styles.sections}>
        <div className={styles.section}>
          <h2>getItem</h2>
          <div className={styles.methodAndPath}>
            GET <span className={styles.muted}>https://cls.tools/</span>
            getItem?token=afd…&amp;key=some-key
          </div>
          <h3>Query Params</h3>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <tbody>
                <tr>
                  <td>token</td>
                  <td>optional</td>
                  <td>
                    Your token, generated using cloud-local-storage's{' '}
                    <Link to="/cli">CLI tool</Link>
                  </td>
                </tr>
                <tr>
                  <td>key</td>
                  <td>required</td>
                  <td>The retrieved item's key</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h3>Response</h3>
          <p>
            <span className={styles.muted}>object</span> The item's data
          </p>
        </div>

        <div className={styles.section}>
          <h2>setItem</h2>
          <div className={styles.methodAndPath}>
            POST <span className={styles.muted}>https://cls.tools/</span>
            setItem
          </div>
          <h3>
            Body <span className={styles.muted}>(JSON)</span>
          </h3>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <tbody>
                <tr>
                  <td>token</td>
                  <td>optional</td>
                  <td>
                    Your token, generated using cloud-local-storage's{' '}
                    <Link to="/cli">CLI tool</Link>
                  </td>
                </tr>
                <tr>
                  <td>key</td>
                  <td>optional</td>
                  <td>The item's key</td>
                </tr>
                <tr>
                  <td>data</td>
                  <td>required</td>
                  <td>The item's data</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h3>Response</h3>
          <p>
            <span className={styles.muted}>string</span> The item's key
          </p>
        </div>

        <div className={styles.section}>
          <h2>getStorages</h2>
          <div className={styles.methodAndPath}>
            GET <span className={styles.muted}>https://cls.tools/</span>
            getStorages?token=afde3b08…
          </div>
          <h3>Query Params</h3>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <tbody>
                <tr>
                  <td>token</td>
                  <td>required</td>
                  <td>
                    Your token, generated using cloud-local-storage's{' '}
                    <Link to="/cli">CLI tool</Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <h3>Response</h3>
          <p>
            <span className={styles.muted}>string[]</span> A list of storage
            keys
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
