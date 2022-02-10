import React, { useState } from "react";
import { Layout } from "../components/Layout";
import { useEffect } from "react";
import {
  Badge,
  Flex,
  useMediaQuery,
  Text,
  Box,
  Image,
  Button,
  Input,
  FormControl,
  Container,
  chakra,

} from "@chakra-ui/react";

import { useAuth, upload } from "../contexts/AuthContext";
import moment from "moment";
import convertDate from "./../utils/moment";
export default function Profilepage() {
  const { currentUser,userInformation } = useAuth();
  const [photoURL, setPhotoURL] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
  );
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  const [isNotSmallerScreen] = useMediaQuery("(min-width: 600px)");
  convertDate();

  function handleChange(e) {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  }

  function handleClick() {
    upload(photo, currentUser, setLoading);
  }

  useEffect(() => {
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }

  }, [currentUser]);



  return (
    <Layout>
      <Flex
        direction={isNotSmallerScreen ? "row" : "column"}
        // w="100%"
        // maxWidth={{ base: "10vh", md: "13vh", lg: "13vh", xl: "13vh" }}
      >
        <Box alignSelf="center" px="15" mb="40">
          {/* <Badge colorScheme="green" fontSize="lg" mx={4}>
            {currentUser?.email}
          </Badge> */}
          {/* <IconButton
            icon={<FaFacebook />}
            isRound="true"
            mx="5"
            my="10"
            onClick={() => window.open("https://www.facebook.com/")}
          ></IconButton> */}
          {/* <IconButton
            icon={<FaInstagram />}
            isRound="true"
            mx="5"
            my="10"
          ></IconButton> */}

          <Badge colorScheme="blue" fontSize="lg" align="left">
            Nom et Prenom :
          </Badge>
          <Text fontSize="2xl" color="gray.400">
            {userInformation?.Fname} {userInformation?.Lname}
          </Text>
          <Badge colorScheme="blue" fontSize="lg">
            téléphone :
          </Badge>
          <Text fontSize="2xl" color="gray.400" align="left" my="3">
            {userInformation?.Phone}
          </Text>
          <Badge colorScheme="blue" fontSize="lg">
            Address :
          </Badge>
          <Text fontSize="2xl" color="gray.400" align="left" my="3">
            {userInformation?.address}
          </Text>

          <Badge colorScheme="blue" fontSize="lg">
            date de naissance :
          </Badge>
          <Text fontSize="2xl" color="gray.400" align="left" my="3">
            {/* {  userInfo?.dateNaissance}  */}
            {moment(userInformation?.dateNaissance.toDate()).format("L")}
          </Text>

          <Badge colorScheme="blue" fontSize="lg">
            Pays :
          </Badge>
          <Text fontSize="2xl" color="gray.400" align="left" my="3">
            {userInformation?.country}
          </Text>

          <Badge colorScheme="blue" fontSize="lg">
            Ville :
          </Badge>
          <Text fontSize="2xl" color="gray.400" align="left" my="3">
            {userInformation?.city}
          </Text>

          <Badge colorScheme="blue" fontSize="lg">
            Role :
          </Badge>
          <Text fontSize="2xl" color="gray.400" align="left" my="3">
            {userInformation?.role}
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
            <FormControl id="Fname">
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
              isLoading={loading}
              type="submit"
              colorScheme="primary"
              size="lg"
              fontSize="md"
              mb="3"
              onClick={handleClick}
            >
              Upload
            </Button>

            <Image
              alignSelf="center"
              mt={isNotSmallerScreen ? "0" : "120"}
              mb={isNotSmallerScreen ? "0" : "12"}
              borderRadius="50%"
              backgroundColor="transparent"
              boxShadow="lg"
              boxSize="300px"
              src={photoURL}
            />
            {/* // ===========image============            */}
          </Flex>
        </Box>
      </Flex>

      <Container maxW="container.lg" overflowX="auto" py={4}>
        <chakra.pre>{JSON.stringify(currentUser, null, 2)}</chakra.pre>
      </Container>
    </Layout>
  );
}
