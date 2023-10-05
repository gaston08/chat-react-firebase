import styles from './App.module.css';
import Main from './components/Main/Main.jsx';
import Welcome from './components/Welcome/Welcome';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

export default function App() {
  const [user] = useAuthState(auth);

  return (
    <div className={styles.root}>
      {
        user ?
        (
          <Main />
        )
        :
        (
          <Welcome />
        )
      }
    </div>
  )
}