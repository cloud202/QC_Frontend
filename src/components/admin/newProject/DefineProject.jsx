import React, { useEffect, useState } from 'react';
import { Button, Flex, FormLabel, Input, Menu, MenuButton, MenuItem, MenuList, Textarea } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import axios from "axios"

const DefineProject = ({summaryData, setSummaryData,formData,setFormData}) => {
  const [projectType,setProjectType] = useState([])
  const [segment,setSegment] = useState([])
  const [industry,setIndustry] = useState([])

  useEffect(() => {
    async function fetchData(){
        const project = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/master/project_type`)
        setProjectType(project.data)

        const segment = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/master/project_segment`)
        setSegment(segment.data);

        const industry = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/master/project_industry`)
        setIndustry(industry.data);
    }
    fetchData();  
  }, [])

  return (
      <Flex direction="column" maxW="680px">
        <Flex align="center" mb="20px">
          <FormLabel flex="1">Template Name:</FormLabel>
          <Input w="80%" type="text" placeholder="Enter the template name" value={formData.templateName} onChange={(e)=>{setSummaryData({...summaryData,template_name: e.target.value});setFormData({...formData,templateName: e.target.value})}}/>
        </Flex>

        <Flex align="center" mb="20px">
          <FormLabel flex="1">Project Type:</FormLabel>
          <Menu >
            <MenuButton w="80%" as={Button} variant="outline" colorScheme="gray" rightIcon={<ChevronDownIcon />}>
              {formData.projectType}
            </MenuButton>
            <MenuList>
                {
                    projectType && projectType.map((val,ind)=> 
                      <MenuItem key={ind} onClick={() => {setFormData({...formData,projectType: val.name}); setSummaryData({...summaryData,template_type_id: val._id})}}>{val.name}</MenuItem>)
                }
            </MenuList>
          </Menu>
        </Flex>

        <Flex align="center" mb="20px">
          <FormLabel flex="1">Segment:</FormLabel>
          <Menu >
            <MenuButton w="80%" as={Button} variant="outline" colorScheme="gray" rightIcon={<ChevronDownIcon />}>
              {formData.segment}
            </MenuButton>
            <MenuList>
                {
                    segment && segment.map((val,ind)=> <MenuItem key={ind} onClick={() => {setFormData({...formData,segment: val.name}); setSummaryData({...summaryData,template_segment_id: val._id})}}>{val.name}</MenuItem>)
                }
            </MenuList>
          </Menu>
        </Flex>

        <Flex align="center" mb="20px">
          <FormLabel flex="1">Industry:</FormLabel>
          <Menu >
            <MenuButton w="80%" as={Button} variant="outline" colorScheme="gray" rightIcon={<ChevronDownIcon />}>
              {formData.industry}
            </MenuButton>
            <MenuList>
                {
                    industry && industry.map((val,ind)=> <MenuItem key={ind} onClick={() => {setFormData({...formData,industry: val.name}); setSummaryData({...summaryData,template_industry_id: val._id})}}>{val.name}</MenuItem>)
                }
            </MenuList>
          </Menu>
        </Flex>

        <Flex align="center" mb="20px">
          <FormLabel flex="1">Use Case:</FormLabel>
          <Textarea w="80%" placeholder="Enter the use case" value={formData.useCase} onChange={(e) => {setFormData({...formData,useCase: e.target.value}); setSummaryData({...summaryData,template_usecase: e.target.value})}}/>
        </Flex>
      </Flex>
  );
};

export default DefineProject;
