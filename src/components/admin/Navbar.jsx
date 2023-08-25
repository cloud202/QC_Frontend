import { Box, Button, Flex, Heading, Image, Spacer, Text } from '@chakra-ui/react'
import qcLogo from '../../img/black_qubitz.png'
import React from 'react';
import '../../css/admin/navbar.css'

export const Navbar = () => {
  return (
    <Flex  className='header' color='whiteAlpha.800' as="nav" p="10px" borderBottom="1px solid" borderColor="gray.400" alignItems="center" gap="8px" h="50px" position="sticky" top="0" zIndex={3}>
        <Box h="45px" w="120px" borderRadius="5px">
          {/* <Image objectFit='cover' src={qcLogo}/> */}
          <Heading size='md'>Qubitz</Heading>
        </Box>
        {/* <Heading size='md' as='h3' color='whiteAlpha.800'>Qubitz</Heading> */}

        <Spacer/>

        <Box  className='admin-name' >M</Box>
        <Text className='admin-email'>example@cloud202.com</Text>
        <Button>LogOut</Button>
    </Flex>
  )
}
