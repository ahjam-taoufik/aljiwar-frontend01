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
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Card } from "../components/Card";
import DividerWithText from "../components/DividerWithText";
import { Layout } from "../components/Layout";
import { useAuth } from "../contexts/AuthContext";
import { handleError } from "./../utils/handleError";

export default function ForgotPasswordPage() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const { forgotPassword } = useAuth();
  const toast = useToast();

  return (
    <Layout>
      <Heading textAlign="center" my={12}>
        Forgot password
      </Heading>
      <Card maxW="md" mx="auto" mt={4}>
        <chakra.form
          onSubmit={async (e) => {
            e.preventDefault();
            // your forgot password logic here
            if (!email) {
              toast({
                description: "email not valid",
                status: "error",
                duration: "4000",
                isClosable: true,
              });
            }
            forgotPassword(email)
              .then((res) => {
                console.log(res);
                toast({
                  description: "Email sent , check your email",
                  status: "success",
                  duration: "4000",
                  isClosable: true,
                });
              })
              .catch((err) => {
                //console.log(err.message);
                const error = err.message;
                let message = handleError(error);
                toast({
                  description: message || error,
                  status: "error",
                  duration: "4000",
                  position: "top-right",
                  isClosable: true,
                });
              });

            //=========================
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
            <Button type="submit" colorScheme="primary" size="lg" fontSize="md">
              Submit
            </Button>
          </Stack>
        </chakra.form>
        <DividerWithText my={6}>OR</DividerWithText>
        <Center>
          <Button variant="link" onClick={() => history.push("/login")}>
            Login
          </Button>
        </Center>
      </Card>
    </Layout>
  );
}
