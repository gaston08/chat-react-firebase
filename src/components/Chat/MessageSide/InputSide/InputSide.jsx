import { useState } from 'react';
import styles from './InputSide.module.css';
import { auth, db } from "../../../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export default function InputSide() {

  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  let a = window.location.search.split('=')[1];

  const handleChange = e => {
    setMessage(e.target.value);
  }

  const sendMessage = async e => {
    e.preventDefault();
    if (message.trim() === "") {
      return;
    }

    setIsLoading(true);

    const { uid } = auth.currentUser;
    const name = localStorage.getItem('username');

    await addDoc(collection(db, "messages", a, "content"), {
      text: message,
      name,
      createdAt: serverTimestamp(),
      uid,
    });

    setMessage('');
    setIsLoading(false);
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
            disabled={isLoading}
          />
        </div>
        <button className={styles.sendButton}>
          {">"}
        </button>
      </form>
    </div>
  );
}