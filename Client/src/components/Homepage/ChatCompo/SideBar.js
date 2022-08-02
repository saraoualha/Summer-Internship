import React from "react";
import { ChatState } from "../../../Context/ChatProvider";
import UserListItem from "./UserAvatar/UserListItem";
import ChatLoading from "./ChatLoading";
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
import SearchIcon from '@mui/icons-material/Search';

const SideBar = () => {
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef();

    const [search, setSearch] = React.useState('');
    const [searchResult, setSearchResult] = React.useState([]);
    const [loadingChat, setLoadingChat] = React.useState();
    const [loading, setLoading] = React.useState(false);
    const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const handleSearch = async () => {
        if (!search) {
            toast({
                title: "Please Enter something in search",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top-left",
            });
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

    const accessChat= async (userId)=>{
        try {
            setLoadingChat(true);

            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const {data}= await axios.post('/api/chat', {userId}, config);
            console.log(chats)

            if(!chats.find((c)=> c._id === data._id)) setChats([data,...chats])
            setSelectedChat(data);
            setLoadingChat(false);
            onClose();
        } catch (error) {
            toast({
                title: "Error fetching the chat",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
        
    };

    return (
        <ChakraProvider>
            <button ref={btnRef} colorScheme="teal" onClick={onOpen}>
                <SearchIcon />
            </button>
            <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
                    <DrawerBody>
                        <Box d="flex" pb={2}>
                            <Input
                                placeholder="Search by name or email"
                                mr={2}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Button style={{marginLeft: '240px'}} onClick={handleSearch}>Go</Button>
                        </Box>
                        {loading ? (
                            <ChatLoading />
                        ) : (
                            searchResult?.map((user) => (
                                <UserListItem
                                  key={user._id}
                                  user={user}
                                  handleFunction={() => accessChat(user._id)}
                                />
                            ))
                        )}
                        {loadingChat && <Spinner ml="auto" d="flex" />}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </ChakraProvider>
    );
}

export default SideBar;
