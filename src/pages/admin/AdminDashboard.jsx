import React from 'react'
import {Box, Card, CardBody, CardHeader, Divider, Grid, GridItem, SimpleGrid, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr} from '@chakra-ui/react'
import { Navbar } from '../../components/admin/Navbar'
import Sidebar from '../../components/admin/Sidebar'
import '../../css/admin/adminDashboard.css'
const AdminDashboard = () => {
  
  return (
    <>
    <Navbar/>
    <Grid templateColumns="repeat(6,1fr)">
      <GridItem colSpan="1">
        <Sidebar/>
      </GridItem>

      <GridItem colSpan="5" p='10px' spacing={8}>
        <Box>
          <Text ml="10px" fontSize={{ base: '18px', md: '22px', lg: '30px' }} color="#445069">How to create Project Template?</Text>

          <SimpleGrid spacing={2} minChildWidth="200px" m="10px">
            <Card>
              <CardHeader bg="gray.50" fontWeight="500" className='step-header'>STEP 1</CardHeader>
              <Divider borderColor="gray.300"/>
              <CardBody fontSize='md' justifyContent="center" alignItems="center">Define Project Scope</CardBody>
            </Card>

            <Card>
            <CardHeader bg="gray.50" fontWeight="500">STEP 2</CardHeader>
              <Divider borderColor="gray.300"/>
              <CardBody fontSize='md'>Create Project Phases</CardBody>
            </Card>

            <Card>
            <CardHeader bg="gray.50" fontWeight="500">STEP 3</CardHeader>
              <Divider borderColor="gray.300"/>
              <CardBody fontSize='md'>Define Modules with each Project Phases</CardBody>
            </Card>

            <Card>
            <CardHeader bg="gray.50" fontWeight="500">STEP 4</CardHeader>
              <Divider borderColor="gray.300"/>
              <CardBody fontSize='md'>Create Task and Sub-Task with each Modules</CardBody>
            </Card>

            <Card>
            <CardHeader bg="gray.50" fontWeight="500">STEP 5</CardHeader>
              <Divider borderColor="gray.300"/>
              <CardBody fontSize='md' >Integrate task with respective automated solution via API connect</CardBody>
            </Card>
          </SimpleGrid>
        </Box>

        <Box>
          <Text ml="10px" fontSize={{ base: '18px', md: '22px', lg: '30px' }} color="#445069">Existing Project Template</Text>

          <TableContainer mt='10px'>
            <Table variant='simple'>
              <TableCaption>"Seamlessly utilize pre-existing templates without any inconvenience."</TableCaption>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Name</Th>
                  <Th>Type</Th> 
                  <Th>Segment</Th> 
                  <Th>Industry</Th> 
                </Tr>
              </Thead>

              <Tbody>
                <Tr>
                  <Td>Qc-34</Td>
                  <Td>Google workload</Td>
                  <Td>Migrate</Td>
                  <Td>Startup</Td>
                  <Td>FSI</Td>
                </Tr>

                <Tr>
                  <Td>Qc-34</Td>
                  <Td>Microsoft workload</Td>
                  <Td>Mordernize</Td>
                  <Td>Startup</Td>
                  <Td>FSI</Td>
                </Tr>
                <Tr>
                  <Td>Qc-34</Td>
                  <Td>Microsoft workload</Td>
                  <Td>Mordernize</Td>
                  <Td>Startup</Td>
                  <Td>FSI</Td>
                </Tr>
                
                
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </GridItem>


    </Grid>
    </>
  )
}

export default AdminDashboard