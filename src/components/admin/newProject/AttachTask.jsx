import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import {Box,Button,Checkbox,Flex,FormLabel,HStack,Menu,MenuButton,MenuList,MenuItem,Table,TableContainer,Tbody,Td,Text,Th,Thead,Tr,Divider,
} from '@chakra-ui/react';
import { ChevronDownIcon, SmallCloseIcon } from '@chakra-ui/icons';
import AddTaskModal from './AddTaskModal';
import AddSolutionModal from './AddSolutionModal';

export const AttachTask = ({formData,setFormData,attachedTasks, setAttachedTasks }) => {
  const [task,setTask] = useState([]);
  const [selectedModule,setSelectedModule] = useState(null);
  const [checkedTask, setCheckedTask] = useState([]);

  const [taskFormData, setTaskFormData] = useState({
    name: "",
    description: "",
    scope: "",
    supportive_id: "temporary",
    status: true,
  });

  const handleModuleSelect = (moduleId) => {
    setSelectedModule(moduleId);
    setCheckedTask(attachedTasks[moduleId] || []);
  };

  const handleTaskSelect = (taskId,name) => {
    if (checkedTask.includes(taskId)) {
      setCheckedTask(checkedTask.filter(id => id !== taskId));
    } else {
      setCheckedTask([...checkedTask, taskId]);
    }

    setAttachedTasks((prevAttachedTask) => ({
      ...prevAttachedTask,
      [selectedModule]: checkedTask.includes(taskId)
        ? prevAttachedTask[selectedModule].filter(id => id !== taskId)
        : [...(prevAttachedTask[selectedModule] || []), taskId],
    }));
    
    console.log(formData.modules);
  };

  const fetchDataEffect = useCallback(async () => {
    try {
      const tasks = await axios.get("http://ec2-34-247-84-33.eu-west-1.compute.amazonaws.com:5000/api/admin/master/project_task");
      setTask(tasks.data);
    } catch (error) {
      console.error("Error fetching task data:", error);
    }
  }, []);

  useEffect(() => {
    fetchDataEffect();
  }, [fetchDataEffect]);


  return (
    <Flex direction="column" maxW="680px">
      <Text mb='10px' p='5px' bg='gray.50' borderRadius='5px' fontSize={{ base: '15px', sm: '26px',md: '30px', lg: '30px' }} color="#445069">Attach Task with Modules</Text>

      <Flex align="center" mb="20px">
        <FormLabel flex="1">Attach To:</FormLabel>
        <Menu>
          <MenuButton w="80%" as={Button} variant="outline" colorscheme="gray" rightIcon={<ChevronDownIcon />}>
          Select a Module
          </MenuButton>
          <MenuList p='20px'>
            {formData.modules.map((val) => {
              return (
                <MenuItem
                  key={val.id}
                  spacing={2}
                  size='md'
                  colorscheme='green'
                  onClick={()=>handleModuleSelect(val.id)}
                >
                  {val.name}
                </MenuItem>
              );
            })}
          </MenuList>
        </Menu>
      </Flex>

      <Flex align="center" mb="20px">
        <FormLabel flex="1">Select Task:</FormLabel>
        <Menu >
          <MenuButton w="80%" as={Button} variant="outline" colorscheme="gray" rightIcon={<ChevronDownIcon />}>
            Select an option
          </MenuButton>
          <MenuList p='20px'>
          {task.map((val, ind) => (
              <HStack p='2px' key={val._id}>
                <Checkbox
                  spacing={2}
                  size='md'
                  colorScheme='green'
                  isChecked={checkedTask.includes(val._id)}
                  onChange={() => handleTaskSelect(val._id,val.name)}
                >
                  {val.name}
                </Checkbox>
              </HStack>
            ))}
          </MenuList>
        </Menu>
      </Flex>
      <HStack>
        <AddTaskModal task={task} setTask={setTask} taskFormData={taskFormData} setTaskFormData={setTaskFormData}/>
        <AddSolutionModal/>
      </HStack>
      <Box mt='20px' p='5px' bg='gray.50' borderRadius='5px' fontSize={{ base: '18px', md: '22px', lg: '30px' }} color="#445069">
        Attached Tasks
      </Box>
      <TableContainer mt="10px">
  <Table colorscheme="purple">
    <Thead>
      <Tr>
        <Th>Phase</Th>
        <Th>Attached Modules</Th>
        <Th>Action</Th>
      </Tr>
    </Thead>
    <Tbody>
      {formData.modules.map((val) => (
        attachedTasks[val.id] && attachedTasks[val.id].length > 0 ? (
          <Tr key={val.id}>
            <Td>{val.name}</Td>
            <Td mb="3px">
              {attachedTasks[val.id].map((taskId) => {
                const selectedTask = task.find((tas) => tas._id === taskId);
                return (
                  <div key={taskId}>
                      {selectedTask ? selectedTask.name : null}
                    <Divider my={1} />
                  </div>
                );
              })}
            </Td>
            <Td>
              Remove
            </Td>
          </Tr>
        ) : null // Skip rendering the row if there are no attached modules
      ))}
    </Tbody>
  </Table>
</TableContainer>
    </Flex>
  );
};

export default AttachTask;
