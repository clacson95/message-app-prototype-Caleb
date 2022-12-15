import React from "react";
import {
  Box,
  ButtonGroup,
  Container,
  IconButton,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';

const Logo = () => {
  return (
    <Image  
      
      viewBox="0 0 120 28"      
      align='50% 50%'
      src={require('../image/logo.png')}
      alt='Mylo logo image'
      />
  );
};

const Footer = () => (
    <Box
      bg="#6b9e7c"
      color={useColorModeValue('gray.700', 'gray.200')}>
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
        <Stack>
          <ButtonGroup variant="ghost">
            <IconButton as="a" href="https://github.com/StephCambria/message-app-prototype" aria-label="GitHub" icon={<FaGithub fontSize="2.5rem"   />} />
          </ButtonGroup>
        </Stack>
      </Container>
    </Box>
);

export default Footer;