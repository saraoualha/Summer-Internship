import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { IconButton } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import { ViewIcon } from '@chakra-ui/icons';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { ChatState } from '../../../Context/ChatProvider';
import { getSender } from '../../../Config/ChatLogics';

import {
    MenuItem,
    Menu,
    MenuButton,
    MenuDivider,
    MenuList,
} from "@chakra-ui/menu";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '12px',
    border: '0px solid #000',
    boxShadow: 24,
    p: 4,
};

const NotificationModel = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { user, notification, setNotification, setSelectedChat } = ChatState();


    return (
        <ChakraProvider>
            <span onClick={onOpen}>{children}</span>
            <Modal
                open={isOpen}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Menu>
                        <MenuList pl={2}>
                            {!notification.length && "No New Messages"}
                            {notification.map((notif) => (
                                <MenuItem
                                    key={notif._id}
                                    onClick={() => {
                                        setSelectedChat(notif.chat);
                                        setNotification(notification.filter((n) => n !== notif));
                                    }}
                                >
                                    {notif.chat.isGroupChat
                                        ? `New Message in ${notif.chat.chatName}`
                                        : `New Message from ${getSender(user, notif.chat.users)}`}
                                </MenuItem>
                            ))}
                        </MenuList>
                    </Menu>
                </Box>
            </Modal>
        </ChakraProvider>
    );
}

export default NotificationModel;