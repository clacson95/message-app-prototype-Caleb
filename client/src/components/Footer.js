import React from "react";
import {
  Box,
  Container,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';

const Logo = () => {
  return (
    <Image  
      viewBox="0 0 120 28"      
      align='50% 50%'
      src={require('../image/footer.png')}
      alt='Mylo logo image'
      />
  );
};

const Footer = () => (
    <Box
      bg="#6b9e7c"
    >
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}>
        <Logo />
        <Text fontSize="lg" color="black">© 2022 Chakra Templates. All rights reserved</Text>
      </Container>
    </Box>
);

export default Footer;