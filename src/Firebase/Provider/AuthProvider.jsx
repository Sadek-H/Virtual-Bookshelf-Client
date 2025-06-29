import React, { useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { auth } from '../Authconfig';
import { createUserWithEmailAndPassword, getIdToken, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

const Provider = new GoogleAuthProvider();
const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
      const [token, setToken] = useState(null);
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const Signin = (email, password)=>{
        return signInWithEmailAndPassword(auth,email, password);
    }
    const googleSignin =()=>{
        return signInWithPopup(auth, Provider);
    }
    const signOutuser =()=>{
        return signOut(auth);
    }
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, async(currentUser)=>{
            setUser(currentUser);
            
      if (currentUser) {
        const idToken = await getIdToken(currentUser, true); // get fresh token
        setToken(idToken);
      } else {
        setToken(null);
      }
        })
      return()=>{
        unsubscribe();
      }
       
    })

    const authdata={
        user,
        createUser,
        Signin,
        googleSignin,
        signOutuser,
        token
        
    }
    return  <AuthContext value={authdata}>{children}</AuthContext>;
};

export default AuthProvider;