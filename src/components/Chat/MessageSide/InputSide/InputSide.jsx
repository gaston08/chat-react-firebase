import { useState } from 'react';
import styles from './InputSide.module.css';
import { auth, db } from "../../../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export default function InputSide() {

  const [message, setMessage] = useState('');

  const handleChange = e => {
    setMessage(e.target.value);
  }

  const sendMessage = async e => {
    e.preventDefault();
    if (message.trim() === "") {
      return;
    }

    const { uid } = auth.currentUser;
    const name = localStorage.getItem('username');

    await addDoc(collection(db, "messages"), {
      text: message,
      name,
      createdAt: serverTimestamp(),
      uid,
    });

    setMessage('');
    // e.scroll.current.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className={styles.root}>
      <form 
        className={styles.container}
        onSubmit={sendMessage}
      >
        <div 
          className={styles.inputBox}
        >
          <input 
            type="text"
            className={styles.input}
            onChange={handleChange}
            value={message}
          />
        </div>
        <button className={styles.sendButton}>
          Send
        </button>
      </form>
    </div>
  );
}