import styles from './Chat.module.css';
import MessageSide from './MessageSide/MessageSide';
import Chats from './Chats/Chats';
import { useParams } from 'react-router-dom';

export default function Chat() {
  const params = useParams();
  let a = window.location.search.split('=')[1];

  return (
    <div className={styles.root}>
      <Chats />
      <>
        {
          a ?
          (<MessageSide />)
          :
          (<NoChat className={styles.nochat} />)
        }
      </>
      
    </div>
  );
}

function NoChat(props) {
  return (
    <div
      style={{
        flexBasis: "50%",
        flexGrow: "1",
        height: "100%",
        position: "relative",
        display: "flex",
      }}
      {...props}
    >
      <h1>Select a chat</h1>
    </div>
  );
}