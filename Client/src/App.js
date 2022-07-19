import React from 'react'; 
import { BrowserRouter, Routes , Route} from 'react-router-dom';
import Signup from './components/signup/Signup';
import Login from './components/login/Login';
import Homepage from './components/Homepage/Homepage';

import Main from './components/Main/Main';
const App=()=>{
    return(
        <BrowserRouter>
            <Routes>
                <Route exact path ="/" element ={<Main/>}/>
                <Route exact path ="/login" element ={<Login/>}/>
                <Route exact path ="/signup" element ={<Signup/>}/>
                <Route exact path ="/homepage" element ={<Homepage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;