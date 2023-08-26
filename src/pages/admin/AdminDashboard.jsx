import React from 'react'
import {Box, Card, CardBody, CardHeader, Divider, Grid, GridItem, Heading, Image, SimpleGrid, Stack, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr} from '@chakra-ui/react'
import { Navbar } from '../../components/admin/Navbar'
import Sidebar from '../../components/admin/Sidebar'
import '../../css/admin/adminDashboard.css'
import step_one from '../../img/admin_steps/1.png'

const AdminDashboard = () => {
  
  return (
    <>
    <Navbar/>
    <Grid templateColumns="repeat(6,1fr)">
      <GridItem colSpan="1">
        <Sidebar/>
      </GridItem>

      <GridItem colSpan="5" p='10px' spacing={8} className= "project-background">
        <Box>
        <Text className='sub-title' fontSize={{ base: '15px', md: '18px', lg: '22px' }} >Welcome to Qubitz! Define migration and modernization journey for customer</Text>

          <Image 
                src={step_one}
                borderRadius='lg'
                border='1px solid'
                borderColor='grey'
                marginLeft='12px'
              />

          {/* <SimpleGrid  >
          <Card maxW='sm'>
            <CardBody> */}
            
             {/*  <Stack mt='6' spacing='3'>
                <Heading size='md'>Step 1</Heading>
                <Text>
                  Define Project Scope
                </Text>
              </Stack> */}
          {/*   </CardBody>
          </Card> */}
{/* 
          <Card maxW='sm'>
            <CardBody>
              <Image
                src={step_one}
                borderRadius='lg'
                border='1px solid'
                borderColor='gray.400'
              />
              <Stack mt='6' spacing='3'>
                <Heading size='md'>Step 2</Heading>
                <Text>
                  Create Project Phase
                </Text>
              </Stack>
            </CardBody>
          </Card>

          <Card maxW='sm'>
            <CardBody>
              <Image
                src='https://assets.materialup.com/uploads/4554dde7-42b0-46e8-a8f6-0f112ff4ce34/preview.jpg'
                borderRadius='lg'
                border='1px solid'
                borderColor='gray.400'
              />
              <Stack mt='6' spacing='3'>
                <Heading size='md'>Step 3</Heading>
                <Text>
                 Define Modules with each Project Phases
                </Text>
              </Stack>
            </CardBody>
          </Card>

          <Card maxW='sm'>
            <CardBody>
              <Image
                src='https://assets.materialup.com/uploads/4554dde7-42b0-46e8-a8f6-0f112ff4ce34/preview.jpg'
                borderRadius='lg'
                border='1px solid'
                borderColor='gray.400'
              />
              <Stack mt='6' spacing='3'>
                <Heading size='md'>Step 4</Heading>
                <Text>
                Create Task and Sub-Task with each Modules
                </Text>
              </Stack>
            </CardBody>
          </Card>

          <Card maxW='sm'>
            <CardBody>
            <Image
                src='https://assets.materialup.com/uploads/4554dde7-42b0-46e8-a8f6-0f112ff4ce34/preview.jpg'
                borderRadius='lg'
                border='1px solid'
                borderColor='gray.400'
              />
              <Stack mt='6' spacing='3'>
                <Heading size='md'>Step 5</Heading>
                <Text>
                Integrate task with respective automated solution via API connect
                </Text>
              </Stack>
            </CardBody>
          </Card> */}
        {/*   </SimpleGrid> */}
        </Box>

        <Box>
          <Text className='sub-title' fontSize={{ base: '15px', md: '18px', lg: '22px' }} >Available Project Templates</Text>

          <TableContainer mt='10px'>
            <Table variant='simple'>
              {/* <TableCaption>"Seamlessly utilize pre-existing templates without any inconvenience."</TableCaption> */}
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