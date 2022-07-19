import React from "react";
import HeaderConn from "../../Assests/Common/HeaderConn/HeaderConn";
import ChatHeader from '../../Assests/ChatHeader';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme();

const Homepage = () => {
    return (
        <div>
            <HeaderConn />
            <ThemeProvider theme={theme}>
                <Grid container component="main" sx={{ height: '100vh' }}>
                    <CssBaseline />
                    <Grid
                        item
                        xs={10}
                        sm={4}
                        md={4}
                        
                    >
                        <ChatHeader />
                    </Grid>
                    <Grid item xs={20} sm={8} md={8} component={Paper} elevation={6} square>
                        <div>opened up chat</div>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </div>
    )
}

export default Homepage;