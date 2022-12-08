import React, { useEffect } from "react";
import {
  Container,
  Box,
  Text,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import Login from "../components/authentication/Login";
import Signup from "../components/authentication/Signup";
import { useHistory } from "react-router-dom";

// ==========================================================
// ==========================================================
// Homepage Setup
// ==========================================================
// ==========================================================
const Homepage = () => {
  // ==========================================================
  // Local Storage
  // ==========================================================
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    // If the user is logged in, push them to the chats page
    if (user) history.push("/chats");
  }, [history]);

  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg={"white"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text
          textAlign="center"
          fontSize="3xl"
          fontFamily="Work Sans"
          color="gray.600"
        >
          MyloChat
        </Text>
      </Box>

      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
        <Tabs variant="soft-rounded" colorScheme="green">
          <TabList mb="1em">
            <Tab width="70%">Login!</Tab>
            <Tab width="70%">Sign Up!</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {" "}
              <Login />{" "}
            </TabPanel>
            <TabPanel>
              {" "}
              <Signup />{" "}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Homepage;
