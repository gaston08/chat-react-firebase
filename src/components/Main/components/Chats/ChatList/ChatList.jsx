import { useState, useEffect } from "react";
import styles from "./ChatList.module.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../../../firebase";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
  where,
} from "firebase/firestore";
import { db } from "../../../../../firebase";
import { Link, useLocation } from "react-router-dom";

export default function ChatList() {
  const [rooms, setRooms] = useState([]);
  const [user] = useAuthState(auth);
  const location = useLocation();

  useEffect(() => {
    const q = query(collection(db, "rooms"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      let updatedData = snapshot.docs.map((doc) => {
        let data = doc.data();
        data.id = doc.id;
        return data;
      });
      const savedData = updatedData.map((a) => {
        return {
          name: a.name,
          id: a.id,
        };
      });
      localStorage.setItem("rooms", JSON.stringify(savedData));
      setRooms(updatedData);
    });

    return () => unsubscribe;
  }, []);

  return (
    <ul className="list">
      {rooms.map((room) => {
        return (
          <Chat
            key={room.id}
            room={room}
            current={location.search.split("=")[1] === room.id}
          />
        );
      })}
    </ul>
  );
}

function Chat(props) {
  const { room, current } = props;
  let name = room.name;

  if (name.length > 20) {
    name = name.slice(0, 20);
    name += "...";
  }

  return (
    <li className="clearfix">
      <Link
        className="name"
        style={{ textDecoration: "none" }}
        to={"/chat?roomId=" + room.id}
      >
        {name}
      </Link>
    </li>
  );
}
