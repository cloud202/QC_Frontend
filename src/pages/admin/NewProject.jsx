import React, { useState } from 'react'
import { Navbar } from '../../components/admin/Navbar'
import Sidebar from '../../components/admin/Sidebar'
import { Grid, GridItem, Button, Flex, Progress, Box, Text } from '@chakra-ui/react'
import { ArrowBackIcon, ArrowForwardIcon, CheckIcon } from '@chakra-ui/icons'
import DefineProject from '../../components/admin/newProject/DefineProject';
import { SelectPhase } from '../../components/admin/newProject/SelectPhase'
import AttachModule from '../../components/admin/newProject/AttachModule'
import AttachTask from '../../components/admin/newProject/AttachTask'
import Submit from '../../components/admin/newProject/Submit'
import axios from 'axios'
import Summary from '../../components/admin/newProject/Summary'

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

  const [tableData, setTableData] = useState([{
    name: "",
    description: "",
    scope: "",
    id: ""
  }]);

  const [summaryData,setSummaryData] = useState({
    template_name: "",
    template_type_id: "",
    template_segment_id: "",
    template_industry_id: "",
    template_usecase: "",
    phases: []
  })

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

    if (!summaryData || !summaryData.phases) {
      console.error("Summary data is not populated as expected.");
      return;
    }

    function transformData(inputData) {
      if (!inputData || !inputData.phases) {
        return null; // Handle the case when inputData or phases is undefined
      }
    
      return {
        template_name: inputData.template_name || "",
        template_type_id: inputData.template_type_id || "",
        template_segment_id: inputData.template_segment_id || "",
        template_industry_id: inputData.template_industry_id || "",
        template_usecase: inputData.template_usecase || "",
        phases: inputData.phases.map((phase) => {
          if (!phase || !phase.modules) {
            return null; // Handle the case when phase or modules is undefined
          }
    
          return {
            phasesId: phase.phaseId || "",
            modules: phase.modules.reduce((moduleArray, module) => {
              if (!module || !module.tasks) {
                return moduleArray; // Skip adding this module if module or tasks is undefined
              }
    
              const tasks = module.tasks.map((task) => {
                return {
                  taskId: task.taskId || ""
                };
              });
    
              if (tasks.length > 0) {
                moduleArray.push({
                  moduleId: module.moduleId || "",
                  tasks: tasks,
                });
              }
    
              return moduleArray;
            }, []), // Use reduce to filter out empty modules
          };
        }).filter((phase) => phase !== null), // Remove null entries from the phases array
      };
    }
       
    const transformedData = transformData(summaryData);
    console.log("SUmmaryData",summaryData)
    console.log("TransformedData",transformedData);
    
    try{
      const {data} = await axios.post(`${process.env.REACT_APP_API_URL}/api/admin/master/v2/project_template`,transformedData);
      console.log(data);
    }catch(e){
      console.log(e)
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
      <Text mb='20px' textAlign='center' p='5px' bg='#389785' color='white' borderRadius='5px' fontSize={{ base: '16px', sm: '18px',md: '25px', lg: '25px' }}>Create New Modernization-Journey Project Template</Text>
        <Progress value={100/5 * currPage} size='md' colorScheme='green' mb='10px' maxW='680px'/>

        { currPage===1 && <DefineProject summaryData={summaryData} setSummaryData={setSummaryData} formData={formData} setFormData={setFormData} />}
        { currPage===2 && <SelectPhase setSummaryData={setSummaryData} formData={formData} setFormData={setFormData} tableData={tableData} setTableData={setTableData}/>}
        { currPage===3 && <AttachModule summaryData={summaryData} setSummaryData={setSummaryData} formData={formData} setFormData={setFormData} tableData={tableData} attachedModules={attachedModules} setAttachedModules={setAttachedModules}/>}
        { currPage===4 && <AttachTask summaryData={summaryData} setSummaryData={setSummaryData} formData={formData} setFormData={setFormData} attachedTasks={attachedTasks} setAttachedTasks={setAttachedTasks}/>}
        { currPage===5 && <Summary summaryData={summaryData}/>}

        <Flex maxW="680px" justifyContent="space-between" alignItems="center" mt='10px'>
          <Button isDisabled={currPage===1} leftIcon={<ArrowBackIcon />} onClick={handlePrevious}colorScheme='purple' variant='outline' >Previous</Button>
          <Button rightIcon={currPage!==5?<ArrowForwardIcon/>:<CheckIcon/>} onClick={currPage!==5 ? handleNext: handleSubmit} colorScheme='purple' variant='outline' >{
            currPage===4? "Review" : (currPage!==5?"Next":"Submit")
          }</Button>
        </Flex> 

    </GridItem>
    </Grid>
    </>
  )
}

export default NewProject