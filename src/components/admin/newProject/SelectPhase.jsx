import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Checkbox,Box, Button, Flex, FormControl, FormLabel, HStack, Input, Menu, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Switch, Table, TableContainer, Tbody, Td, Text, Textarea, Th, Thead, Tr, VStack, useDisclosure, useToast } from '@chakra-ui/react';
import { AddIcon, ChevronDownIcon, DeleteIcon, RepeatIcon, SmallCloseIcon } from '@chakra-ui/icons';
import AddPhaseModal from './AddPhaseModal';
import UpdatePhaseModal from './UpdatePhaseModal';

export const SelectPhase = ({formData,setFormData,tableData,setTableData}) => {
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [phase,setPhase] = useState([])

  const [phaseFormData, setPhaseFormData] = useState({
    name: "",
    description: "",
    scope: "",
    supportive_id: "",
    status: true,
  });
  const [phaseFormSubmitted, setPhaseFormSubmitted] = useState(false);
  const [checkedPhases, setCheckedPhases] = useState([]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPhaseFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleStatusChange = () => {
    setPhaseFormData((prevData) => ({ ...prevData, status: !prevData.status }));
  };

  const handleSubmit = async () => {
    try{
      const {data} = await axios.post("http://ec2-34-247-84-33.eu-west-1.compute.amazonaws.com:5000/api/admin/master/project_phase",phaseFormData);
      console.log(data)
      setPhaseFormSubmitted(true);
      setFormData((prevFormData) => ({
        ...prevFormData,
        phase: [...prevFormData.phase, data.name]
      }));

      setTableData((prevData)=>[...prevData,{name: data.name,description: data.description,scope: data.scope,id: data._id}])

      toast({
        title: "Phase Added",
        description: "The phase has been added successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }catch (error) {
      console.error("Error sending phase form data:", error);
    }
  };

  const handlePhaseSelect = async (selectedPhaseId,selectedPhaseName) => {
    try {
      const response = await axios.get(`http://ec2-34-247-84-33.eu-west-1.compute.amazonaws.com:5000/api/admin/master/project_phase/${selectedPhaseId}`);

      setFormData((prevFormData) => ({
        ...prevFormData,
        phase: [...prevFormData.phase, selectedPhaseName]
      }));

      const newData = {
        name: response.data.name,
        description: response.data.description,
        scope: response.data.scope,
        id: response.data._id
      };
  
      setTableData((prevTableData) => [...prevTableData, newData]);
      setCheckedPhases((prevCheckedPhases) => [...prevCheckedPhases, selectedPhaseId]);

    } catch (error) {
      console.error("Error fetching selected phase data:", error);
    }
  };

  const handleRemovePhase =(index,phaseId,phase)=>{
    const updatedTableData = [...tableData];
    updatedTableData.splice(index, 1);

    setTableData(updatedTableData);
    setCheckedPhases((prevCheckedPhases) => prevCheckedPhases.filter((id) => id !== phaseId));

    const updatedPhases = formData.phase.filter((phaseName) => phaseName !== phase);
    setFormData((prevFormData) => ({
      ...prevFormData,
      phase: updatedPhases,
    }));
  }

  useEffect(() => {
    async function fetchData(){
        const phases = await axios.get("http://ec2-34-247-84-33.eu-west-1.compute.amazonaws.com:5000/api/admin/master/project_phase")
        setPhase(phases.data)
    }
    fetchData();  
  }, [phaseFormSubmitted])


  return (
    <Flex direction="column" maxW="680px">
        <Flex align="center" mb="20px">
          <FormLabel flex="1">Select Phase:</FormLabel>
          <Menu >
            <MenuButton w="80%" as={Button} variant="outline" colorScheme="gray" rightIcon={<ChevronDownIcon />}>
              Select an option
            </MenuButton>
            <MenuList p='20px'>
                {
                    // phase && phase.map((val,ind)=> <MenuItem key={ind} onClick={() => handlePhaseSelect(val._id,val.name)}>{val.name}</MenuItem>)
                    phase && phase.map((val,ind)=> (
                      <HStack p='2px' key={val._id}>
                       <Checkbox
                        spacing={2}
                        size='md'
                        colorScheme='green'
                        isChecked={checkedPhases.includes(val._id)}
                        onChange={(e) => { if(e.target.checked) handlePhaseSelect(val._id, val.name)}}
                      >
                        {val.name}
                      </Checkbox>
                      </HStack>

                    ))
                }
            </MenuList>
          </Menu>

        </Flex>
      <Flex justifyContent='space-between'>
        <AddPhaseModal tableData={tableData} phaseFormData={phaseFormData} setPhaseFormData={setPhaseFormData} handleSubmit={handleSubmit} />
      
        <UpdatePhaseModal phaseFormData={phaseFormData} setPhaseFormData={setPhaseFormData} handleSubmit={handleSubmit} phase={phase}/>

        <Button rightIcon={<DeleteIcon />} size='sm' colorScheme='red' variant='outline' onClick={onOpen}>Delete Phase</Button>
        <Modal isOpen={isOpen} onClose={onClose} size='lg'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Define phase</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Box p={4}>
            <form>
              <VStack spacing={4}>

                <FormControl isRequired>

                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    name="name"
                    value={phaseFormData.name}
                    onChange={handleInputChange}
                    />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    name="description"
                    value={phaseFormData.description}
                    onChange={handleInputChange}
                    />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Scope</FormLabel>
                  <Input
                    type="text"
                    name="scope"
                    value={phaseFormData.scope}
                    onChange={handleInputChange}
                    />
                </FormControl>
                    </VStack>
            </form>
          </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='purple' variant='outline' mr={3} onClick={onClose}>Close
            </Button>
            <Button colorScheme='purple' type='submit' onClick={handleSubmit}>Submit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      </Flex>
        <Text mt='15px' fontSize={{ base: '18px', md: '22px', lg: '30px' }} color="#445069">Selected Phases</Text>
        
        <TableContainer mb='20px'>
            <Table colorScheme='purple'>
              <Thead>
                <Tr>
                  <Th>Phase</Th>
                  <Th>Description</Th>
                  <Th>Scope</Th> 
                  <Th>Operation</Th> 
                </Tr>
              </Thead>

              <Tbody>
                  {tableData.map((rowData, index) => (
                    <Tr key={index}>
                      <Td>{rowData.name}</Td>
                      <Td>{rowData.description}</Td>
                      <Td>{rowData.scope}</Td>
                      <Td>
                        {rowData.name !== "" && (
                          <Button
                            rightIcon={<SmallCloseIcon />}
                            size='sm'
                            colorScheme='red'
                            variant='outline'
                            onClick={() => handleRemovePhase(index,rowData.id,rowData.name)}
                          >
                            Remove
                          </Button>
                        )}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>

            </Table>
          </TableContainer>      
      </Flex>
  )
}
