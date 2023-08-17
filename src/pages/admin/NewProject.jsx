import React, { useState } from 'react'
import { Navbar } from '../../components/admin/Navbar'
import Sidebar from '../../components/admin/Sidebar'
import { Grid, GridItem, Button, Flex, Progress } from '@chakra-ui/react'
import { ArrowBackIcon, ArrowForwardIcon, CheckIcon } from '@chakra-ui/icons'
import DefineProject from '../../components/admin/newProject/DefineProject';
import { SelectPhase } from '../../components/admin/newProject/SelectPhase'
import AttachModule from '../../components/admin/newProject/AttachModule'

const NewProject = () => {
  const [currPage,setCurrPage] = useState(1);
  const [formData,setFormData] = useState({
    templateName: "",
    projectType: "Select an option",
    segment: "Select an option",
    industry: "Select an option",
    useCase: "",
    phase: "Select an option"
  })

  const [tableData, setTableData] = useState({
    name: "",
    description: "",
    scope: ""
  });

  const handlePrevious = ()=>{
    setCurrPage(currPage-1);
  }

  const handleNext =()=>{
    if(currPage!==5){
      setCurrPage(currPage+1);
    }
      //logic for subit form here
    
  }
  
  return (
    <>
    <Navbar/>
    <Grid templateColumns="repeat(6,1fr)">
      <GridItem colSpan="1">
        <Sidebar/>
      </GridItem>

      <GridItem colSpan="5" ml="30px" mt="30px">
        <Progress value={100/5 * currPage} size='md' colorScheme='green' mb='10px' w='680px'/>
        { currPage===1 && <DefineProject formData={formData} setFormData={setFormData} />}
        { currPage===2 && <SelectPhase formData={formData} setFormData={setFormData} tableData={tableData} setTableData={setTableData}/>}
        { currPage===3 && <AttachModule/>}
        { currPage===4 && <AttachModule/>}
        { currPage===5 && <AttachModule/>}
        <Flex w="680px" justifyContent="space-between" alignItems="center">
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