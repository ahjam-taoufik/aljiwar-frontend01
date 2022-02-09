import {
  Button,
  Center,
  chakra,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  useToast,
} from "@chakra-ui/react";
import React, {useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { Card } from "../components/Card";
import DividerWithText from "../components/DividerWithText";
import { Layout } from "../components/Layout";
import {useAuth} from '../contexts/AuthContext'
import useMounted from './../hooks/useMounted';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import '../style.css'
export default function Registerpage() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Fname, setFname] = useState("");
  const [Lname, setLname] = useState("");
  const [Phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [dateNaissance, setDateNaissance] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
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
            register(email,password,Fname,Lname,Phone,address,facebook,instagram,gender,dateNaissance)
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

            <FormControl id="Fname">
              <FormLabel>First Name</FormLabel>
              <Input
                name="Fname"
                type="text"
                // autoComplete="email"
                value={Fname}
                onChange={(e) => setFname(e.target.value)}
                required
              />
            </FormControl>

            <FormControl id="Lname">
              <FormLabel>Last Name</FormLabel>
              <Input
                name="Lname"
                type="text"
                // autoComplete="email"
                value={Lname}
                onChange={(e) => setLname(e.target.value)}
                required
              />
            </FormControl>

            <FormControl id="Phone">
              <FormLabel>Phone</FormLabel>
              <Input
                name="Phone"
                type="text"
                // autoComplete="email"
                value={Phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </FormControl>

            <FormControl id="address">
              <FormLabel>Address</FormLabel>
              <Input
                name="address"
                type="text"
                // autoComplete="email"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </FormControl>
            <FormControl id="gender">
              <FormLabel>gender</FormLabel>
              <Select placeholder='Select option' 
              value={gender} 
              onChange={(e) => setGender(e.target.value)}
              >
                <option value='male'>male</option>
                <option value='female'>female</option>
            </Select>
            
            </FormControl>
            <FormControl id="dateNaissance">
              <FormLabel>date Naissance</FormLabel>
           
               <DatePicker 
                 selected={dateNaissance}
                 onChange={ date => setDateNaissance(date)}
                 dateFormat='dd/MM/yyyy'
                 isClearable
                 showYearDropdown
                 scrollableMonthYearDropdown
                 className="borderpicker"
               />
            
              {/* <Input
                name="dateNaissance"
                type="text"
                // autoComplete="email"
                value={dateNaissance}
                onChange={(e) => setDateNaissance(e.target.value)}
                required
              /> */}
            </FormControl>


            <FormControl id="facebook">
              <FormLabel>facebook</FormLabel>
              <Input
                name="facebook"
                type="text"
                // autoComplete="email"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                // required
              />
            </FormControl>

            <FormControl id="instagram">
              <FormLabel>instagram</FormLabel>
              <Input
                name="instagram"
                type="text"
                // autoComplete="email"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                // required
              />
            </FormControl>

           
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
