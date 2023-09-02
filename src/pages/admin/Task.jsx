import { Box, Grid, GridItem, Text } from '@chakra-ui/react'
import React from 'react'
import Sidebar from '../../components/admin/Sidebar'
import { Navbar } from '../../components/admin/Navbar'

const Task = () => {
  return (
    <>
    <Navbar/>
    <Grid templateColumns="repeat(6,1fr)">
      <GridItem colSpan="1">
      <Box w={{ base: 'none',sm: 'none', md: 'none', lg: '230px' }}>
          <Sidebar/>
        </Box>
      </GridItem>

      <GridItem colSpan={{base: '6', sm: '6', md: '6',lg: '5' }} m="30px">
       
              
      </GridItem>
        <Text>Task</Text>
      </Grid>
    </>     
  )
}

export default Task