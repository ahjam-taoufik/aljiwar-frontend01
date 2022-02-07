import {
  Button,
  Center,
  chakra,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { Card } from "../components/Card";
import DividerWithText from "../components/DividerWithText";
import { Layout } from "../components/Layout";
import {useAuth} from '../contexts/AuthContext'
import useMounted from './../hooks/useMounted';

export default function Registerpage() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmiting, setIsSubmiting] = useState(false);
  const toast = useToast();
  const {register,signInWithGoogle} =useAuth()
  const mounted = useMounted()

  return (
    <Layout>
      <Heading textAlign="center" my={12}>
        Register
      </Heading>
      <Card maxW="md" mx="auto" mt={4}>
        <chakra.form
          onSubmit={async (e) => {
            e.preventDefault();
            // your register logic here
            // console.log(email,password)
            if(!email || !password){
              toast({
                  description:'credentials not valid',
                  status:"error",
                  duration: '4000',
                  isClosable:true
              })
            }
            setIsSubmiting(true)
            register(email,password)
            .then(res=>console.log(res))
            .catch(err=>{
              console.log(err.message)
              toast({
                  description:err.message,
                  status:"error",
                  duration: '4000',
                  isClosable:true
              })
            })
            .finally(()=>mounted.current && setIsSubmiting(false))
           

          }}
        >
          <Stack spacing="6">
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
               // required
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                name="password"
                type="password"
                autoComplete="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
               // required
              />
            </FormControl>
            <Button
              isLoading={isSubmiting}
              type="submit"
              colorScheme="primary"
              size="lg"
              fontSize="md"
            >
              Sign up
            </Button>
          </Stack>
        </chakra.form>
        <Center my={4}>
          <Button variant="link" onClick={() => history.push("/login")}>
            Login
          </Button>
        </Center>
        <DividerWithText my={6}>OR</DividerWithText>
        <Button
          variant="outline"
          isFullWidth
          colorScheme="red"
          leftIcon={<FaGoogle />}
          onClick={() =>signInWithGoogle()
                  .then(user=>console.log(user))
                  .catch(err=>console.log(err))
          }
        >
          Sign in with Google
        </Button>
      </Card>
    </Layout>
  );
}
