import { useState } from "react";
import styles from "./CreateChat.module.css";
import {
  query,
  collection,
  where,
  getDocs,
  limit,
  addDoc,
  doc,
  serverTimestamp,
  arrayUnion,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../../../firebase";

export default function CreateChat() {
  const [groupName, setGroupName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user] = useAuthState(auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (groupName.trim() === "" || groupName.length < 2) {
      setError("name must be at least 3 characters");
      setLoading(false);
      return;
    } else {
      setError("");
    }

    const q = query(
      collection(db, "rooms"),
      where("name", "==", groupName),
      limit(1),
    );

    const a = query(collection(db, "rooms"), limit(10));
    const res = await getDocs(a);
    res.docs.forEach((doc) => {
      console.log(doc.data());
    });

    try {
      const querySnapshot = await getDocs(q);
      let isRoomCreated = false;
      querySnapshot.forEach((doc) => {
        isRoomCreated = true;
      });

      if (!isRoomCreated) {
        try {
          let result = await addDoc(collection(db, "rooms"), {
            name: groupName,
            createdAt: serverTimestamp(),
            members: [localStorage.getItem("userId")],
          });
          await updateDoc(doc(db, "users", localStorage.getItem("userId")), {
            rooms: arrayUnion({
              id: result.id,
              name: groupName,
            }),
          });
          setGroupName("");
          setError("");
          setLoading(false);
        } catch (e) {
          console.log(e);
          setError("could not create room");
          setLoading(false);
        }
      } else {
        let roomId;
        querySnapshot.forEach((doc) => {
          roomId = doc.id;
        });
        await updateDoc(doc(db, "users", localStorage.getItem("userId")), {
          rooms: arrayUnion({
            id: roomId,
            name: groupName,
          }),
        });
        setGroupName("");
        setError("");
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  const handleChange = (e) => {
    setGroupName(e.target.value);
  };

  return (
    <div className="search">
      <div style={{ marginBottom: 10 }}>Create or find a chat</div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleChange}
          value={groupName}
          disabled={loading}
          placeHolder="room name"
        />
      </form>
      <p>{error}</p>
    </div>
  );
}
