import { AddIcon, DeleteIcon, RepeatIcon, SmallCloseIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, FormControl, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, TableContainer, Tbody, Td, Text, Textarea, Th, Thead, Tr, VStack, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'

const AddPhaseModal = ({tableData,phaseFormData,setPhaseFormData,handleSubmit}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPhaseFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const submitHandler = ()=>{
    handleSubmit();
    onClose();
  }


  return (
    <div>
        <Button rightIcon={<AddIcon />} size='sm' colorScheme='teal' variant='outline' onClick={onOpen}>Add Phase</Button>
        <Modal isOpen={isOpen} onClose={onClose} size='6xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Define phase</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Box p={4}>
            <form>
              <Flex gap={2}>

                <FormControl isRequired>
                <HStack align='start' spacing={0}>
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    name="name"
                    value={phaseFormData.name}
                    onChange={handleInputChange}
                    />
                    </HStack>
                </FormControl>

                <FormControl isRequired>
                <HStack align='start' spacing={0}>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    name="description"
                    value={phaseFormData.description}
                    onChange={handleInputChange}
                    />
                    </HStack>
                </FormControl>

                <FormControl isRequired>
                <HStack align='start' spacing={0}>
                  <FormLabel>Scope</FormLabel>
                  <Input
                    type="text"
                    name="scope"
                    value={phaseFormData.scope}
                    onChange={handleInputChange}
                    />
                    </HStack>
                </FormControl>

                <Box>
                    <Button size='sm' rightIcon={<AddIcon/>} colorScheme='blue' type='submit' onClick={submitHandler}>Add</Button>
                </Box>
                </Flex>
            </form>
        <Text mt='15px' fontSize={{ base: '18px', md: '22px', lg: '30px' }} color="#445069">Selected Phases</Text>
            <TableContainer mt='10px' >
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
                          <div>
                          <Button rightIcon={<RepeatIcon />} size='sm' colorScheme='orange' mr={4}>
                            Update
                          </Button>

                          <Button rightIcon={<DeleteIcon />} size='sm' colorScheme='red'>
                            Delete
                          </Button>
                            </div>
                        )}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>

            </Table>
          </TableContainer>  

          </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='purple' variant='outline' mr={3} onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default AddPhaseModal