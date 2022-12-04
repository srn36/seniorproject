/* eslint-disable */
import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { searchUsers } from '../../helper/api-calls/cognito-access';
import { AcceptButton, AddButton, RejectButton, RemoveButton } from '../helper/friend-buttons';
import Post from '../post-feed/Post';

function Chat(props) {
    const {userInfo} = useOutletContext();
    const postInfo = {key: 'test-1670113549379-437', author: 'test', time: 1670113549379, caption: ''}
    
    return (
        <>
            <h4>Chat Page</h4>
            <span>
                <AcceptButton/>
                <RejectButton/>
                <AddButton/>
                <RemoveButton/>
            </span>
            <Post userInfo={userInfo} post={postInfo}/>
        </>
    );
}

export default Chat;