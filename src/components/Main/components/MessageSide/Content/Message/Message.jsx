import {
  getInitials,
  generateColor,
  invertColor,
} from "../../../../../../utils/chat";

const styles = {};

export default function Message(props) {
  const { message, isOwner } = props;
  let initials = getInitials(message.name).toUpperCase();
  let color = generateColor(message.uid);
  let oppositeColor = invertColor(color, true);

  const message_date = new Date(message.createdAt.seconds * 1000);
  const formatted_day =
    message_date.toLocaleDateString() === new Date().toLocaleDateString()
      ? "Today"
      : message_date.toLocaleDateString();
  const formatted_time = message_date.toLocaleTimeString();

  const formatted_date = formatted_time + ", " + formatted_day;

  return (
    <>
      {isOwner ? (
        <>
          <div className="clearfix">
            <div className="message-data owner">
              <span className="message-data-name">{message.name}</span>{" "}
              <span className="message-data-time">{formatted_date}</span>
            </div>
            <div className="message other-message">
              <span>{message.text}</span>
            </div>
          </div>
        </>
      ) : (
        <div className="clearfix">
          <div className="message-data">
            <span className="message-data-name">
              <i className="fa fa-circle online"></i> {message.name}
            </span>
            <span className="message-data-time">{formatted_date}</span>
          </div>
          <div className="message my-message">{message.text}</div>
        </div>
      )}
    </>
  );
}
