import { Box, Table, Thead, Tbody, Tr, Th, Td, Text } from "@chakra-ui/react";
import React from "react";

const PhaseComponent = ({ phase }) => {
  return (
    <Tr>
      <Td>
        <Text>{phase.phaseName}</Text>
      </Td>
      <Td>
        {phase.modules.map((module) => (
          <div key={module.moduleId}>
            <Text fontSize="lg" fontWeight="semibold" m='4px'>
              {module.moduleName}
            </Text>
            <ol>
              {module.tasks.map((task) => (
                <li key={task.taskId}>{task.taskName}</li>
              ))}
            </ol>
          </div>
        ))}
      </Td>

      <Td>
        SOlution
      </Td>
    </Tr>
  );
};

const Summary = ({summaryData}) => {
  return (
    <>
    <Text mb='10px' p='5px' bg='gray.50' maxW='680px' borderRadius='5px' fontSize={{ base: '15px', sm: '26px',md: '30px', lg: '30px' }} color="#445069">Template Name : {summaryData.template_name}</Text>
    <Box p={4}>
      <Table variant="simple" maxW='680px'>
        <Thead>
          <Tr>
            <Th>Phase Name</Th>
            <Th>Modules & Tasks</Th>
          </Tr>
        </Thead>
        <Tbody>
          {summaryData && summaryData.phases.map((phase) => (
            <PhaseComponent key={phase.phaseId} phase={phase} />
          ))}
        </Tbody>
      </Table>
    </Box>
    </>
  );

};

export default Summary;
