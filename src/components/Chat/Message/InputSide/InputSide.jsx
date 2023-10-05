import styles from './InputSide.module.css';

export default function InputSide() {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.inputBox}>
          <input type="text" className={styles.input} />
        </div>
        <button className={styles.sendButton}>
          Send
        </button>
      </div>
    </div>
  );
}