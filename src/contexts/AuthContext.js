import { createContext, useContext, useEffect, useState } from "react";
import { auth,app,storage } from "../utils/init-firebase";
import {
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'

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
  const firestore = getFirestore(app);
  const [currentUser, setcurrentUser] = useState(null);

  useEffect(() => {
   const unsubscribe= onAuthStateChanged(auth,user=>{
        setcurrentUser(user)
    })
  
    return () => {
      unsubscribe()
    };
  }, []);
  



  async function  register(email,password,Fname,Lname,Phone,address,facebook,instagram)  {
   // return createUserWithEmailAndPassword(auth, email, password);
    //==========================================
    const userInfo = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).then((user) => {
      return user;
    });
    console.log(userInfo.user.uid);
    const docuRef = doc(firestore, `usersRoles/${userInfo.user.uid}`);
    setDoc(docuRef, { email:email,role:'user',Fname:Fname,Lname:Lname,Phone:Phone,address:address,facebook:facebook,instagram:instagram});
    return userInfo;
   
    //================================================
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

export async function upload(file,currentUser,setLoading){
  const fileRef=ref(storage,currentUser.uid+'.png');
  setLoading(true);
  const snapshot=await uploadBytes(fileRef,file);

  const photoURL=await getDownloadURL(fileRef)

  updateProfile(currentUser,{photoURL:photoURL})
  setLoading(false)
  alert("Uploaded file !");
}


