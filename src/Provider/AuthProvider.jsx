import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import auth from "../firebase.js";
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //   googleSignin
  const googleProvider = new GoogleAuthProvider();
  function signInGoogle() {
    return signInWithPopup(auth, googleProvider);
  }

  // register user
  function registerUser(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  // signin user
  function signInUser(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  //logout user
  function logOutuser() {
    return signOut(auth);
  }
  // updateUser
  function updateUser(profileData) {
    return updateProfile(auth.currentUser, profileData);
  }

  // observer
  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubcribe();
  }, []);

  console.log(user);
  const sharedData = {
    user,
    setUser,
    signInGoogle,
    registerUser,
    signInUser,
    logOutuser,
    updateUser,
    loading,
    setLoading,
  };
  return <AuthContext value={sharedData}>{children}</AuthContext>;
}
