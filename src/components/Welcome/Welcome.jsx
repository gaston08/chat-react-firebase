import { useState } from 'react';
import styles from './Welcome.module.css';
import { signInAnonymously } from "firebase/auth";
import { auth } from "../../firebase";

export default function Welcome() {

  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
        localStorage.setItem('username', username);
        await signInAnonymously(auth);
      } catch (e) {
        localStorage.removeItem('username', username);
        console.log(e);
        setError('Error while loading');
        setIsLoading(false);
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