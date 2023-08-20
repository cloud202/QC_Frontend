import { Box, Button, Flex, Heading, Image, Spacer, Text } from '@chakra-ui/react'
import qcLogo from '../../img/purple_qubitz.png'
import React from 'react';
import '../../css/admin/navbar.css'

export const Navbar = () => {
  return (
    <Flex  className='header' color='whiteAlpha.800' as="nav" p="10px" borderBottom="1px solid" borderColor="gray.400" alignItems="center" gap="8px" h="50px" position="sticky" top="0" zIndex={3}>
        <Box bg="#9FA3FF" h="45px" w="120px" borderRadius="5px">
          <Image objectFit='cover' src={qcLogo}/>
        </Box>
        {/* <Heading size='md' as='h3' color='whiteAlpha.800'>Qubitz</Heading> */}

        <Spacer/>

        <Box  className='admin-name' px='10px'>M</Box>
        <Text color="#0F0E0C" >example@cloud202.com</Text>
        <Button>LogOut</Button>
    </Flex>
  )
}
