"use client";
import { auth, db } from "@/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useContext, useState, useEffect } from "react";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userDataObj, setUserDataObj] = useState(null);
  const [loading, setLoading] = useState(true);

  // Auth handlers
  async function signUp(email, password) {
    if (!auth) {
      throw new Error(
        "Firebase Auth is not initialized. Please check your configuration."
      );
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Create a new user document in Firestore
      if (db) {
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          moods: {},
          createdAt: new Date().toISOString(),
        });
      }

      return userCredential;
    } catch (error) {
      throw error;
    }
  }

  function login(email, password) {
    if (!auth) {
      throw new Error(
        "Firebase Auth is not initialized. Please check your configuration."
      );
    }
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    setUserDataObj(null);
    setCurrentUser(null);
    if (!auth) {
      throw new Error(
        "Firebase Auth is not initialized. Please check your configuration."
      );
    }
    return signOut(auth);
  }

  useEffect(() => {
    // Only set up auth state listener if auth is initialized
    if (!auth) {
      console.warn(
        "Firebase Auth is not initialized. Authentication features will not work."
      );
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        setLoading(true);
        setCurrentUser(user);

        if (!user) {
          console.log("No user found!");
          return;
        }

        // Fetch user data from Firestore
        if (db) {
          console.log("Fetching user data.");
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            console.log("Found user Data!");
            setUserDataObj(docSnap.data());
          } else {
            console.log("No user document found, creating one...");
            // Create user document if it doesn't exist
            await setDoc(docRef, {
              email: user.email,
              moods: {},
              createdAt: new Date().toISOString(),
            });
            setUserDataObj({
              email: user.email,
              moods: {},
              createdAt: new Date().toISOString(),
            });
          }
        } else {
          console.warn(
            "Firestore is not initialized. User data will not be saved."
          );
        }
      } catch (err) {
        console.error("Error in auth state change:", err);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userDataObj,
    signUp,
    logout,
    login,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
