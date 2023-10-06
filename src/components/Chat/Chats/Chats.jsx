import styles from './Chats.module.css';
import Profile from './Profile/Profile';
import CreateChat from './CreateChat/CreateChat';
import ChatList from './ChatList/ChatList';

export default function Chats(props) {
  return (
    <div className={styles.root} {...props}>
      <Profile />
      <CreateChat />
      <ChatList />
    </div>
  );
}