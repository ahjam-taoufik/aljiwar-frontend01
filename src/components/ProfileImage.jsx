import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import  Avatar  from "@mui/material/Avatar";
import { storage } from "./../utils/init-firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import '../style.css'
const ProfileImage = () => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  //console.log(image);

  const handleSubmit = (e) => {
    e.preventDefault();
    const imageRef = ref(storage, "image");
    uploadBytes(imageRef, image)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            setUrl(url);
          })
          .catch((error) => {
            console.log(error.message, "error getting the image url");
          });
        setImage(null);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

    return (
    <div>
      <FormControl id="Image">
        <FormLabel>Image</FormLabel>
        <Input name="Image" type="file" onChange={handleImageChange} />
      </FormControl>


      <Button
        //isLoading={isSubmiting}
        type="submit"
        colorScheme="primary"
        size="lg"
        fontSize="md"
        onClick={handleSubmit}
      >
        Upload
      </Button> 
       {url && <img src={url} alt="Avatar" class="avatar" /> }  
    </div>
  );
};

export default ProfileImage;
