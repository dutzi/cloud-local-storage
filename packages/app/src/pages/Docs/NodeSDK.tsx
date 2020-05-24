import React, { useCallback } from 'react';
import styles from './index.module.scss';
import { Link } from 'react-router-dom';
import useIntersectionObserver from '../../hooks/use-intersection-observer';
import { TPageId } from './';

export default function NodeSDK({
  onEnter,
}: {
  onEnter: (pageId: TPageId, ratio: number) => void;
}) {
  const wrapperRef = useIntersectionObserver(
    useCallback(onEnter.bind(null, 'node-sdk'), [])
  );

  return (
    <div ref={wrapperRef}>
      <h1 id="nodeSDK">Node SDK</h1>

      <div className={styles.sections}>
        <div className={styles.section}>
          <h2>Install</h2>
          <p>To install cloud-local-storage, run</p>
          <div>
            <code className={styles.bash}>yarn add cloud-local-storage</code>
          </div>
          <p>Or, using npm</p>
          <div>
            <code className={styles.bash}>
              npm install --save cloud-local-storage
            </code>
          </div>
          <h2>getItem</h2>
          <h3>Examples</h3>
          <code className={styles.examples}>
            <div>
              <span className={styles.muted}>await cls.</span>
              getItem('some-key')
            </div>
            <div>
              <span className={styles.muted}>await cls.</span>
              getItem('some-key', 'afde3b08…')
            </div>
          </code>
          <h3>Arguments</h3>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <tbody>
                <tr>
                  <td>key</td>
                  <td>required</td>
                  <td>The retrieved item's key</td>
                </tr>
                <tr>
                  <td>token</td>
                  <td>optional</td>
                  <td>
                    Your token, generated using cloud-local-storage's{' '}
                    <Link to="#cli">CLI tool</Link>. If not provided, data will
                    be stored on the global storage
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <h3>Return Value</h3>
          <p>
            <span className={styles.muted}>Promise&lt;any&gt;</span> The item's
            data
          </p>
        </div>

        <div className={styles.section}>
          <h2>setItem</h2>
          <h3>Examples</h3>
          <code className={styles.examples}>
            <div>
              <span className={styles.muted}>await cls.</span>
              setItem('some-key', &#x7b;a: 1&#x7d;)
            </div>
            <div>
              <span className={styles.muted}>await cls.</span>
              setItem('some-key', &#x7b;a: 1&#x7d;, 'afde3b…')
            </div>
            <div>
              <span className={styles.muted}>await cls.</span>
              setItem(&#x7b;a: 1&#x7d;)
            </div>
          </code>
          <code className={styles.methodAndPath}></code>
          <h3>Arguments</h3>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <tbody>
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
                <tr>
                  <td>token</td>
                  <td>optional</td>
                  <td>
                    Your token, generated using cloud-local-storage's{' '}
                    <Link to="#cli">CLI tool</Link>. If not provided, data will
                    be stored on the global storage
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <h3>Return Value</h3>
          <p>
            <span className={styles.muted}>Promise&lt;string&gt;</span> The
            item's key
          </p>
        </div>

        <div className={styles.section}>
          <h2>getAllKeys</h2>
          <h3>Examples</h3>
          <code className={styles.examples}>
            <div>
              <span className={styles.muted}>await cls.</span>
              getAllKeys('afde3b08…')
            </div>
          </code>
          <code className={styles.methodAndPath}></code>
          <h3>Arguments</h3>
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
          <h3>Return Value</h3>
          <p>
            <span className={styles.muted}>Promise&lt;string[]&gt;</span> A list
            of storage keys
          </p>
        </div>
      </div>
    </div>
  );
}
