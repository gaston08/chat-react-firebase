import { useState, useEffect, useRef } from 'react';
import styles from './Content.module.css';
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { db } from "../../../../firebase";
import Message from './Message/Message';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../../firebase";

export default function Content() {

  const [messages, setMessages] = useState([]);
  const [user] = useAuthState(auth);
  const divRef = useRef(null);

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

  useEffect(() => {
    divRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={styles.root}>
      {
        messages.map(message => {
          return (
            <Message 
              key={message.id}
              message={message}
              isOwner={message.uid === user.uid}
            />
          )
        })
      }
      <div ref={divRef} />
    </div>
  );
}