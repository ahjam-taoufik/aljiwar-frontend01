import { Heading, Container, Badge } from '@chakra-ui/react'
import React from 'react'
import { Layout } from '../components/Layout'
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app} from "../utils/init-firebase";
import { useState } from 'react';
import { useEffect } from 'react';


export default function ProtectedPage() {
  const firestore = getFirestore(app);
  const colRef=collection(firestore,'usersRoles')
  const [loading,setLoading]=useState(true)
  const [users,setusers]=useState([])


  useEffect(() => {
    
    let subscriber = () => {
     getDocs(colRef)
      .then((snapshot)=>{
        // console.log(snapshot.docs)
        let users=[]
        snapshot.docs.forEach((doc)=>{
        users.push({...doc.data(), id:doc.id})
        })
        console.log(users);
        setusers(users);
        setLoading(false);
      })
    }
    subscriber();
    return () => {
      subscriber();
 };

  }, [loading]);

  
  
  if (loading) {
    return <h1>loading  data...</h1>;
  }


  return (
    <Layout>
      <Heading>
        Protected page
        <Badge colorScheme='green' fontSize='lg' mx={4}>
          Protected Page
        </Badge>
      </Heading>
      <Container maxW='container.lg' overflowX='auto' py={4}>
      <h1>Users:</h1>
      {users.length > 0 ? (
        users.map((user) => 
        <div key={user.id}>{user.email}</div>
        
        )
      ) : (
        <h1>no users yet :(</h1>
      )}
      </Container>
    </Layout>
  )
}

