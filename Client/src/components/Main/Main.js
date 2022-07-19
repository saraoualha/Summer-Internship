import React from 'react';
//import Link from '@mui/material/Link';
import { Link } from 'react-router-dom'

import CommHeader from '../../Assests/Common/CommHeader';

import './Main.css'

import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';

//import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { FormLabel } from "@chakra-ui/form-control";


const theme = createTheme();
const Main = () => {
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
                                        <div  >
                                            <Typography component="h1" variant="h5" style={{ marginLeft: '150px', marginTop: '10px' }}>
                                                Login
                                            </Typography>
                                            <Box component="form" noValidate sx={{ mt: 1 }} >
                                                <FormLabel>Email Address</FormLabel>
                                                <div style={{marginTop:'10px'}}></div>
                                                <input  class="form-control" placeholder='Enter your Email' style={{ backgroundColor: '#F1EFEF' }}></input>
                                                <div style={{marginTop:'25px'}}></div>
                                                <FormLabel>Password</FormLabel>
                                                <div style={{marginTop:'10px'}}></div>
                                                <input  class="form-control" placeholder='Enter your password' style={{ backgroundColor: '#F1EFEF' }}></input>
                                                <Grid>
                                                    
                                                    <button
                                                        margin="normal"
                                                        className="comm-button"
                                                        //style={{ backgroundColor: '#F1EFEF', borderRadius: '12px', border: 'none', width: '70px', height: '35px', marginLeft: '300px', marginTop: '15px', marginBottom: '10px' }}
                                                    >
                                                        login
                                                    </button>

                                                </Grid>
                                                <Grid container>
                                                    <Grid item xs>
                                                        <Link to={"#"} className='link' variant="body2">
                                                            Forgot password?
                                                        </Link>
                                                    </Grid>
                                                    <Grid item>
                                                        <Link to={"/Signup"} className='link' variant="body2">
                                                            {"Don't have an account? Sign Up"}
                                                        </Link>
                                                    </Grid>
                                                </Grid>

                                            </Box>
                                        </div>
                                    </Box>
                                </Container>
                            </ThemeProvider>
                        </Box>
                    </Grid>
                </Grid>
            </ThemeProvider>

        </div>
    )
}

export default Main;

/*
<Grid container>
                <Grid item xs>
                    lalala
                </Grid>
                <Divider orientation="horzantel" flexItem></Divider>
                <Grid fullwidth item xs style={{ backgroundColor: '#5AA6ED', display: 'inline' }}>
                    lalala
                </Grid>
            </Grid>
*/