import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { Checkbox,Box, Button, Flex, FormControl, FormLabel, HStack, Input, Menu, MenuButton, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, TableContainer, Tbody, Td, Text, Textarea, Th, Thead, Tr, VStack, useDisclosure, useToast } from '@chakra-ui/react';
import { ChevronDownIcon, SmallCloseIcon } from '@chakra-ui/icons';
import AddPhaseModal from './AddPhaseModal';

export const SelectPhase = ({formData,setFormData,tableData,setTableData}) => {
  const toast = useToast()
  const { isOpen, onClose } = useDisclosure()
  const [phase,setPhase] = useState([])

  const [phaseFormData, setPhaseFormData] = useState({
    name: "",
    description: "",
    scope: "",
    status: true,
  });
  const [phaseFormSubmitted, setPhaseFormSubmitted] = useState(false);
  const [checkedPhases, setCheckedPhases] = useState([]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPhaseFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    try{
      const {data} = await axios.post("http://ec2-34-247-84-33.eu-west-1.compute.amazonaws.com:5000/api/admin/master/project_phase",phaseFormData);
      setPhaseFormSubmitted(true);
      setFormData((prevFormData) => ({
        ...prevFormData,
        phase: [...prevFormData.phase, data.name]
      }));

      setPhase((prevData)=>[...prevData,{name: data.name,description: data.description,scope: data.scope,id: data._id}])

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
    if (checkedPhases.includes(selectedPhaseId)) {
      setCheckedPhases(checkedPhases.filter(id => id !== selectedPhaseId));

    setTableData(prevTableData => prevTableData.filter(rowData => rowData.id !== selectedPhaseId));
    setFormData(prevFormData => ({
      ...prevFormData,
      phase: prevFormData.phase.filter(phaseName => phaseName !== selectedPhaseName)
    }));
    } else {
      setCheckedPhases([...checkedPhases, selectedPhaseId]);
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
      
    } catch (error) {
      console.error("Error fetching selected phase data:", error);
    }
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

  const fetchDataEffect = useCallback(async () => {
    try {
      const phases = await axios.get("http://ec2-34-247-84-33.eu-west-1.compute.amazonaws.com:5000/api/admin/master/project_phase");
      setPhase(phases.data);
    } catch (error) {
      console.error("Error fetching phase data:", error);
    }
  },[]);

  useEffect(() => {
    fetchDataEffect();
  }, [phaseFormSubmitted,fetchDataEffect]);


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
                        onChange={(e) => {handlePhaseSelect(val._id, val.name)}}
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
        <AddPhaseModal phase={phase} setPhase={setPhase} tableData={tableData} setTableData={setTableData} phaseFormData={phaseFormData} setPhaseFormData={setPhaseFormData} handleSubmit={handleSubmit} setPhaseFormSubmitted={setPhaseFormSubmitted} fetchDataEffect={fetchDataEffect}/>

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
        <Text mt='20px' p='5px' bg='gray.50' borderRadius='5px' fontSize={{ base: '18px', md: '22px', lg: '30px' }} color="#445069">Selected Phases</Text>
        
        <TableContainer m='20px'>
            <Table colorScheme='purple' size='sm'>
              <Thead>
                <Tr>
                  <Th>Phase</Th>
                  <Th>Description</Th>
                  <Th>Scope</Th> 
                  <Th>Operation</Th> 
                </Tr>
              </Thead>

                  {tableData.map((rowData, index) => (
                  <Tbody key={rowData.id}>
                     {rowData.name !== "" && <Tr key={rowData.id}>
                        <Td>{rowData.name}</Td>
                        <Td>{rowData.description}</Td>
                        <Td>{rowData.scope}</Td>
                        <Td>
                            <Button
                              rightIcon={<SmallCloseIcon />}
                              size='sm'
                              colorScheme='red'
                              variant='outline'
                              onClick={() => handleRemovePhase(index,rowData.id,rowData.name)}
                            >
                              Remove
                            </Button>
                        </Td>
                      </Tr>}
                </Tbody>
                  ))}
            </Table>
          </TableContainer>      
      </Flex>
  )
}
