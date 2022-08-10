import React from "react";
import { ChatState } from "../../Context/ChatProvider";
import AgendaUserItem from './CalendarComp/AgendaUserItem'

import axios from "axios";

import { Box, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import {
    Drawer,
    DrawerBody,
    ChakraProvider,
    DrawerOverlay,
    DrawerHeader,
    DrawerContent,
    Button,
    Input,
    useDisclosure
} from "@chakra-ui/react";

import { useToast } from "@chakra-ui/toast";
import AssignmentIcon from '@mui/icons-material/Assignment';

const AgendaSideBar = ({array}) => {
    
    const { isOpen, onOpen, onClose } = useDisclosure();
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
   

    return (
        <ChakraProvider>
            <AssignmentIcon style={{ marginLeft:'98%', marginTop:'-40px'}} onClick={onOpen}/>
            <Drawer placement="left" size='lg' onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth="1px">{userInfo.name} Agenda</DrawerHeader>
                    <DrawerBody>
                        <Box d="flex" pb={2}>
                           {array?.map((u)=>(
                            <AgendaUserItem  Agenda={u} />
                           ))}
                        </Box>
                        
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </ChakraProvider>
    );
}

export default AgendaSideBar;
