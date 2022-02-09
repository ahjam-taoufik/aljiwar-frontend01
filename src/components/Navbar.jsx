import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Box,
  HStack,
  IconButton,
  Spacer,
  useColorMode,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import Navlink from "./Navlink";
import { useAuth } from "./../contexts/AuthContext";
import { ChevronDownIcon } from "@chakra-ui/icons";

export function Navbar() {
  const { toggleColorMode } = useColorMode();
  const { logOut, currentUser } = useAuth();
 
  return (
    <Box
      borderBottom="2px"
      borderBottomColor={useColorModeValue("gray.100", "gray.700")}
      mb={4}
    >
      <HStack py={4} justifyContent="flex-end" maxW="container.lg" mx="auto">
        <Navlink to="/" name="ALJIWAR" size="lg" />
        <Spacer />

        {/* ========  Menu drop down    */}
        {currentUser && (
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              {currentUser.email}
            </MenuButton>
            <MenuList>
              <MenuItem>
                <Navlink to="/profile" name="Profile" />
              </MenuItem>

              <MenuItem>
                 <Navlink to="/protected-page" name="Protected" />
              </MenuItem>


              <MenuItem>
                <Navlink
                  to="/logout"
                  name="Logout"
                  onClick={async (e) => {
                    e.preventDefault();
                    // handle logout
                    //alert('logout user')
                    logOut();
                  }}
                />
              </MenuItem>
            </MenuList>
          </Menu>
        )}
        {/* ========end of  Menu drop down    */}

        {!currentUser && <Navlink to="/login" name="Login" />}
        {!currentUser && <Navlink to="/register" name="Register" />}
        <IconButton
          variant="outline"
          icon={useColorModeValue(<FaSun />, <FaMoon />)}
          onClick={toggleColorMode}
          aria-label="toggle-dark-mode"
        />
      </HStack>
    </Box>
  );
}
