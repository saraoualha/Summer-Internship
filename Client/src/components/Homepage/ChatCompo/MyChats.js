import React, { useState, useEffect } from "react";
import axios from "axios";

import { ChatState } from "../../../Context/ChatProvider";
import ChatLoading from "./ChatLoading";
import { getSender, getPic } from '../../../Config/ChatLogics'
import '../../../App.css';
import '../Homepage.css'
import ChatHeader from '../../../Assests/Common/ChatHeader';
import grpPic from '../../../Assests/grppic.jpg'

import { useToast } from "@chakra-ui/toast";
import { Box, Stack, Text } from "@chakra-ui/layout";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';



const MyChats = ({ fetchAgain }) => {
    const [loggedUser, setLoggedUser] = useState();
    const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();
    const toast = useToast();



    const fetchChats = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.get("/api/chat", config);
            setChats(data);
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to Load the chats",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }

    };
    useEffect(() => {
        setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
        fetchChats();

    }, [fetchAgain]);




    return (
        <Box
            d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
            flexDir="column"
            alignItems="center"
            p={3}
            bg="white"
            w={{ base: "100%", md: "31%" }}
            borderRadius="lg"
            borderWidth="1px"
        >
            <ChatHeader />
            <div>
                <Accordion defaultExpanded disableGutters>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Group Chats</Typography>
                    </AccordionSummary>
                    <AccordionDetails className="group_chats">
                        <Typography>
                            <Box
                                d="flex"
                                flexDir="column"
                                p={3}
                                bg="#F8F8F8"
                                w="100%"
                                h="100%"
                                borderRadius="lg"
                                overflowY="hidden"
                            >

                                {chats ? (
                                    <Stack overflowY="scroll">
                                        {chats.map((chat) => {
                                            if (chat.isGroupChat) {
                                                return (<Box
                                                    onClick={() => setSelectedChat(chat)}
                                                    cursor="pointer"
                                                    bg={selectedChat === chat ? "#023C59" : "#E8E8E8"}
                                                    color={selectedChat === chat ? "white" : "black"}
                                                    px={3}
                                                    py={2}
                                                    borderRadius="10px"
                                                    key={chat._id}
                                                >
                                                    <Text>
                                                        <IconButton sx={{ p: 1 }}>
                                                            <Avatar
                                                                sx={{ width: 30, height: 30 }}
                                                                alt={chat.chatName} src={grpPic}
                                                            />
                                                        </IconButton>
                                                        {chat.chatName}
                                                    </Text>
                                                    {chat.latestMessage && (
                                                        <Text fontSize="xs">
                                                            <b>{chat.latestMessage.sender.name} : </b>
                                                            {chat.latestMessage.content.length > 50
                                                                ? chat.latestMessage.content.substring(0, 51) + "..."
                                                                : chat.latestMessage.content}
                                                        </Text>
                                                    )}
                                                </Box>)
                                            }
                                        }

                                        )}
                                    </Stack>
                                ) : (
                                    <ChatLoading />
                                )}
                            </Box>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion defaultExpanded disableGutters>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography>Private Chats</Typography>
                    </AccordionSummary>
                    <AccordionDetails className="group_chats">
                        <Typography>
                            <Box
                                d="flex"
                                flexDir="column"
                                p={3}
                                bg="#F8F8F8"
                                w="100%"
                                h="100%"
                                borderRadius="lg"
                                overflowY="hidden"
                            >

                                {chats ? (
                                    <Stack overflowY="scroll">
                                        {chats.map((chat) => {
                                            if (!chat.isGroupChat) {
                                                return (<Box
                                                    onClick={() => setSelectedChat(chat)}
                                                    cursor="pointer"
                                                    bg={selectedChat === chat ? "#023C59" : "#E8E8E8"}
                                                    color={selectedChat === chat ? "white" : "black"}
                                                    px={3}
                                                    py={2}
                                                    borderRadius="10px"
                                                    key={chat._id}
                                                >
                                                    <Text>
                                                        <IconButton sx={{ p: 1 }}>
                                                            <Avatar
                                                                sx={{ width: 30, height: 30 }}
                                                                alt={chat.chatName} src={getPic(loggedUser, chat.users)}
                                                            />
                                                        </IconButton>
                                                        {getSender(loggedUser, chat.users)}
                                                    </Text>
                                                    {chat.latestMessage && (
                                                        <Text fontSize="xs">
                                                            <b>{chat.latestMessage.sender.name} : </b>
                                                            {chat.latestMessage.content.length > 50
                                                                ? chat.latestMessage.content.substring(0, 51) + "..."
                                                                : chat.latestMessage.content}
                                                        </Text>
                                                    )}
                                                </Box>)
                                            }
                                        }

                                        )}
                                    </Stack>
                                ) : (
                                    <ChatLoading />
                                )}
                            </Box>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>

        </Box>
    )
}

export default MyChats;