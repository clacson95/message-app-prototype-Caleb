import React, { useEffect } from "react";
import {
  Box,
  Center,
  Container,
  Image,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import Login from "../components/authentication/Login";
import Signup from "../components/authentication/Signup";
import { useHistory } from "react-router-dom";
import Footer from '../components/Footer';

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
      
      {/* header */}
      <Center
        p={3}
        bg={"#8BAD94"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Image 
          align='50% 50%'
          src={require('../image/hero.png')}
          alt='Mylo mascot image'
        />
      </Center>

      {/* login/signup */}
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

      <Footer />

    </Container>
  );
};

export default Homepage;
