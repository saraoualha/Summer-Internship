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


const AddEventModal = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const [eventName, setEventName] = useState();
    const [eventDescription, setEventDescription] = useState();
    const [start, setStart] = useState();
    const [end, setEnd] = useState();
    const [selectedUsers, setSelectedUsers] = useState([]); // the users that the event will be shared with
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const { user, events, setEvents } = ChatState();


    const handleDelete = (delUser) => {
        setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
    };
    const handleGroup = (userToAdd) => {
        if (selectedUsers.includes(userToAdd)) {
            toast({
                title: "User already added",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            return;
        }

        setSelectedUsers([...selectedUsers, userToAdd]);
    };

    const handleSearch = async (query) => {
        setSearch(query);
        if (!query) {
            return;
        }

        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.get(`/api/user?search=${search}`, config);
            console.log(data);
            setLoading(false);
            setSearchResult(data);
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to Load the Search Results",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    };

    const handleSubmit=async()=>{
        if(!eventName || !start) {
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
            const {data} = await axios.post(
                `/api/events`,
                {
                    name: eventName,
                    description: eventDescription,
                    sharedWith: JSON.stringify(selectedUsers.map((u) => u._id)),
                    start: start,
                    end: end,
                },
                config
            );
            setEvents([data,...events])
            onClose()
            toast({
                title: "New Event Created!",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        } catch (error) {
            toast({
                title: "Failed to Create Event!",
                description: error.response.data,
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
                        Add a new event
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody d="flex" flexDir="column" alignItems="center">
                        <FormControl>
                            <Text mb='8px'>Event Name: </Text>
                            <Input
                                placeholder="Event Name"
                                mb={3}
                                onChange={(e) => setEventName(e.target.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <Text mb='8px'>Event description: </Text>
                            <Input
                                placeholder="Event description"
                                mb={3}
                                onChange={(e) => setEventDescription(e.target.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <Text mb='8px'>Beginning: </Text>
                            <Input
                                //placeHolder="Select Date and Time"
                                size="md"
                                mb={3}
                                type="datetime-local"
                                onChange={(e) => setStart(e.target.value)}
                            />

                        </FormControl>
                        <FormControl>
                            <Text mb='8px'>End: </Text>
                            <Input
                                //placeHolder="Select Date and Time"
                                size="md"
                                mb={3}
                                type="datetime-local"
                                onChange={(e) => setEnd(e.target.value)}
                            />

                        </FormControl>
                        <FormControl>
                            {/* win ythahar e te chosen users m res mte3 e recherche */}
                            <Text mb='8px'>Share with:  {selectedUsers.map((u) => (
                                <UserBadgeItem
                                    key={u._id}
                                    user={u}
                                    handleFunction={() => handleDelete(u)}
                                />
                            ))} </Text>
                            <Input
                                placeholder="Add Users"
                                mb={1}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        </FormControl>
                        <Box w="100%" d="flex" flexWrap="wrap">
                            {/* win ythahar e te chosen users m res mte3 e recherche */}
                            {/* {selectedUsers.map((u) => (
                                <UserBadgeItem
                                    key={u._id}
                                    user={u}
                                    handleFunction={() => handleDelete(u)}
                                />
                            ))} */}
                        </Box>
                        {/* win ythahar e res mte3 e recherche */}

                        {loading ? (
                            <div>Loading...</div>
                        ) : (
                            searchResult
                                ?.slice(0, 4)
                                .map((user) => (

                                    <UserListItem
                                        key={user._id}
                                        user={user}
                                        handleFunction={() => handleGroup(user)}
                                    />
                                ))
                        )}
                        
                    </ModalBody>
                    <ModalFooter>
                    <Button 
                        onClick={()=>{
                            handleSubmit();
                            window.location.reload(true);
                        }} 
                        //style={{position: 'absolute', marginLeft:'100px'}}
                        >
                            Create Event
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </ChakraProvider>
    )
}

export default AddEventModal