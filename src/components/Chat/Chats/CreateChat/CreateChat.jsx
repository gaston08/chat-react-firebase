import { useState } from 'react';
import styles from './CreateChat.module.css';
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  where,
  getDocs,
  limit,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../../../firebase";

export default function CreateChat() {

  const [groupName, setGroupName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    if (groupName.trim() === '' || groupName.length < 2) {
      setError('name must be at least 3 characters');
    } else {
      setError('');
    }

    const q = query(
      collection(db, 'rooms'),
      where('name', '==', groupName),
      limit(1),
    );

    try {
      const querySnapshot = await getDocs(q);
      let isRoomCreated = false;
      querySnapshot.forEach((doc) => {
        isRoomCreated = true;
      });

      if (!isRoomCreated) {
        try {
          await addDoc(collection(db, 'rooms'), {
            name: groupName,
            createdAt: serverTimestamp(),
          });
          setError('');
        } catch (e) {
          setError('could not create room');
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  const handleChange = e => {
    setGroupName(e.target.value);
  }

  return (
    <div className={styles.root}>
      <div>Create or find a chat</div>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          onChange={handleChange}
        />
      </form>
    </div>
  );
}