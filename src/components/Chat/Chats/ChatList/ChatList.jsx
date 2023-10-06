import { useState, useEffect } from 'react';
import styles from './ChatList.module.css';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../../firebase";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
  where,
} from "firebase/firestore";
import { db } from "../../../../firebase";

export default function ChatList() {

  const [rooms, setRooms] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const q = query(
      collection(db, "users"),
      where('uid', '==', user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      let updatedData = snapshot.docs.map(doc => {
        let data = doc.data();
        data.id = doc.id;
        return data;
      });
      setRooms(updatedData[0].rooms);
    });
    
    return () => unsubscribe;
  }, []);

  return (
    <div className={styles.root}>
      {
        rooms.map(room => {
          return (
            <div key={room.id}>{room.name}</div>
          );
        })
      }
    </div>
  );
}