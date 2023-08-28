import React, { useState } from 'react'
import { Navbar } from '../../components/admin/Navbar'
import Sidebar from '../../components/admin/Sidebar'
import { Grid, GridItem, Button, Flex, Progress, Box } from '@chakra-ui/react'
import { ArrowBackIcon, ArrowForwardIcon, CheckIcon } from '@chakra-ui/icons'
import DefineProject from '../../components/admin/newProject/DefineProject';
import { SelectPhase } from '../../components/admin/newProject/SelectPhase'
import AttachModule from '../../components/admin/newProject/AttachModule'
import AttachTask from '../../components/admin/newProject/AttachTask'
import Submit from '../../components/admin/newProject/Submit'

const NewProject = () => {
  const [currPage,setCurrPage] = useState(1);
  const [formData,setFormData] = useState({
    templateName: "",
    projectType: "Select an option",
    segment: "Select an option",
    industry: "Select an option",
    useCase: "",
    phase: [],
    modules: [],
  })

  const [tableData, setTableData] = useState([{
    name: "",
    description: "",
    scope: "",
    id: ""
  }]);

  const [attachedModules, setAttachedModules] = useState({});
  const [attachedTasks, setAttachedTasks] = useState({});

  const handlePrevious = ()=>{
    setCurrPage(currPage-1);
  }

  const handleNext =()=>{
    if(currPage!==5){
      setCurrPage(currPage+1);
    }   
  }
  
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
        <Progress value={100/5 * currPage} size='md' colorScheme='green' mb='10px' maxW='680px'/>

        { currPage===1 && <DefineProject formData={formData} setFormData={setFormData} />}
        { currPage===2 && <SelectPhase formData={formData} setFormData={setFormData} tableData={tableData} setTableData={setTableData}/>}
        { currPage===3 && <AttachModule formData={formData} setFormData={setFormData} tableData={tableData} attachedModules={attachedModules} setAttachedModules={setAttachedModules}/>}
        { currPage===4 && <AttachTask formData={formData} setFormData={setFormData} attachedTasks={attachedTasks} setAttachedTasks={setAttachedTasks}/>}
        { currPage===5 && <Submit/>}

        <Flex maxW="680px" justifyContent="space-between" alignItems="center" mt='10px'>
          <Button isDisabled={currPage===1} leftIcon={<ArrowBackIcon />} onClick={handlePrevious}colorScheme='purple' variant='outline' >Previous</Button>
          <Button rightIcon={currPage!==5?<ArrowForwardIcon/>:<CheckIcon/>} onClick={handleNext} colorScheme='purple' variant='outline' >{
            currPage!==5?"Next":"Submit"
          }</Button>
        </Flex> 

    </GridItem>
    </Grid>
    </>
  )
}

export default NewProject