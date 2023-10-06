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
import { Link, useLocation } from "react-router-dom";

export default function ChatList() {

  const [rooms, setRooms] = useState([]);
  const [user] = useAuthState(auth);
  const location = useLocation();

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
            <Chat 
              key={room.id}
              room={room}
              current={location.search.split('=')[1]===room.id}
            />
          );
        })
      }
    </div>
  );
}

function Chat(props) {

  const { room, current } = props;
  let name = room.name;

  if (name.length > 20) {
    name = name.slice(0, 20);
    name += '...';
  }

  return (
    <div 
      className={styles.chat}
      style={{
        backgroundColor: current ? '#ececec' : 'white'
      }}
    >
      <Link className={styles.link} to={"/chat?roomId=" + room.id}>
        {name}
      </Link>
    </div>
  );
}