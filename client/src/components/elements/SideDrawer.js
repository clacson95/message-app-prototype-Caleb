import React, { useState } from "react";
import {
  Box,
  Tooltip,
  Button,
  Text,
  Menu,
  MenuButton,
  Stack,
  MenuList,
} from "@chakra-ui/react";
import { EmailIcon } from "@chakra-ui/icons";
import { ChatState } from "../../Context/chatProvider";
import { useHistory } from "react-router-dom";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();

  const { user } = ChatState();

  const history = useHistory();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  }

  return (
    <>
      <Box
        d="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Stack direction="row" spacing="35%">
          <Tooltip label="Search for users" hasArrow placement="bottom-end">
            <Button variant="ghost">
              <i className="fa fa-search" aria-hidden="true"></i>
              <Text d={{ base: "none", md: "flex" }} px="4">
                Search Users
              </Text>
            </Button>
          </Tooltip>

          <Text fontSize="3xl" fontFamily="Work Sans" color="gray.600">
            MyloChat
          </Text>

          <div>
            <Menu>
              <MenuButton p={1}>
                <EmailIcon fontSize="2xl" m={1} />
              </MenuButton>
              {/*<MenuList></MenuList>*/}
            </Menu>
            <Button onClick={logoutHandler}>Logout</Button>
          </div>
        </Stack>
      </Box>
    </>
  );
};

export default SideDrawer;
