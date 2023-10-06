import styles from './Chats.module.css';
import Profile from './Profile/Profile';

export default function Chats() {
  return (
    <div className={styles.root}>
      <Profile />
    </div>
  );
}