import React from "react";
// import { Container, Image, Box } from "@chakra-ui/react";
import { Center, Image } from "@chakra-ui/react";
import "../components/style.css";

function Header() {
  return (
    <div>
      <Center
        p={3}
        bg={"#6b9e7c"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Image
          align="50% 50%"
          src={require("../image/hero.png")}
          alt="Mylo mascot image"
        />
      </Center>
    </div>
  );
}

export default Header;
