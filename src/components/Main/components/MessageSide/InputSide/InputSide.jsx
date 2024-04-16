import { useState } from "react";
import { auth, db } from "../../../../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export default function InputSide() {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let a = window.location.search.split("=")[1];

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() === "") {
      return;
    }

    setIsLoading(true);

    const { uid } = auth.currentUser;
    const name = localStorage.getItem("username");

    setMessage("");

    await addDoc(collection(db, "rooms", a, "messages"), {
      text: message,
      name,
      createdAt: serverTimestamp(),
      uid,
    });

    setIsLoading(false);
  };

  return (
    <form className="chat-message clearfix" onSubmit={sendMessage}>
      <input
        type="text"
        onChange={handleChange}
        value={message}
        id="write-message"
      />
      <button>SEND</button>
    </form>
  );
}
