import styles from './Profile.module.css';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../../firebase";
import { 
  generateColor,
  invertColor,
  getInitials,
} from '../../../../utils/chat';

export default function Profile(props) {

  const [user] = useAuthState(auth);
  const username = localStorage.getItem('username');
  const color = generateColor(user.uid);
  const oppositeColor = invertColor(color, true);
  const initials = getInitials(username).toUpperCase();

  return (
    <div className={styles.root}>
      <div 
        className={styles.avatarPicture}
        style={{
          backgroundColor: color,
          color: oppositeColor
        }}
      >
        {initials}
      </div>
      <div className={styles.username}>
        {username.toUpperCase()}
      </div>
    </div>
  );
}