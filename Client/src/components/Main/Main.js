import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import CommHeader from '../../Assests/Common/CommHeader';
import './Main.css'
import Login from '../login/Login';
import { ChatState } from "../../Context/ChatProvider";

import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import { ChakraProvider } from '@chakra-ui/react';



const theme = createTheme();
const Main = () => {

    const navigate = useNavigate();
    //const { user } = ChatState();
    useEffect(() => {
        const user = localStorage.getItem('userInfo');

        if (user) {
            navigate(`/`);
        }
    }, [navigate])

    return (
        <div>
            <div>
                <CommHeader />

            </div>
            <ThemeProvider theme={theme}>
                <Grid container component="main" sx={{ height: '100vh' }} >
                    <CssBaseline />
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={7}
                        sx={{
                            backgroundImage: 'url(https://i.pinimg.com/564x/ba/31/35/ba3135a7bc099da230cccf80755cfac0.jpg)',
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: (t) =>
                                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                    <Grid style={{ backgroundColor: '#D9D9D9' }} item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <ChakraProvider>
                                <ThemeProvider theme={theme}>

                                    <Container component="main" maxWidth="xs" style={{ backgroundColor: '#7993b5', borderRadius: '12px', height: '440px' }}>

                                        <CssBaseline />
                                        <Box
                                            sx={{
                                                marginTop: 8,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <div>
                                                <Login />
                                            </div>
                                        </Box>
                                    </Container>
                                </ThemeProvider>
                            </ChakraProvider>
                        </Box>
                    </Grid>
                </Grid>
            </ThemeProvider>

        </div>
    )
}

export default Main;
