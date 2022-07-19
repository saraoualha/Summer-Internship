import React from 'react';
import AddIcon from '@mui/icons-material/Add';

const ChatHeader = () => {

    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <div class="navbar-brand" >My Chats</div>
                    
                    <div class="collapse navbar-collapse" id="navbarScroll" style={{marginLeft: '270px'}}>
                    
                        <form class="d-flex" >
                            <AddIcon/>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default ChatHeader;