import styles from "./MessageSide.module.css";
import Content from "./Content/Content";
import InputSide from "./InputSide/InputSide";

export default function Message() {
  const rooms = JSON.parse(localStorage.getItem("rooms"));
  const roomId = window.location.search.split("=")[1];

  const room = rooms.find((a) => a.id === roomId);

  return (
    <>
      <div className="chat-header clearfix">
        <div className="chat-about">
          <div className="chat-with">{room.name}</div>
        </div>
        <i className="fa fa-star"></i>
      </div>

      <div className="chat-history">
        <Content />
        <InputSide />
      </div>
    </>
  );
}
