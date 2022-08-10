import React from 'react';
import axios from "axios";
import { useState } from "react";

import { ChatState } from '../../../Context/ChatProvider';
import UserListItem from '../../Homepage/ChatCompo/UserAvatar/UserListItem';
import UserBadgeItem from '../../Homepage/ChatCompo/UserAvatar/UserBadgeItem';
import '../CalendarPage.css'

import {
    Text,
    Modal,
    ChakraProvider,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    FormControl,
    Input,
    useToast,
    Box,
} from "@chakra-ui/react";

const UpdateEventModal = ({ children, Agenda }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const [eventName, setEventName] = useState(Agenda.title);
    const [eventDescription, setEventDescription] = useState(Agenda.desc);
    const [start, setStart] = useState(Agenda.start);
    const [end, setEnd] = useState(Agenda.end);
    const [selectedUsers, setSelectedUsers] = useState(Agenda.sharedWith); // the users that the event will be shared with
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const { user, events, setEvents } = ChatState();

    const handelEdit = async () => {
        if (!Agenda.title || !Agenda.start) {
            toast({
                title: "The event must have a name and a start date",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            return;
        }
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.put(
                `/api/events/${Agenda.id}/updateEvent`,
                //Agenda.id,
                {
                    eventId:Agenda.id, 
                    name: eventName,
                    description: eventDescription,
                    //sharedWith: selectedUsers,
                    //isSharedEvent: selectedUsers.length > 1,
                    start: start,
                    end: end
                },
                config
            );
            console.log(data)
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        }
    }

    return (
        <ChakraProvider>
            <span onClick={onOpen}>{children}</span>
            <Modal onClose={onClose} isOpen={isOpen} isCentered scrollBehavior='inside'>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        fontSize="35px"
                        fontFamily="Work sans"
                        d="flex"
                        justifyContent="center"
                    >
                        Update Event
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody d="flex" flexDir="column" alignItems="center">
                        <FormControl>
                            <Text mb='8px'>Event Name: </Text>
                            <Input
                                placeholder="Event Name"
                                value={eventName}
                                mb={3}
                                onChange={(e) => { setEventName(e.target.value) }}
                            />
                        </FormControl>
                        <FormControl>
                            <Text mb='8px'>Event description: </Text>
                            <Input
                                placeholder="Event description"
                                value={eventDescription}
                                mb={3}
                                onChange={(e) => setEventDescription(e.target.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <Text mb='8px'>Beginning: </Text>
                            <Input
                                //placeHolder="Select Date and Time"
                                size="md"
                                value={start}
                                mb={3}
                                type="datetime-local"
                                onChange={(e) => setStart(e.target.value)}
                            />

                        </FormControl>
                        <FormControl>
                            <Text mb='8px'>End: </Text>
                            <Input
                                //placeHolder="Select Date and Time"
                                value={end}
                                size="md"
                                mb={3}
                                type="datetime-local"
                                onChange={(e) => setEnd(e.target.value)}
                            />

                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            onClick={()=>{handelEdit(); window.location.reload(true);}}
                        //style={{ position: 'absolute', marginLeft: '100px' }}
                        >
                            Update Event
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </ChakraProvider>
    )
}

export default UpdateEventModal