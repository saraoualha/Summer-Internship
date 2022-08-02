import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/signup/Signup';
import Login from './components/login/Login';
import Homepage from './components/Homepage/Homepage';
import Main from './components/Main/Main';
import ChatProvider from './Context/ChatProvider';

const App = () => {
    return (
        
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Main />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/signup" element={<Signup />} />
                    <Route exact path="/homepage/:id" element={<ChatProvider><Homepage /></ChatProvider>} />
                </Routes>
            </BrowserRouter>
       

    );
}

export default App;