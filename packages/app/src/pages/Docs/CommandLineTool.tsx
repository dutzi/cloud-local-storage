import React from 'react';
import styles from './index.module.scss';

export default function CommandLineTool() {
  return (
    <>
      <h1 id="cli">Command Line Tool</h1>

      <div className={styles.sections}>
        <div className={styles.section}>
          <h2>Install</h2>
          <p>To install cloud-local-storage's CLI tool, run</p>
          <div>
            <code className={styles.bash}>
              yarn global add cloud-local-storage-cli
            </code>
          </div>
          <p>Or, using npm</p>
          <div>
            <code className={styles.bash}>
              npm install -g cloud-local-storage-cli
            </code>
          </div>

          <h2>init</h2>
          <h3>Description</h3>
          <p>
            If you don't mind storing data on the global storage, you can go on
            and ignore this command. If, however, you prefer namespacing your
            storages, keeping them all under <i>your</i> account you will first
            need to sign up and get a token.
          </p>

          <p>
            Run <code className={styles.bash}>cls init</code> and follow the
            instructions to create an account. You will get a token which you
            will then use to load &amp; store data.
          </p>
          <p>
            The CLI tool will save that token in your home directory under a
            file name ".clsrc".
          </p>
          <p>
            <strong>Note:</strong> Whoever has access to that token can read
            &amp; write your content.
          </p>
        </div>

        <div className={styles.section}>
          <h2>get</h2>
          <h3>Description</h3>
          <p>
            Running <code className={styles.bash}>cls get</code> will ask you
            for a key and will then try fetching its value.
          </p>
        </div>

        <div className={styles.section}>
          <h2>set</h2>
          <h3>Description</h3>
          <p>
            <code className={styles.bash}>cls set</code> will ask you for a key
            and a value and will then store the data under that key.
          </p>
        </div>

        <div className={styles.section}>
          <h2>get-all-keys</h2>
          <h3>Description</h3>
          <p>
            <code className={styles.bash}>cls get-all-keys</code> will list all
            the keys stored within your account.
          </p>
        </div>

        <div className={styles.section}>
          <h2>reset-password</h2>
          <h3>Description</h3>
          <p>
            <code className={styles.bash}>cls reset-password</code> will ask you
            for your email and will send you a password reset email, assuming
            you've signed up before.
          </p>
        </div>
      </div>
    </>
  );
}
