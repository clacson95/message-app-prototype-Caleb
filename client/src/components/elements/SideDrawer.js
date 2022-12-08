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
  Drawer,
  useDisclosure,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Input,
  useToast,
} from "@chakra-ui/react";
import { EmailIcon, Search2Icon } from "@chakra-ui/icons";
import { ChatState } from "../../Context/chatProvider";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading";
import UserListItem from "../Users/UserListItem";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();

  const { user } = ChatState();

  const history = useHistory();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };

  const toast = useToast();

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please enter a name or email",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        Headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error occured",
        description: "Failed to load the search results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const accessChat = (userId) => {

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
            <Button variant="ghost" onClick={onOpen}>
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

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay></DrawerOverlay>
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box d="flex" pb={2}>
              <Input
                width="80%"
                marginRight="5%"
                placeholder="Search for name or email"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              ></Input>
              <Button size="sm" p={0} m={0} onClick={handleSearch}>
                <Search2Icon fontSize="md" />
              </Button>
            </Box>
            {loading ? (
                <Loading />
            ) : (
                searchResult?.map(user => (
                    <UserListItem 
                    key={user._id}
                    user={user}
                    handleFunction={() => accessChat(user._id)}
                    />
                ))
            )
            }
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
