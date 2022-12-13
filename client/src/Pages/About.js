import React from "react";
import {
  Center,
  Container,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react";

// ==========================================================
// ==========================================================
// About Page
// ==========================================================
// ==========================================================
const About = () => {

  return (
    <Container maxW="xl" centerContent>
      <Center
        d="flex"
        justifyContent="center"
        p={3}
        bg={"#8BAD94"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <HStack
          spacing='-20px'
        >
          <Text
            as="b"
            fontSize="4xl"
            fontFamily="Work Sans"
            color="gray.200"
          >
            Mylo
          </Text>
          <Image 
            align='50% 50%'
            src={require('../image/hero-mylo.png')}
            alt='Mylo mascot image'
          />
          <Text
            as="b"
            fontSize="4xl"
            fontFamily="Work Sans"
            color="gray.200"
          >
            Chat
          </Text>
        </HStack>
      </Center>
    </Container>
  );
};

export default About;
