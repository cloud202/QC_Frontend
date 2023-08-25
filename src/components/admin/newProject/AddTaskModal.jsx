import { AddIcon, DeleteIcon, RepeatIcon } from '@chakra-ui/icons'
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Flex, FormControl, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, TableContainer, Tbody, Td, Text, Textarea, Th, Thead, Tr, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import axios from 'axios'

const AddModuleModal = ({task,setTask,taskFormData, setTaskFormData}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
  const [formMode, setFormMode] = useState('add');
  const toast = useToast();
  const [isAlertOpen,setIsAlertOpen] = useState(false);
  const cancelRef = useRef();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const submitHandler = async ()=>{
    try {
      const {data} = await axios.post("http://ec2-34-247-84-33.eu-west-1.compute.amazonaws.com:5000/api/admin/master/project_task",taskFormData);
      console.log(data)

      setTask((prevData)=>[...prevData,{name: data.name,description: data.description,scope: data.scope,_id: data._id}])

      toast({
        title: "Module Added",
        description: "The module has been added successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setTaskFormData({name: "",description: "",scope: ""})
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  const deleteHandler = async (moduleId) => {

  };
  const onConfirmDelete = async (moduleId) => {

  };

  const updateInitializer = async()=>{
    
  }

  const updateHandler = async()=>{
    
  }

  const onAlertClose = () => {
    setIsAlertOpen(false);
  };

  
  return (
    <div>
      <Button rightIcon={<AddIcon />} size='sm' colorScheme='teal' variant='outline' onClick={onOpen}>Add Task</Button>
      <Modal isOpen={isOpen} onClose={onClose} size='6xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Define Task</ModalHeader>
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
                    value={taskFormData.name}
                    onChange={handleInputChange}
                    />
                    </HStack>
                </FormControl>

                <FormControl isRequired>
                <HStack align='start' spacing={0}>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    name="description"
                    value={taskFormData.description}
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
                    value={taskFormData.scope}
                    onChange={handleInputChange}
                    />
                    </HStack>
                </FormControl>

                <Box>
                  <Button size='sm'
                    rightIcon={formMode === 'add' ? <AddIcon /> : <RepeatIcon />}
                    colorScheme={formMode === 'add' ? 'blue' : 'orange'}
                    onClick={formMode === 'add' ? submitHandler : updateHandler}
                  >
                    {formMode === 'add' ? 'Add' : 'Update'}
                  </Button>
                </Box>
                </Flex>
            </form>

            <Text mt='10px' p='5px' bg='gray.50' borderRadius='5px' fontSize={{ base: '18px', md: '22px', lg: '30px' }} color="#445069">Available Tasks</Text>
            <TableContainer mt='10px' >
            <Table colorScheme='purple' size='sm'>
              <Thead>
                <Tr>
                  <Th>Task</Th>
                  <Th>Description</Th>
                  <Th>Scope</Th> 
                  <Th>Operation</Th> 
                </Tr>
              </Thead>
                  {task.map((rowData, index) => (
                    <Tbody key={rowData._id}>
                      {rowData.name !== "" && <Tr key={rowData._id}>
                        <Td>{rowData.name}</Td>
                        <Td>{rowData.description}</Td>
                        <Td>{rowData.scope}</Td>
                        <Td>
                            <div>
                            <Button isDisabled= {formMode==='update'} rightIcon={<RepeatIcon />} size='sm' colorScheme='orange' mr={4} onClick={()=>updateInitializer(rowData)}>
                              Update
                            </Button>

                            <Button rightIcon={<DeleteIcon />} size='sm' colorScheme='red' onClick={()=>deleteHandler(rowData._id)}>
                              Delete
                            </Button>
                              </div>
                        </Td>
                      </Tr>
                      }
                      </Tbody>
                  ))}

            </Table>
          </TableContainer> 
          </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='purple' variant='outline' mr={3} onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <AlertDialog
        isOpen={isAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={onAlertClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Phase
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete this phase?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onAlertClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onConfirmDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  )
}

export default AddModuleModal;
