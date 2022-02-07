import {
  Button,
  chakra,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  useToast,
  Text,
  Box,
  Flex,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { Link, useHistory } from "react-router-dom";
import { Card } from "../components/Card";
import DividerWithText from "../components/DividerWithText";
import { Layout } from "../components/Layout";
import { useAuth } from "../contexts/AuthContext";
import useMounted from "../hooks/useMounted";

export default function Loginpage() {
  const history = useHistory();
  const location=useLocation()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmiting, setIsSubmiting] = useState(false);
  const toast = useToast();
  const { login, signInWithGoogle } = useAuth();

  const mounted=useMounted()

  return (
    <Layout>
      <Heading textAlign="center" my={12}>
        Login
      </Heading>
      <Card maxW="md" mx="auto" mt={4}>
        <chakra.form
          onSubmit={async (e) => {
            e.preventDefault();
            // your login logic here
            if (!email || !password) {
              toast({
                description: "credentials not valid",
                status: "error",
                duration: "4000",
                isClosable: true,
              });
            }
            setIsSubmiting(true);
            login(email, password)
              .then((res) => {
                console.log(res);
                history.push(location.state?.from ?? "/profile");
              })
              .catch((err) => {
                console.log(err.message);
                toast({
                  description: err.message,
                  status: "error",
                  duration: "4000",
                  isClosable: true,
                });
              })
              .finally(() =>mounted.current && setIsSubmiting(false));
          }}
        >
          <Stack spacing="6">
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                type="email"
                autoComplete="email"
                required
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
                required
              />
            </FormControl>
            {/* <PasswordField /> */}
            <Button
              isLoading={isSubmiting}
              type="submit"
              colorScheme="primary"
              size="lg"
              fontSize="md"
            >
              Sign in
            </Button>
          </Stack>
        </chakra.form>
        <HStack justifyContent="space-between" my={4}>
          <Button variant="link">
            <Link to="/forgot-password">Forgot password?</Link>
          </Button>
          <Button variant="link" onClick={() => history.push("/register")}>
            Register
          </Button>
        </HStack>
        <DividerWithText my={6}>OR</DividerWithText>
        <Button
          variant="outline"
          isFullWidth
          colorScheme="red"
          leftIcon={<FaGoogle />}
          onClick={
            () => signInWithGoogle()
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
