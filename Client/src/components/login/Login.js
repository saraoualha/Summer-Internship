import * as React from 'react';
import './Login.css'

import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CommHeader from '../../Assests/Common/CommHeader';



const theme = createTheme();

export default function Login() {

    return (
        <div style={{borderWidth:'50px'}}>
            <div>
                <CommHeader />
            </div>
            <ThemeProvider theme={theme}>

                <Container component="main" maxWidth="xs"  style={{ backgroundColor: '#5AA6ED',borderRadius: '12px',height: '300px' }}>

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
                            <Typography component="h1" variant="h5" style={{ marginLeft: '150px', marginTop: '10px' }}>
                                Login
                            </Typography>
                            <Box component="form" noValidate sx={{ mt: 1 }} >
                            
                                <TextField
                                    margin="normal"
                                    className="input"
                                    label="Email Address"
                                    style={{ backgroundColor: '#F1EFEF' }}
                                >
                                    Email
                                </TextField>
                                <TextField
                                    margin="normal"
                                    className="input"
                                    label="Password"
                                    style={{ backgroundColor: '#F1EFEF' }}
                                >
                                    Email
                                </TextField>
                                <Grid>
                                    <button
                                        margin="normal"
                                        className='comm-button'
                                        //style={{ backgroundColor: '#F1EFEF', borderRadius: '12px', border: 'none', width: '70px', height: '50px', marginLeft: '300px', marginTop: '15px' }}
                                    >
                                        login
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