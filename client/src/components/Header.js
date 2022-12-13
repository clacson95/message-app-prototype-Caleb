import React from "react";
import { Container, Image, Box } from "@chakra-ui/react";
import Headerimage from "../image/hero-mylo.png";

function Header() {
  return (
    <Container width={"100%"}>
      <Box boxSize="sm">
        <h3>Mylo</h3><Image src={Headerimage} alt="Cat Header" /><h3>Chat</h3>
      </Box>
    </Container>
  );
}

export default Header;
 