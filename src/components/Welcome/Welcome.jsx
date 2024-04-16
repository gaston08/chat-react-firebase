import { useEffect, useState } from "react";
import styles from "./Welcome.module.css";
import { signInAnonymously, signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/chat");
    }
  }, [user]);

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.trim() === "") {
      setError("Must provide a valid username");
    } else {
      setIsLoading(true);
      try {
        let result = await signInAnonymously(auth);
        localStorage.setItem("username", username);
        let us = await addDoc(collection(db, "users"), {
          name: username,
          createdAt: serverTimestamp(),
          uid: result.user.uid,
          rooms: [],
        });
        localStorage.setItem("userId", us.id);
      } catch (e) {
        signOut(auth).then(() => {
          localStorage.removeItem("username", username);
          console.log(e);
          setError("Error while loading");
          setIsLoading(false);
        });
      }
    }
  };

  return (
    <div>
      <form class="login" onSubmit={handleSubmit}>
        <h2>Bienvenido</h2>
        <p>Elige un nombre de usuario para ingresar.</p>
        <input
          type="text"
          placeholder="usuario"
          onChange={handleChange}
          value={username}
        />
        <input type="submit" value="Ingresar" disabled={isLoading} />
        {error === "" ? null : <p>{error}</p>}
      </form>
    </div>
  );
}
