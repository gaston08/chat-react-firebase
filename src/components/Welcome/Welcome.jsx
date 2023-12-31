import { useEffect, useState } from 'react';
import styles from './Welcome.module.css';
import { signInAnonymously, signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  useNavigate,
} from "react-router-dom";

export default function Welcome() {

  const [user] = useAuthState(auth);
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/chat');
    }
  }, [user]);

  const handleChange = e => {
    setUsername(e.target.value);
  }

  const handleSubmit = async e => {
    e.preventDefault();
    if (username.trim() === "") {
      setError('Must provide a valid username');
    } else {
      setIsLoading(true);
      try {
        let result = await signInAnonymously(auth);
        localStorage.setItem('username', username);
        let us = await addDoc(collection(db, 'users'), {
          name: username,
          createdAt: serverTimestamp(),
          uid: result.user.uid,
          rooms: []
        });
        localStorage.setItem('userId', us.id);
      } catch (e) {
        signOut(auth).then(() => {
          localStorage.removeItem('username', username);
          console.log(e);
          setError('Error while loading');
          setIsLoading(false);
        });
      }
    }
  }

  return (
    <div className={styles.root}>
      <div className={styles.modal}>
        <h1>Welcome</h1>
        <p>Enter your username:</p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input 
            type="text" 
            onChange={handleChange}
            value={username}
          />
          <button 
            type="submit"
            disabled={isLoading}
          >
            Join
          </button>
          {
            error === '' ?
            (null)
            :
            (
              <p>{error}</p>
            )
          }
        </form>
      </div>
    </div>
  );
}