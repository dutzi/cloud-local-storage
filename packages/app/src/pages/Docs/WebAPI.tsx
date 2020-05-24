import React, { useCallback } from 'react';
import styles from './index.module.scss';
import { Link } from 'react-router-dom';
import useIntersectionObserver from '../../hooks/use-intersection-observer';
import { TPageId } from './';

export default function WebAPI({
  onEnter,
}: {
  onEnter: (pageId: TPageId, ratio: number) => void;
}) {
  const wrapperRef = useIntersectionObserver(
    useCallback(onEnter.bind(null, 'web-api'), [])
  );

  return (
    <div ref={wrapperRef}>
      <h1 id="webAPI">Web API</h1>

      <div className={styles.sections}>
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
                    <Link to="#cli">CLI tool</Link>. If not provided, data will
                    be stored on the global storage
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
                    <Link to="#cli">CLI tool</Link>. If not provided, data will
                    be stored on the global storage
                  </td>
                </tr>
                <tr>
                  <td>key</td>
                  <td>optional</td>
                  <td>
                    The item's key. If not provided, a random key will be
                    generater for you
                  </td>
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
          <h2>getAllKeys</h2>
          <div className={styles.methodAndPath}>
            GET <span className={styles.muted}>https://cls.tools/</span>
            getAllKeys?token=afde3b08…
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
                    <Link to="#cli">CLI tool</Link>
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
      </div>
    </div>
  );
}
