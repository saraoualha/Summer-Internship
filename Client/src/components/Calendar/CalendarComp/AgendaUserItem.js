import React from 'react';
import axios from "axios";

import UpdateEventModal from './UpdateEventModal';

import { Box, Text } from "@chakra-ui/layout";
import { Avatar } from "@chakra-ui/avatar";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';
import { useToast } from "@chakra-ui/toast";

const UserListItem = ({ Agenda }) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const toast = useToast();
    const deleteHandel = async () => {

        if(Agenda.createdBy !== userInfo._id){
            toast({
                title: "Events can be deleted by the creator only!",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
            const { data } = await axios.delete(
                `/api/events/${Agenda.id}/deleteEvent`,
                config
            );
            toast({
                title: "Events has been deleted!",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            window.location.reload(true)

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
        <Box
            cursor="pointer"
            bg="#E8E8E8"
            _hover={{
                background: "#023C59",
                color: "white",
            }}
            w="100%"
            d="flex"
            alignItems="center"
            color="black"
            px={3}
            py={2}
            mb={2}
            borderRadius="lg"
        >
            
                
            <Box>
                {/* <div style={{display: 'flex', }}> */}
                <UpdateEventModal Agenda={Agenda}><EditIcon  fontSize='small' /></UpdateEventModal>
                <button onClick={()=>{deleteHandel()}}><DeleteIcon  fontSize='small'/></button>
                
                
                {/* </div> */}
                <Text>{Agenda.title}</Text>
                <Text fontSize="xs">
                    <b><u>Starts</u> on the {Agenda.start.split('T')[0]} at {Agenda.start.split('T')[1]} </b>

                    <br />
                    <b><u>Ends</u> on the {Agenda.end.split('T')[0]} at {Agenda.end.split('T')[1]} </b>

                </Text>
                <Text as='i' fontSize='sm'>{Agenda.desc}</Text>

            </Box>
        </Box>
    )
}

export default UserListItem;