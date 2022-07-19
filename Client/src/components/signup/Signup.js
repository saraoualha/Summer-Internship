import * as React from 'react';
import './Signup.css'

import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CommHeader from '../../Assests/Common/CommHeader';

import { FormLabel } from "@chakra-ui/form-control";


const theme = createTheme();

export default function Signup() {

    return (
        <div>
            <div>
                <CommHeader />
            </div>
            <ThemeProvider theme={theme}>

                <Container component="main" maxWidth="xs" style={{ backgroundColor: '#7993b5', borderRadius: '12px', height: '520px', margintop:'-10px' }}>

                    <CssBaseline />

                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <div  >
                            <Typography component="h1" variant="h5" style={{ marginLeft: '150px', marginTop: '0px' }}>
                                Sign Up
                            </Typography>
                            <Box component="form" noValidate sx={{ mt: 1 }} >
                                <FormLabel>First name</FormLabel>
                                <div style={{ marginTop: '10px' }}></div>
                                <input class="form-control" placeholder='Enter your firstname' style={{ backgroundColor: '#F1EFEF' }}></input>
                                
                                <div style={{ marginTop: '15px' }}></div>
                                
                                <FormLabel>Lastname</FormLabel>
                                <div style={{ marginTop: '10px' }}></div>
                                <input class="form-control" placeholder='Enter your lastname' style={{ backgroundColor: '#F1EFEF' }}></input>
                                
                                <div style={{ marginTop: '15px' }}></div>

                                <FormLabel>Email Address</FormLabel>
                                <div style={{ marginTop: '10px' }}></div>
                                <input class="form-control" placeholder='Enter your Email' style={{ backgroundColor: '#F1EFEF' }}></input>
                                
                                <div style={{ marginTop: '15px' }}></div>
                                
                                <FormLabel>Password</FormLabel>
                                <div style={{ marginTop: '10px' }}></div>
                                <input class="form-control" placeholder='Enter your password' style={{ backgroundColor: '#F1EFEF' }}></input>
                                
                                <div style={{ marginTop: '15px' }}></div>

                                <FormLabel>Confirm Password</FormLabel>
                                <div style={{ marginTop: '10px' }}></div>
                                <input class="form-control" placeholder='Confirm your password' style={{ backgroundColor: '#F1EFEF' }}></input>
                                
                                <Grid>
                                    <button
                                        margin="normal"
                                        className="comm-button"
                                    >
                                        Sign up
                                    </button>
                                </Grid>

                            </Box>
                        </div>
                    </Box>
                </Container>
            </ThemeProvider>
        </div>
    );
}