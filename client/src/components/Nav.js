import React from "react";
import { Container } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

function Nav() {
  return (
    <Container width={"100%"}>
      <Tabs align="end" variant="soft-rounded">
        <TabList>
          <Tab>Home</Tab>
          <Tab>About</Tab>
          <Tab>Sign up</Tab>
          <Tab>Contact</Tab>
        </TabList>
        
       
      </Tabs>
    </Container>
  );
}

export default Nav;
