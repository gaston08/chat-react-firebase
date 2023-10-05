import { useState } from 'react';
import styles from './App.module.css';
import Main from './components/Main/Main.jsx';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div className={styles.root}>
      <Main />
    </div>
  )
}