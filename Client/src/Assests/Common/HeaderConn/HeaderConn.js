import * as React from 'react';
import { Link } from 'react-router-dom'
import axios from "axios";
import Modal from 'react-modal';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { useToast} from "@chakra-ui/react";


import './HeaderConn.css';
import { ChatState } from '../../../Context/ChatProvider';
import ProfileModel from '../../../components/Homepage/ProfileModel/ProfileModel';

import logo from '../../logo.png'
import SideBar from '../../../components/Homepage/ChatCompo/SideBar';

Modal.setAppElement('#root')

const HeaderConn = () => {
    const toast = useToast();
    /************************************************************************* */
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    /*************************************************************************** */
    const { user} = ChatState();
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    let val=localStorage.getItem('UserId');
    let id=  val.substr(1,val.length-2)

    const logout = async () => {

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    "Content-type": "application/json",
                },
            };
            const { data } = await axios.put(
                `/api/user/logout`,
                {
                    userId: userInfo._id,
                },
                config
            );
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
        <AppBar title={<img src="..\Assests\logo-removebg-preview.png" alt="" />} position="static" style={{ backgroundColor: '#023C59' }} >
            <Container maxWidth="xl">
                <Toolbar disableGutters>

                    <Box

                        component="img"
                        sx={{
                            height: 64,

                        }}
                        alt="CU"
                        src={logo}
                    />
                    <Link to={`/homepage/${id}`}>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                        styles={{ position: 'Center' }}
                    >
                        ChatUp
                    </Typography>
                    </Link>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >

                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                        </Menu>
                    </Box>


                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        ChatUp
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>

                        <SideBar />
                        <Tooltip title='Click for settings '>
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt={userInfo.name} src={userInfo.pic} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <ProfileModel user={user}>
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Typography type='button' textAlign="center" data-bs-toggle="modal" data-bs-target="#exampleModal" >Profile</Typography>
                                </MenuItem>
                            </ProfileModel>
                            <MenuItem onClick={handleCloseUserMenu}>
                                <a target="_blank" href="http://localhost:3030/"><Typography textAlign="center">VideoCall</Typography></a>
                            </MenuItem>
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Link className='link' to={`/Calendar`}><Typography textAlign="center">Plan Event</Typography></Link>
                            </MenuItem>
                            <MenuItem onClick={(e) => { handleCloseUserMenu(); localStorage.clear(); logout()}}>
                                <Link className='link' to={`/`}><Typography textAlign="center">Logout</Typography></Link>
                            </MenuItem>
                        </Menu>
                    </Box>

                </Toolbar>

            </Container>
        </AppBar>
    );
};
export default HeaderConn;