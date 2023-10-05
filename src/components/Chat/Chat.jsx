import styles from './Chat.module.css';
import Message from './Message/Message';
import Chats from './Chats/Chats';

export default function Chat() {
  return (
    <div className={styles.root}>
      <Chats />
      <Message />
    </div>
  );
}