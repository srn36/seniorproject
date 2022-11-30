import React from 'react';
import { searchUsers } from '../../helper/api-calls/cognito-access';

function Chat(props) {
    return (
        <>
            <h4>Chat Page</h4>
            <button onClick={_e => searchUsers()}>test</button>
        </>
    );
}

export default Chat;