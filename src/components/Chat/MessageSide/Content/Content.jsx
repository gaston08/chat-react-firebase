import { useState, useEffect } from 'react';
import styles from './Content.module.css';
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { db } from "../../../../firebase";

export default function Content() {

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("createdAt", "desc"),
      limit(11)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      let updatedData = snapshot.docs.map(doc => {
        let data = doc.data();
        data.id = doc.id;
        return data;
      });
      setMessages(updatedData.reverse())
    });
    return () => unsubscribe;
  }, []);

  return (
    <div className={styles.root}>
      {
        messages.map(message => {
          return (
            <p key={message.id}>
              {message.text}
            </p>
          )
        })
      }
    </div>
  );
}