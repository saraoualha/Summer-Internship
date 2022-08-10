import React, { useState, useEffect } from 'react';
import Datetime from 'react-datetime';
import axios from 'axios';


import './CalendarPage.css';
import AddEventModal from './CalendarComp/AddEventModal';
import { ChatState } from '../../Context/ChatProvider'

import FullCalendar from '@fullcalendar/react'
import dayGridLayout from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import { useDisclosure, Button } from '@chakra-ui/react'
import { useToast } from "@chakra-ui/toast";
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';

import HeaderConn from '../../Assests/Common/HeaderConn/HeaderConn';
import AgendaSideBar from './AgendaSideBar';


let array = []
const CalendarPage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { user, events, setEvents, userEvents, setUserEvents } = ChatState();
    const [modalOpen, setModalOpen] = useState(true);
    const toast = useToast();
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));


    const calendarRef = React.useRef(null)

    const fetchEvents = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const { data } = await axios.get("/api/events", config)

            setEvents(data)
            fetchUserEvents(data)
            
        } catch (error) {
            console.log(error)
            toast({
                title: "Error Occured!",
                description: "Failed to Load the events",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }

    }

    const fetchUserEvents = async (events) => {
        if (events) {

            await Promise.all(events.map((event) => {
                if (event.sharedWith.find((u) => userInfo._id == u)) {
                    array.push({ id: event._id, title: event.EventName, start: event.startsAt, end: event.endsAt , desc: event.description, createdBy: event.createdBy, sharedWith: event.SharedWith })
                }
            }))
            setUserEvents(array)
        }
    }

    useEffect(() => {
        fetchEvents()
    }, []);

    //onEventAdded={ event=>onEventAdded(event)}
    return (
        <div>
            <HeaderConn />
            <Box sx={{ flexGrow: 0 }} >
                <AddEventModal >
                    <form class="d-flex" >
                        <AddIcon />
                    </form>
                </AddEventModal>
                <AgendaSideBar array={array}/>
            </Box>
            <div style={{ position: "relative", zIndex: 0 }}>
                <FullCalendar
                    ref={calendarRef}
                    plugins={[dayGridLayout, interactionPlugin]}
                    initialView="dayGridMonth"
                    height='700px'
                    events={userEvents}
                //onClick={console.log(userEvents)}
                />
            </div>
        </div>
    )
}

export default CalendarPage;
