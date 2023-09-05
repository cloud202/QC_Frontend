import { Box, Button, Flex, Heading, Image, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, Spacer, Text } from '@chakra-ui/react'
import modx from '../../img/modx.png'
import React, { useState } from 'react';
import '../../css/admin/navbar.css'
import { ChevronDownIcon, EmailIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

export const Navbar = () => {

  return (
    <Flex  className='header' color='whiteAlpha.800' as="nav" p="10px" alignItems="center" gap="8px" h="55px" position="sticky" top="0" zIndex={3}>
        <Box ml={{base: '20px',lg: '10px'}} h={{base: "35px",lg: "45px"}} w={{base: "100px",lg: '120px'}} p={0}>
        <Link to='/admin'>
          <Image m={0} objectFit='cover' src={modx}/>
          </Link>
        </Box>

        {/* <Link to='/admin'>
          <Heading ml={{base: '35px',lg: '15px'}} size='lg' as='h3' color='#f7f7f7'>Qubitz</Heading> 
        </Link> */}
        <Spacer/>

        <Menu bg='gray.400'>
            <MenuButton
              as={Button}
              colorScheme='#04373A'
              rightIcon={<ChevronDownIcon />}
            >
              John Doe
            </MenuButton>
              <MenuList>
                <MenuItem color='gray.800'>example@cloud202.com</MenuItem>
                <MenuItem color='gray.800'>My Profile</MenuItem>
                <MenuDivider />
                <MenuItem color='gray.800'>Log Out</MenuItem>
              </MenuList>
          </Menu>
    </Flex>
  )
}
