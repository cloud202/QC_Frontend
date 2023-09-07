import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import {Box,Button,Checkbox,Flex,FormLabel,HStack,Menu,MenuButton,MenuList,MenuItem,Table,TableContainer,Tbody,Td,Text,Th,Thead,Tr,Divider,
} from '@chakra-ui/react';
import { ChevronDownIcon, SmallCloseIcon } from '@chakra-ui/icons';
import AddTaskModal from './AddTaskModal';
import AddSolutionModal from './AddSolutionModal';

export const AttachTask = ({templateState,setTemplateState,formData,setFormData,attachedTasks, setAttachedTasks }) => {
  const [task,setTask] = useState([]);
  const [selectedModuleName,setSelectedModuleName] = useState("Select a module")
  const [selectedModule,setSelectedModule] = useState(null);
  const [checkedTask, setCheckedTask] = useState([]);
  const [solution,setSolution] = useState(null);

  const [taskSubmitted,setTaskSubmitted] = useState(false);

  const handleRemoveTask = (moduleId, taskId) => {
    // Remove the task from attachedTasks state
    const updatedAttachedTasks = { ...attachedTasks };
    const taskIndex = updatedAttachedTasks[moduleId].indexOf(taskId);
  
    if (taskIndex !== -1) {
      updatedAttachedTasks[moduleId].splice(taskIndex, 1);
      setAttachedTasks(updatedAttachedTasks);
    }
  
    // Remove the task from templateState.tasks
    setTemplateState((prevTemplateState) => {
      const updatedTasks = prevTemplateState.tasks.filter(
        (task) => !(task.taskId === taskId && task.moduleId === moduleId)
      );
      return { ...prevTemplateState, tasks: updatedTasks };
    });
  };
  

  const handleRemoveButton = (taskId) => {
    try {
      const updatedAttachedTasks = { ...attachedTasks };
  
      for (const moduleId in updatedAttachedTasks) {
        updatedAttachedTasks[moduleId] = updatedAttachedTasks[moduleId].filter(id => id !== taskId);
      }

      setAttachedTasks(updatedAttachedTasks);
    } catch (error) {
      console.error("Error deleting Task from all modules:", error);
    }
  };

  const handleModuleSelect = (moduleId,moduleName) => {
    setSelectedModuleName(moduleName);
    setSelectedModule(moduleId);
    setCheckedTask(attachedTasks[moduleId] || []);
  };

  const handleTaskSelect = (taskId, name) => {
    if (checkedTask.includes(taskId)) {
      // Task is already checked, uncheck it and remove it from templateState.tasks
      setCheckedTask(checkedTask.filter((id) => id !== taskId));
  
      setTemplateState((prevTemplateState) => {
        const updatedTasks = prevTemplateState.tasks.filter(
          (task) => !(task.taskId === taskId && task.moduleId === selectedModule)
        );
        return { ...prevTemplateState, tasks: updatedTasks };
      });
    } else {
      // Task is not checked, check it and add it to templateState.tasks
      setCheckedTask([...checkedTask, taskId]);
  
      setTemplateState((prevTemplateState) => {
        const newTask = {
          taskId: taskId,
          moduleId: selectedModule,
        };
        return { ...prevTemplateState, tasks: [...prevTemplateState.tasks, newTask] };
      });
    }
  
    setAttachedTasks((prevAttachedTask) => ({
      ...prevAttachedTask,
      [selectedModule]: checkedTask.includes(taskId)
        ? prevAttachedTask[selectedModule].filter((id) => id !== taskId)
        : [...(prevAttachedTask[selectedModule] || []), taskId],
    }));
  };

  const fetchSolDataEffect = useCallback(async () => {
    try {
      const sol = await axios.get("http://ec2-34-247-84-33.eu-west-1.compute.amazonaws.com:5000/api/admin/master/project_solution");
      setSolution(sol.data);
    } catch (error) {
      console.error("Error fetching solution data:", error);
    }
  }, []);

  const fetchTaskDataEffect = useCallback(async () => {
    try {
      const tasks = await axios.get("http://ec2-34-247-84-33.eu-west-1.compute.amazonaws.com:5000/api/admin/master/project_task");
      setTask(tasks.data);
      setTaskSubmitted(false);
    } catch (error) {
      console.error("Error fetching task data:", error);
    }
  }, []);

  useEffect(() => {
    fetchTaskDataEffect();
    fetchSolDataEffect();
  }, [fetchSolDataEffect,fetchTaskDataEffect,taskSubmitted]);

  return (
    <Flex direction="column" maxW="680px">
      <Text mb='10px' p='5px' bg='gray.50' borderRadius='5px' fontSize={{ base: '15px', sm: '26px',md: '30px', lg: '30px' }} color="#445069">Attach Task with Modules</Text>

      <Flex align="center" mb="20px">
        <FormLabel flex="1">Attach To:</FormLabel>
        <Menu>
          <MenuButton w="80%" as={Button} variant="outline" colorscheme="gray" rightIcon={<ChevronDownIcon />}>
          {selectedModuleName}
          </MenuButton>
          <MenuList p='20px'>
            {formData.modules.map((val) => {
              return (
                <MenuItem
                  key={val.id}
                  spacing={2}
                  size='md'
                  colorscheme='green'
                  onClick={()=>handleModuleSelect(val.id,val.name)}
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
        <AddTaskModal solution={solution} task={task} setTask={setTask} setTaskSubmitted={setTaskSubmitted} handleRemoveButton={handleRemoveButton}/>
        <AddSolutionModal solution={solution} setSolution={setSolution}/>
      </HStack>
      <Box mt='20px' p='5px' bg='gray.50' borderRadius='5px' fontSize={{ base: '18px', md: '22px', lg: '30px' }} color="#445069">
        Attached Tasks
      </Box>
      <TableContainer mt="10px">
  <Table colorscheme="purple">
    <Thead>
      <Tr>
        <Th>Module</Th>
        <Th>Attached Task</Th>
        <Th>Operation</Th>
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
            {attachedTasks[val.id].map((taskId) => (
                      <div key={taskId}>
                        <Button
                          rightIcon={<SmallCloseIcon />}
                          colorScheme="red"
                          variant="outline"
                          size="xs"
                          onClick={() => handleRemoveTask(val.id, taskId)}
                        >
                          Remove
                        </Button>
                        <Divider my={1} />
                      </div>
                    ))}
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
