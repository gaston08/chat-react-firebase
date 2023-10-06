import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import styles from './App.module.css';
import Main from './components/Main/Main.jsx';
import Welcome from './components/Welcome/Welcome';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/welcome",
    element: <Welcome />
  }
]);



export default function App() {
  const [user] = useAuthState(auth);
  return (
    <div className={styles.root}>
      <RouterProvider router={router} />
    </div>
  )
}