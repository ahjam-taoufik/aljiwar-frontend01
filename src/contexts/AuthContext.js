import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../utils/init-firebase";
import {
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const AuthContext = createContext({
  currentUser: null,
  register: () => Promise,
  login: () => Promise,
  logOut: () => Promise,
  signInWithGoogle: () => Promise,
  forgotPassword: () => Promise,
  resetPassword: () => Promise,
});
export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({ children }) {
  const [currentUser, setcurrentUser] = useState(null);

  useEffect(() => {
   const unsubscribe= onAuthStateChanged(auth,user=>{
        setcurrentUser(user)
    })
  
    return () => {
      unsubscribe()
    };
  }, []);
  



  function register(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function login(email, password) {
    return signInWithEmailAndPassword(auth,email,password)
  }
  
  function signInWithGoogle(){
      const provider=new GoogleAuthProvider()
      return signInWithPopup(auth,provider)
  }

  function forgotPassword(email){
    return sendPasswordResetEmail(auth,email,{
      url:'http://localhost:3000/login',
    })
  }

 function resetPassword(oobCode,newPassword){
   return confirmPasswordReset(auth,oobCode,newPassword)
 }



  function logOut(email, password) {
    return signOut(auth)
  }
  

  const value = {
    currentUser,
    register,
    login,
    logOut,
    signInWithGoogle,
    forgotPassword,
    resetPassword
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
