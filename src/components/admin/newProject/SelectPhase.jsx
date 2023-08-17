import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Button, Flex, FormControl, FormLabel, Input, Menu, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Switch, Table, TableContainer, Tbody, Td, Text, Textarea, Th, Thead, Tr, VStack, useDisclosure } from '@chakra-ui/react';
import { AddIcon, ChevronDownIcon, DeleteIcon } from '@chakra-ui/icons';

export const SelectPhase = ({formData,setFormData,tableData,setTableData}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [phase,setPhase] = useState([])

  const [moduleFormData, setModuleFormData] = useState({
    name: "",
    description: "",
    scope: "",
    supportive_id: "",
    status: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setModuleFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleStatusChange = () => {
    setModuleFormData((prevData) => ({ ...prevData, status: !prevData.status }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to backend
    console.log(moduleFormData);
  };

  const handlePhaseSelect = async (selectedPhaseId,selectedPhaseName) => {
    try {
      const response = await axios.get(`http://ec2-34-247-84-33.eu-west-1.compute.amazonaws.com:5000/api/admin/master/project_phase/${selectedPhaseId}`);

      setFormData({ ...formData, phase: selectedPhaseName });
      setTableData({name: response.data.name,description: response.data.description,scope: response.data.scope})
    } catch (error) {
      console.error("Error fetching selected phase data:", error);
    }
  };

  const handleRemovePhase =()=>{
    setTableData({name: "",description: "",scope: ""})
    setFormData({...formData,phase: "Select an option"});
  }

  useEffect(() => {
    async function fetchData(){
        const phases = await axios.get("http://ec2-34-247-84-33.eu-west-1.compute.amazonaws.com:5000/api/admin/master/project_phase")
        setPhase(phases.data)
    }
    fetchData();  
  }, [])


  return (
    <Flex direction="column" maxW="680px">
        <Flex align="center" mb="20px">
          <FormLabel flex="1">Select Phase:</FormLabel>
          <Menu >
            <MenuButton w="80%" as={Button} variant="outline" colorScheme="gray" rightIcon={<ChevronDownIcon />}>
              {formData.phase}
            </MenuButton>
            <MenuList>
                {
                    phase && phase.map((val,ind)=> <MenuItem key={ind} onClick={() => handlePhaseSelect(val._id,val.name)}>{val.name}</MenuItem>)
                }
            </MenuList>
          </Menu>

        </Flex>
        
        <Button rightIcon={<AddIcon />} colorScheme='purple' variant='outline' onClick={onOpen}>Add Phase</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Define phase</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Box p={4}>
            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Scope</FormLabel>
                  <Input
                    type="text"
                    name="scope"
                    value={formData.scope}
                    onChange={handleInputChange}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Supportive ID</FormLabel>
                  <Input
                    type="text"
                    name="supportive_id"
                    value={formData.supportive_id}
                    onChange={handleInputChange}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Status</FormLabel>
                  <Switch
                    name="status"
                    isChecked={formData.status}
                    onChange={handleStatusChange}
                  />
                </FormControl>
              </VStack>
            </form>
          </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='purple' variant='outline' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme='purple' type='submit'>Submit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
        <Text mt='15px' fontSize={{ base: '18px', md: '22px', lg: '30px' }} color="#445069">Selected Phase</Text>
        
        <TableContainer mb='20px'>
            <Table variant='striped' colorScheme='purple'>
              <Thead>
                <Tr>
                  <Th>Phase</Th>
                  <Th>Description</Th>
                  <Th>Scope</Th> 
                  <Th>Operation</Th> 
                </Tr>
              </Thead>

              <Tbody>
                {tableData && (
                <Tr>
                  <Td>{tableData.name}</Td>
                  <Td>{tableData.description}</Td>
                  <Td>{tableData.scope}</Td>
                  <Td>
                    {tableData.name!=="" && <Button rightIcon={<DeleteIcon />} size='sm' colorScheme='red' variant='outline' onClick={handleRemovePhase} >Remove Phase</Button>}
                  </Td>
                </Tr>
              )}     
              </Tbody>
            </Table>
          </TableContainer>
          
       
      </Flex>
  )
}
