import React, { useEffect } from 'react'
import {Box, Grid, GridItem, Image, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr} from '@chakra-ui/react'
import { Navbar } from '../../components/admin/Navbar'
import Sidebar from '../../components/admin/Sidebar'
import '../../css/admin/adminDashboard.css'
import step_one from '../../img/admin_steps/1.png'
import Footer from '../../components/global/Footer'
import { useState,useCallback} from 'react'
import axios from 'axios'
import SkeletonTable from '../../components/global/Skeleton'

const AdminDashboard = () => {
  const [projectTemplate,setProjectTemplate] = useState([])
  const [isLoading,setIsLoading] = useState(true);

  const fetchTaskDataEffect = useCallback(async () => {
    try {
      const {data} = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/master/project_template`);
      setProjectTemplate(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching task data:", error);
    }
  }, []);

  useEffect(() => {
    fetchTaskDataEffect();
  }, [fetchTaskDataEffect]);

  return (
    <>
    <Navbar/>
      <Grid templateColumns="repeat(6,1fr)">
        <GridItem colSpan={{lg: '1' }}>
          <Box w={{ base: 'none',sm: 'none', md: 'none', lg: '230px' }}>
            <Sidebar/>
          </Box>
        </GridItem>

        <GridItem colSpan={{base: '6', sm: '6', md: '6',lg: '5' }} className= "project-background" >
          <Box className='dashboard-shadow' display='flex' flexDirection='column' alignItems='center' justifyContent='center' textAlign='center' mt={{base: '14px',lg: '6px'}} mb={{base: '22px'}} mr={{base: '5px',sm: '8px',lg: '12px'}} ml={{base: '5px',sm: '8px',lg: '12px'}}>
          <Text className='sub-title' fontSize={{ base: '14px',sm: '20px', md: '24px', lg: '28px' }} fontWeight={400} >Welcome to modX Define Modernization Journey For Your Customer</Text>
          <Image src={step_one} w={{ base: '100%', lg: '80%' }}/>
          </Box>

          <Box className='dashboard-shadow' p={{ base: '6px',sm: '6px', md: '6px', lg: '2px' }}  mr={{base: '5px',sm: '8px',lg: '12px'}} ml={{base: '5px',sm: '8px',lg: '12px'}} mb='16px'>
            <Text className='sub-title' fontSize={{ base: '16px', md: '20px', lg: '22px' }}  mt={{ base: '6px',sm: '6px', md: '6px', lg: '12px' }} >Available Project Templates</Text>
            {isLoading? <SkeletonTable/> : <TableContainer>
              <Table variant='simple' size={{ base: 'sm', md: 'sm', lg: 'md' }} mt='6px'>
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
                  {projectTemplate && projectTemplate.map((project)=> 
                  <Tr key={project._id}>
                    <Td>{project.project_id}</Td>
                    <Td>{project.template_name}</Td>
                    <Td>{project.template_type_id.name}</Td>
                    <Td>{project.template_segment_id.name}</Td>
                    <Td>{project.template_industry_id.name}</Td>
                  </Tr>)}           
                </Tbody>
              </Table>
            </TableContainer>}
          </Box>
            <Footer/>    
        </GridItem>
      </Grid>

    </>
  )
}

export default AdminDashboard