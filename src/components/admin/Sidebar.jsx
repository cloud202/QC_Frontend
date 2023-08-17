import {  List, ListIcon, ListItem } from '@chakra-ui/react'
import { CalendarIcon, ExternalLinkIcon, PlusSquareIcon, ViewIcon } from '@chakra-ui/icons'
import React from 'react'
import { Link ,useLocation} from 'react-router-dom'

const Sidebar = () => {
    const location = useLocation();
    const commonStyles = {
        bg: "gray.300",
        cursor: "pointer",
        borderRadius: "5px"
      };

      const sidebarItems = [
        { label: "New Project Template", route: "/admin/newproject",icon: PlusSquareIcon },
        { label: "View/Update Phases", route: "/admin/phase",icon: ViewIcon },
        { label: "View/Update Modules", route: "/admin/module",icon: ViewIcon },
        { label: "View/Update Task", route: "/admin/task",icon: ViewIcon },
        { label: "3rd Party Solution", route: "/admin/soltuion",icon: ExternalLinkIcon },
        { label: "List Customers", route: "/admin/customer",icon: CalendarIcon },
      ];

  return (
    <List bg="gray.100" borderRight="1px solid" borderColor="gray.400" position="fixed" minH="100vh" p="20px" alignItems="center">
       {
       sidebarItems.map((item, index) => (
        <Link to={item.route} key={index}>
            <ListItem mb='15px' p = '5px' key={index} color={location.pathname === item.route ? "blue.600" : "gray.600"} _hover={commonStyles} >
                <ListIcon as={item.icon}/>
                {item.label}
            </ListItem>
        </Link>
       ))}
    </List> 
  )
}

export default Sidebar