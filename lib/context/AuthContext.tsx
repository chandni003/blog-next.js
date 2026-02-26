"use client";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";



const AuthContext= createContext<any>(null);

export default function AuthContextProvider({ children }: { children: any }) {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(()=>{
    setIsLoading(true);
    const unsub = onAuthStateChanged(auth ,(user)=>{
        if (user){
            setUser(user);
        }
        else{
            setUser(null);
        }
        setIsLoading(false);
    });
    return ()=>unsub();
  },[])

  const handleSignInwithGoogle = async ()=>{
    setIsLoading(true)
    try{
        await signInWithPopup(auth,new GoogleAuthProvider());

    }
    catch(error:any){
        setError(error?.message)
    }
  }

  const handleLogout = async () =>{
     setIsLoading(true)
    try{
        await signOut(auth);

    }
    catch(error:any){
        setError(error?.message)
    }
  }

  return (
    <AuthContext.Provider value={{handleSignInwithGoogle,handleLogout, user, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);
