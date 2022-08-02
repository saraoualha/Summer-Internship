import React from "react";

import { IconButton } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import { ViewIcon } from '@chakra-ui/icons';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Avatar from '@mui/material/Avatar';

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

const ProfileModel = ({ user, children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            {
                children ? (<span onClick={onOpen}>{children}</span>) : (
                    <IconButton
                        pos="absolute" right="3"
                        d={{ base: "flex" }}
                        icon={<ViewIcon />}
                        onClick={onOpen}
                    />
                )
            }
            <Modal
                open={isOpen}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div>
                    <IconButton sx={{ p: 0 }} style={{border: '0px', bgcolor: 'background.paper'}}>
                        <Avatar alt={user.name} src={user.pic} />
                    </IconButton>
                    <Typography id="modal-modal-title" variant="h6" component="h2" style={{marginLeft:'55px', marginTop:'-35px'}}>

                        {user.name}
                    </Typography>
                    </div>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {user.email}
                    </Typography>
                </Box>
            </Modal>
        </>
    );
}

export default ProfileModel