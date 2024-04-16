import { useEffect } from "react";
import styles from "./Main.module.css";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import MessageSide from "./components/MessageSide/MessageSide";
import Chats from "./components/Chats/Chats";
import { useParams } from "react-router-dom";

export default function Main() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const params = useParams();
  const roomId = window.location.search.split("=")[1];

  useEffect(() => {
    if (!user) {
      navigate(`/welcome`);
    }
  }, [user]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="container clearfix">
      <div className="people-list" id="people-list">
        <Chats />
      </div>
      <div className="chat">
        {roomId ? <MessageSide /> : <NoChat className={styles.nochat} />}
      </div>
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
