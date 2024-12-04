import {
  createUserWithEmailAndPassword,
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

function Movieprovider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  // console.log(`user : `, user);

  function createUser(email, password) {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function loginUser(email, password) {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logOut() {
    return signOut(auth);
  }

  function updateUserProfile(data) {
    return updateProfile(auth.currentUser, data);
  }

  function signInWithGoogle() {
    return signInWithPopup(auth, googleProvider);
  }

  function passReset(email) {
    return sendPasswordResetEmail(auth, email);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

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
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}

export default Movieprovider;
