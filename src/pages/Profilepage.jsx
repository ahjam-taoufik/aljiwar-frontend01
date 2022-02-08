import React, { useState } from "react";
import { Layout } from "../components/Layout";
import {useEffect} from 'react'
import {
  Badge,
  chakra,
  Container,
  Heading,
  IconButton,
  Stack,
  Circle,
  Flex,
  useMediaQuery,
  Text,
  Box,
  Icon,
  Image,
  Button,
  Input,
  FormControl,
  FormLabel,
  Spacer
} from "@chakra-ui/react";
//import { Card } from '../components/Card'
import { useAuth,upload } from "../contexts/AuthContext";
import { FaFacebook, FaGithub, FaInstagram } from "react-icons/fa";
import { DiCodeigniter, DiAndroid, DiWebplatform } from "react-icons/di";
import { Link } from "react-router-dom";
import ProfileImage from './../components/ProfileImage';



export default function Profilepage() {
  const { currentUser } = useAuth();
  const [photoURL, setPhotoURL] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const [isNotSmallerScreen] = useMediaQuery("(min-width: 600px)");
  //console.log(isSmaller);
  
  function handleChange(e){
    if (e.target.files[0]) {
      setPhoto(e.target.files[0])
    }

  }

  function handleClick(){
       upload(photo,currentUser,setLoading)
  }

  
  useEffect(() => {
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }
  }, [currentUser])



  return (
    <Layout>
      <Flex
        direction={isNotSmallerScreen ? "row" : "column"}
        // w="100%"
        // maxWidth={{ base: "10vh", md: "13vh", lg: "13vh", xl: "13vh" }}
      >
        <Box
         alignSelf="center" px="32" mb="40"
         >
          <Badge colorScheme="green" fontSize="lg"  mx={4}>
            {currentUser.email}
          </Badge>
          <IconButton icon={<FaFacebook />} isRound="true" mx="5" my="10" onClick={
            ()=>window.open("https://www.facebook.com/")
          } ></IconButton>
          <IconButton icon={<FaInstagram />} isRound="true" mx="5" my="10"></IconButton>
          <Text fontSize="2xl" color="gray.400"  align="center">
            Ahjam Taoufik 
          </Text>
          <Text fontSize="2xl" color="gray.400" align="center"   my="3">
            your Phone
          </Text>
          <Text fontSize="2xl" color="gray.400" align="center"  my="3">
              your address
          </Text>

          <Text fontSize="2xl" color="gray.400" align="center"  my="3">
              your Role
          </Text>

          <Text fontSize="2xl" color="gray.400" align="center"  my="3">
              your Professional
          </Text>

        </Box>
      
        <Box alignSelf="center" px="32" py="16">
        
            <Flex
              rounded="xl"
              direction="column"
              mt={40}
             
              ml={isNotSmallerScreen ? 4 : 0}
              h="30vh"
              w="30vh"
              justify="flex-end"
            >
  {/* // ========image===============            */}  
             <FormControl id="Fname"  >
              <Input
                name="imageUpload"
                type="file"
               // value={Fname}
                onChange={handleChange}
               // required
              />
            </FormControl>
            <Button
              disabled={!photo}
              isLoading={loading }
              type="submit"
              colorScheme="primary"
              size="lg"
              fontSize="md"
              mb='3'
              onClick={handleClick}
            >
              Upload
            </Button>

            <Image  alignSelf="center" mt={isNotSmallerScreen ? "0" : "120"}
                    mb={isNotSmallerScreen ? "0" : "12"} borderRadius='50%'
                    backgroundColor="transparent" boxShadow="lg"
                    boxSize="300px" src={photoURL} />
  {/* // ===========image============            */}
            </Flex>
        </Box>
      </Flex>
    </Layout>
  );

  {
    /* <Heading>
        Profile User :
        <Badge colorScheme="green" fontSize="lg" mx={4}>
          {currentUser.email}
        </Badge>
      </Heading>
      <Flex w="100%">
        <IconButton icon={<FaFacebook />} isRound="true" mr="5"></IconButton>
        <IconButton icon={<FaInstagram />} isRound="true" mr="5"></IconButton>
        <IconButton icon={<FaGithub />} isRound="true" mr="5"></IconButton>
      </Flex>
      <Stack>
          <Circle
            position="absolute"
            bg="blue.500"
            opacity="0.1"
            w="300px"
            h="300px"
            alignSelf={isSmaller ? "flex-end" : "center"}
            mt="5"
          />
      </Stack> */
  }
}

{
  /* <Container maxW='container.lg' overflowX='auto' py={4}>
   <chakra.pre>
     {JSON.stringify(currentUser,null,2)}
   </chakra.pre>
</Container> */
}
