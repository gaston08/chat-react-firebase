import styles from './Main.module.css';
import Chat from '../Chat/Chat.jsx';

export default function Main() {
  return (
    <>
      <div className={styles.root}>
        <Chat />
      </div>
    </>
  );
}