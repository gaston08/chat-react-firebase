import styles from "./Profile.module.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../../../firebase";
import {
  generateColor,
  invertColor,
  getInitials,
} from "../../../../../utils/chat";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Profile(props) {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const color = generateColor(user.uid);
  const oppositeColor = invertColor(color, true);
  const initials = getInitials(username).toUpperCase();

  const logout = () => {
    signOut(auth).then((result) => {
      localStorage.removeItem("username");
      localStorage.removeItem("userId");
      navigate("/welcome");
    });
  };

  return (
    <div className={styles.root}>
      <div
        className={styles.avatarPicture}
        style={{
          backgroundColor: color,
          color: oppositeColor,
        }}
        onClick={() => logout()}
      >
        {initials}
      </div>
      <div className={styles.username}>{username.toUpperCase()}</div>
    </div>
  );
}
