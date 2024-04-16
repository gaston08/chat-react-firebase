import { useState, useEffect, useRef } from "react";
import styles from "./Content.module.css";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { db } from "../../../../../firebase";
import Message from "./Message/Message";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../../../firebase";
import { useLocation } from "react-router-dom";

export default function Content() {
  const [messages, setMessages] = useState([]);
  const [user] = useAuthState(auth);
  const divRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const q = query(
      collection(db, "rooms", location.search.split("=")[1], "messages"),
      orderBy("createdAt", "desc"),
      limit(11),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      let updatedData = snapshot.docs.map((doc) => {
        let data = doc.data();
        data.id = doc.id;
        return data;
      });
      setMessages(updatedData.reverse());
    });

    return () => unsubscribe;
  }, [location]);

  useEffect(() => {
    divRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-history">
      <ul>
        {messages.map((message) => {
          return (
            <Message
              key={message.id}
              message={message}
              isOwner={message.uid === user.uid}
            />
          );
        })}
      </ul>
      <div ref={divRef} />
    </div>
  );
}
