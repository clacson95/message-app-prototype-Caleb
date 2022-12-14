import { 
    ButtonGroup,
    Container,
    HStack,
    IconButton,
    Image,
    Stack,
    Text,
} from "@chakra-ui/react";
import * as React from 'react'
import { FaGithub } from 'react-icons/fa'

const Footer = () => (
  <Container as="footer" role="contentinfo" py={{ base: '12', md: '16' }}>

    <HStack spacing={{ base: '4', md: '5' }}>

        <Image           
            align='50% 50%'
            src={require('../image/logo.png')}
            alt='Mylo logo image'/>

        <Text 
        fontSize="sm" 
        color="subtle">
        &copy; {new Date().getFullYear()} Chakra UI, Inc. All rights reserved.
        </Text>

        <Stack justify="space-between" direction="row" align="center">
          <ButtonGroup variant="ghost">
              <IconButton as="a" href="https://github.com/StephCambria/message-app-prototype" aria-label="GitHub" icon={<FaGithub fontSize="1.25rem" />} />
          </ButtonGroup>
        </Stack>

    </HStack>  

  </Container>
)

export default Footer;