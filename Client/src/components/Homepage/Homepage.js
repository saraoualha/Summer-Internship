import React, { useState } from "react";

import HeaderConn from "../../Assests/Common/HeaderConn/HeaderConn";
import { ChatState } from '../../Context/ChatProvider'
import MyChats from "./ChatCompo/MyChats";
import ChatBox from "./ChatCompo/ChatBox";

import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'


const theme = createTheme();
const components = {
    Drawer: {
      variants: {
        alwaysOpen: {
          parts: ["dialog, dialogContainer"],
          dialog: {
            pointerEvents: "auto"
          },
          dialogContainer: {
            pointerEvents: "none"
          }
        }
      }
    }
  };
  
  const themeC = extendTheme({
    components
  });


const Homepage = () => {
    const { user } = ChatState()
    const  [fetchAgain, setFetchAgain]=useState(false);
    
    return (
        <div>
            {user && <HeaderConn />}
            {/* <HeaderConn/> */}
            < ChakraProvider theme={themeC}>
                <ThemeProvider theme={theme}>
                    <Grid container component="main" sx={{ height: '90vh' }}>
                        <CssBaseline />
                        <Grid
                            item
                            xs={10}
                            sm={4}
                            md={4}
                        >
                            {user && <MyChats fetchAgain={fetchAgain} />}
                            {/* <MyChats /> */}
                        </Grid>
                        <Grid item xs={30} sm={8} md={8} component={Paper} elevation={6} square style={{height: '100%'}}>
                            {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
                            {/* <ChatBox /> */}
                        </Grid>
                    </Grid>
                </ThemeProvider>
            </ChakraProvider>
        </div>
    )
}

export default Homepage;