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
import axios from 'axios'

const NewProject = () => {
  const [currPage,setCurrPage] = useState(1);
  
  const [formData, setFormData] = useState({
    templateName: "",
    projectType: "Select an option",
    segment: "Select an option",
    industry: "Select an option",
    useCase: "",
    phases: [],
    modules: [],
    task: [],
  });
  
  const [templateState, setTemplateState] = useState({
    template_name: "",
    template_type_id: "",
    template_segment_id: "",
    template_industry_id: "",
    template_usecase: "",
    phases: [],
    modules: [],
    tasks: [],
  });

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

  const handleSubmit=async()=>{
    try{
      const {data} = await axios.post("http://ec2-34-247-84-33.eu-west-1.compute.amazonaws.com:5000/api/admin/master/project_template",templateState);
      console.log(data);
    }catch(e){
      console.log(e)
    }
  }

  setTimeout(()=>{
    console.log(formData);
  },20000)

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

        { currPage===1 && <DefineProject templateState={templateState} setTemplateState={setTemplateState}  formData={formData} setFormData={setFormData} />}
        { currPage===2 && <SelectPhase templateState={templateState} setTemplateState={setTemplateState} formData={formData} setFormData={setFormData} tableData={tableData} setTableData={setTableData}/>}
        { currPage===3 && <AttachModule templateState={templateState} setTemplateState={setTemplateState} formData={formData} setFormData={setFormData} tableData={tableData} attachedModules={attachedModules} setAttachedModules={setAttachedModules}/>}
        { currPage===4 && <AttachTask templateState={templateState} setTemplateState={setTemplateState} formData={formData} setFormData={setFormData} attachedTasks={attachedTasks} setAttachedTasks={setAttachedTasks}/>}
        { currPage===5 && <Submit />}

        <Flex maxW="680px" justifyContent="space-between" alignItems="center" mt='10px'>
          <Button isDisabled={currPage===1} leftIcon={<ArrowBackIcon />} onClick={handlePrevious}colorScheme='purple' variant='outline' >Previous</Button>
          <Button rightIcon={currPage!==5?<ArrowForwardIcon/>:<CheckIcon/>} onClick={currPage!==5 ? handleNext: handleSubmit} colorScheme='purple' variant='outline' >{
            currPage!==5?"Next":"Submit"
          }</Button>
        </Flex> 

    </GridItem>
    </Grid>
    </>
  )
}

export default NewProject