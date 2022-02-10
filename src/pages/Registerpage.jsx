import {
  Badge,
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
import React, {useEffect, useState } from "react";
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
import { handleError } from './../utils/handleError';
import { City }  from 'country-state-city';



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
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [countryCode, setcountryCode] = useState("");
  const [allCities, setallCities] = useState([]);

  const toast = useToast();
  const {register,signInWithGoogle,allCountry} =useAuth()
  const mounted = useMounted()

   
useEffect(() => {
  
}, []);
 
  
  const handleCities=()=>{
    let str=""
   
       str = country;
      str = str.substring(str.length - 2);          
      setcountryCode(str)
       console.log("countryCode:",countryCode);
      
      setallCities(City.getCitiesOfCountry(str))

     // console.log(City.getCitiesOfCountry(str));    
     // console.log(allCities);    
  }



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
                  description:'veuillez renseigner les champs email et mot de passe',
                  status:"error",
                  duration: '4000',
                  isClosable:true,
                  position:'top-right',
              })
            }
            setIsSubmiting(true)
            register(email,password,Fname,Lname,Phone,address,facebook,instagram,gender,dateNaissance,country,city)
            .then(res=>console.log(res))
            .catch(err=>{
             // console.log(err.message)
              const error=err.message
                let message=handleError(error)
                toast({
                  description: message || error,
                  status:"error",
                  duration: '4000',
                  position:'top-right',
                  isClosable:true
              })
            })
            .finally(()=>mounted.current && setIsSubmiting(false))
           

          }}
        >
          <Stack spacing="6">

            <FormControl id="Fname">
              <FormLabel>First Name<Badge colorScheme="red">Required</Badge></FormLabel>
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
              <FormLabel>Last Name<Badge colorScheme="red">Required</Badge></FormLabel>
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
              <FormLabel>Phone <Badge colorScheme="red">Required</Badge></FormLabel>
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
              <FormLabel>Address <Badge colorScheme="red">Required</Badge></FormLabel>
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
              <FormLabel>gender<Badge colorScheme="red">Required</Badge></FormLabel>
              <Select placeholder='Select option' 
              value={gender} 
              onChange={(e) => setGender(e.target.value)}
              required
              >
                <option value='male'>male</option>
                <option value='female'>female</option>
            </Select>
            </FormControl>
{/* ================Country===================================== */}
              <FormControl id="country">
              <FormLabel>country<Badge colorScheme="red">Required</Badge></FormLabel>
              <Select placeholder='Select option' 
               value={country} 
              onChange={(e) => {setCountry(e.target.value)}}
              onClick={()=>setallCities([])}
              required
              >
              { allCountry?.map((country)=>{
                                           
                    return <option value={`${country.name}-${country.isoCode}`}>{`${country.name}-${country.isoCode}`}</option>
               })}
            </Select>
            </FormControl>
{/* =====================Button================================ */}
              <Button
               isLoading={isSubmiting}
              // type="submit"
              colorScheme="primary"
              size="lg"
              fontSize="md"
              onClick={handleCities}
            >
              load city
            </Button>
{/* ================city===================================== */}
              <FormControl id="city">
              <FormLabel>city<Badge colorScheme="red">Required</Badge></FormLabel>
              <Select placeholder='Select option' 
               value={city} 
              onChange={(e) => setCity(e.target.value)}   
              required     
              >
              { allCities?.map((c)=>{
                                                 
                    return <option value={c.name}>{c.name}</option>
               })}
            </Select>
            </FormControl>
{/* ===================================================== */}
            <FormControl id="dateNaissance">
              <FormLabel>date Naissance <Badge colorScheme="red">Required</Badge></FormLabel>
           
               <DatePicker 
                 selected={dateNaissance}
                 onChange={ date => setDateNaissance(date)}
                 dateFormat='dd/MM/yyyy'
                 isClearable
                 showYearDropdown
                 scrollableMonthYearDropdown
                 className="borderpicker"
                 required
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
              <FormLabel>facebook <Badge colorScheme="green">optional</Badge></FormLabel>
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
              <FormLabel>instagram <Badge colorScheme="green">optional</Badge></FormLabel>
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
              <FormLabel>Email address <Badge colorScheme="red">Required</Badge></FormLabel>
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
              <FormLabel>Password <Badge colorScheme="red">Required</Badge></FormLabel>
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
