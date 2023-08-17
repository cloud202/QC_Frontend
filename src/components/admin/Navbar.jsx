import { Box, Button, Flex, Heading, Image, Spacer, Text } from '@chakra-ui/react'
import qcLogo from '../../img/qubitz.png'
import React from 'react'

export const Navbar = () => {
  return (
    <Flex bg = "#6527BE" color='whiteAlpha.800' as="nav" p="10px" borderBottom="1px solid" borderColor="gray.400" alignItems="center" gap="8px" h="50px" position="sticky" top="0" zIndex={3}>
        <Box bg="whiteAlpha.900" h="45px" w="120px" borderRadius="5px">
          <Image objectFit='cover' src={qcLogo}/>
        </Box>
        <Heading size='md' as='h3' color='whiteAlpha.800'>QubitzCloud</Heading>

        <Spacer/>

        <Box bg="gray.200" px='10px'>M</Box>2
        <Text>example@cloud202.com</Text>
        <Button>LogOut</Button>
    </Flex>
  )
}
