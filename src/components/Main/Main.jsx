import { useEffect } from 'react';
import styles from './Main.module.css';
import Chat from '../Chat/Chat.jsx';
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  useNavigate,
} from "react-router-dom";

export default function Main() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      console.log("ENTAR")
      navigate(`/welcome`);
    }
  }, [user]);

  if (loading) {
    return <h1>Loading...</h1>
  }

  return (
    <>
      <div className={styles.root}>
        <Chat />
      </div>
    </>
  );
}