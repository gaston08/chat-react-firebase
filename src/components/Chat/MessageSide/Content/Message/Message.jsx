import styles from './Message.module.css';
import { 
  getInitials, 
  generateColor,
  invertColor,
} from '../../../../../utils/chat';

export default function Message(props) {
  const { message, isOwner } = props;
  let initials = getInitials(message.name).toUpperCase();
  let color = generateColor(message.uid);
  let oppositeColor = invertColor(color, true);

  return (
    <div 
      className={styles.root}
      style={{
        justifyContent: isOwner ? 'end' : 'start',
      }}
    >
      {
        isOwner ?
        (
          <>
            <div className={styles.textOwner}>
              {message.text}
            </div>
            <div 
              className={styles.avatarPicture}
              style={{
                backgroundColor: color,
                color: oppositeColor
              }}
            >
              {initials}
            </div>
          </>
        )
        :
        (
          <>
            <div 
              className={styles.avatarPicture}
              style={{
                backgroundColor: color,
                color: oppositeColor
              }}
            >
              {initials}
            </div>
            <div className={styles.text}>
              {message.text}
            </div>
          </>
        )
      }
    </div>
  );
}