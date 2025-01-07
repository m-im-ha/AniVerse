import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.init";

export const MovieContext = createContext();
const googleProvider = new GoogleAuthProvider();

function Movieprovider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialAuthCheck, setInitialAuthCheck] = useState(true);
  const [allmovies, setAllmovies] = useState([]);
  // console.log(`user from provider: `, user);

  function createUser(email, password) {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function loginUser(email, password) {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  }

  function signInWithGoogle() {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  }
  
  function logOut() {
    return signOut(auth);
  }

  function updateUserProfile(data) {
    return updateProfile(auth.currentUser, data);
  }


  function passReset(email) {
    return sendPasswordResetEmail(auth, email);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        if (currentUser) {
          // User is logged in
          const email = currentUser.email;
          // Fetch user data from the backend
          const response = await fetch(
            `https://animated-movieportal-server.vercel.app/users?email=${email}`
          );
          const backendUser = await response.json();
          // Update the context with both Firebase user data and userID from backend
          setUser({
            ...currentUser,
            userID: backendUser._id,
          });
        } else {
          // User is not logged in
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUser(null);
      } finally {
        setLoading(false);
        setInitialAuthCheck(false);
      }
    });
    return () => unsubscribe();
  }, []);

  if (initialAuthCheck) {
    // console.log("Waiting for Firebase auth check...");
    return null;
  }

  return (
    <MovieContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        createUser,
        loginUser,
        logOut,
        updateUserProfile,
        signInWithGoogle,
        passReset,
        allmovies,
        setAllmovies,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}

export default Movieprovider;
