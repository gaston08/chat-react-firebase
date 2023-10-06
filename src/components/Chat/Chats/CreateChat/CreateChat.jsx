import styles from './CreateChat.module.css';

export default function CreateChat() {
  return (
    <div className={styles.root}>
      <div>Create or find a chat</div>
      <input type="text" />
    </div>
  );
}