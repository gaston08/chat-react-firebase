import styles from './Chat.module.css';
import MessageSide from './MessageSide/MessageSide';
import Chats from './Chats/Chats';

export default function Chat() {
  return (
    <div className={styles.root}>
      <Chats />
      <MessageSide />
    </div>
  );
}