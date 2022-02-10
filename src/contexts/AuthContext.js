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
  updateProfile,
  sendEmailVerification 
} from "firebase/auth";
import { getFirestore, doc, setDoc,getDoc } from "firebase/firestore";
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import { db } from "../utils/init-firebase";
import { Country}  from 'country-state-city';
import { useToast } from "@chakra-ui/react";

const AuthContext = createContext({
  currentUser: null,
  userInformation:null,
  allCountry:null,
  register: () => Promise,
  login: () => Promise,
  logOut: () => Promise,
  signInWithGoogle: () => Promise,
  forgotPassword: () => Promise,
  resetPassword: () => Promise,

}); 
export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({ children }) {
  const toast = useToast();
  const firestore = getFirestore(app);
  const [currentUser, setcurrentUser] = useState(null);
  const [userInformation, setUserInfo] = useState(null);
  const [allCountry, setallCountry] = useState(null);


const getAllCountry=()=>{
    const countries= Country.getAllCountries()
    setallCountry(countries)
}


  useEffect(() => {
   const unsubscribe= onAuthStateChanged(auth,user=>{
        setcurrentUser(user)
      })
    
  let cancel=true
  if (cancel) {
    getUser()
    getAllCountry()
  }

return () => {
  unsubscribe()
  cancel=false
    };
  }, [currentUser]);




  const getUser= ()=>{
    if (currentUser ) {
      // fetching a single document
      const docRef = doc(db, "usersRoles", currentUser.uid);
           getDoc(docRef).then(function(doc){
         setUserInfo(doc.data());
        //console.log("dataa:", doc.data());
      });
    }
  }
  



  async function  register(email,password,Fname,Lname,Phone,address,facebook,instagram,gender,dateNaissance,country,city)  {
   // return createUserWithEmailAndPassword(auth, email, password);
    //==========================================
    const userInfo = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).then((user) => {
      return user;
    });
       await sendEmailVerification(auth.currentUser)
        .then(() => {
          toast({
            description: "Email verification sent!",
            status: "success",
            duration: "3000",
            position:'top-right',
            isClosable: true,
          });
        });
    //console.log(userInfo.user.uid);
    const docuRef = doc(firestore, `usersRoles/${userInfo.user.uid}`);
    setDoc(docuRef, { email:email,role:'user',Fname:Fname,Lname:Lname,Phone:Phone,address:address,facebook:facebook,instagram:instagram,gender:gender,dateNaissance:dateNaissance,country:country,city:city});
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
     // url:'http://localhost:3000/login',
      // url:'https://aljiwar-v1.netlify.app/login',
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
    userInformation,
    allCountry,
    register,
    login,
    logOut,
    signInWithGoogle,
    forgotPassword,
    resetPassword,

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


// ==============getUser async============================
// const getOneUser= async ()=> {
//     let aa=null
//    const docRef = doc(db, "usersRoles", currentUser.uid);
//    const docSnap = await getDoc(docRef);
   
//    if (docSnap.exists()) {
//       //console.log("Document data:", docSnap.data());
//       docSnap.data()
//     } else {
//       // doc.data() will be undefined in this case
//       //console.log("No such document!");
//     }
//     return aa
//   }
//=========================================




