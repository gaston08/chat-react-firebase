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

/*export default function Main2() {
  return (
    <div className="container clearfix">
      <div className="people-list" id="people-list">
        <div className="search">
          <input type="text" placeholder="search" />
          <i className="fa fa-search"></i>
        </div>
        <ul className="list">
          <li className="clearfix">
            <div className="about">
              <div className="name">Vincent Porter</div>
              <div className="status">
                <i className="fa fa-circle online"></i> online
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div className="chat">
        <div className="chat-header clearfix">
          <div className="chat-about">
            <div className="chat-with">Chat with Vincent Porter</div>
            <div className="chat-num-messages">already 1 902 messages</div>
          </div>
          <i className="fa fa-star"></i>
        </div>

        <div className="chat-history">
          <ul>
            <li className="clearfix">
              <div className="message-data align-right">
                <span className="message-data-time">10:10 AM, Today</span>{" "}
                &nbsp; &nbsp;
                <span className="message-data-name">Olia</span>{" "}
                <i className="fa fa-circle me"></i>
              </div>
              <div className="message other-message float-right">
                Hi Vincent, how are you? How is the project coming along?
              </div>
            </li>
            <li className="clearfix">
              <div className="message-data align-right">
                <span className="message-data-time">10:10 AM, Today</span>{" "}
                &nbsp; &nbsp;
                <span className="message-data-name">Olia</span>{" "}
                <i className="fa fa-circle me"></i>
              </div>
              <div className="message other-message float-right">
                Hi Vincent, how are you? How is the project coming along?
              </div>
            </li>
            <li className="clearfix">
              <div className="message-data align-right">
                <span className="message-data-time">10:10 AM, Today</span>{" "}
                &nbsp; &nbsp;
                <span className="message-data-name">Olia</span>{" "}
                <i className="fa fa-circle me"></i>
              </div>
              <div className="message other-message float-right">
                Hi Vincent, how are you? How is the project coming along?
              </div>
            </li>

            <li>
              <div className="message-data">
                <span className="message-data-name">
                  <i className="fa fa-circle online"></i> Vincent
                </span>
                <span className="message-data-time">10:12 AM, Today</span>
              </div>
              <div className="message my-message">
                Are we meeting today? Project has been already finished and I
                have results to show you.
              </div>
            </li>
          </ul>

          <div className="chat-message clearfix">
            <textarea
              name="message-to-send"
              id="message-to-send"
              placeholder="Type your message"
              rows="3"
            ></textarea>
            <i className="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
            <i className="fa fa-file-image-o"></i>
            <button>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}
*/
