import {
  Button,
  chakra,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Card } from "../components/Card";
import { Layout } from "../components/Layout";
import { useHistory, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function useQuery() {
  const location = useLocation();
  return new URLSearchParams(location.search);
}

export default function ResetPasswordPage() {
  const history=useHistory()
  const { resetPassword } = useAuth();
  const query = useQuery();
  console.log(query.get("oobCode"));
  console.log(query.get("continueUrl"));

  const [newPassword, setnewPassword] = useState("");
  const toast=useToast()
  return (
    <Layout>
      <Heading textAlign="center" my={12}>
        Reset password
      </Heading>
      <Card maxW="md" mx="auto" mt={4}>
        <chakra.form
          onSubmit={async (e) => {
            e.preventDefault();
            // handle reset password
              resetPassword(query.get('oobCode'),newPassword)
              .then(res=>{
                console.log(res)
                toast({
                  description:'Password has been changed,you can login now',
                  status:'success',
                  duration:'5000',
                  isClosable:true,
                })
                 history.push('/login')

              })
              .catch(err=>{
                console.log(err)
                toast({
                  description:err.message,
                  status:'error',
                  duration:'5000',
                  isClosable:true,
                })

              })
 
          }}
        >
          <Stack spacing="6">
            <FormControl id="password">
              <FormLabel>New password</FormLabel>
              <Input
                value={newPassword}
                onChange={(e) => setnewPassword(e.target.value)}
                type="password"
                autoComplete="password"
                required
              />
            </FormControl>
            <Button type="submit" colorScheme="primary" size="lg" fontSize="md">
              Reset password
            </Button>
          </Stack>
        </chakra.form>
      </Card>
    </Layout>
  );
}
