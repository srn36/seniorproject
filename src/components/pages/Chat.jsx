/* eslint-disable */
import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { searchUsers } from '../../helper/api-calls/cognito-access';
import Post from '../post-feed/Post';

function Chat(props) {
    const {userInfo} = useOutletContext();
    const postInfo = {key: 'test-1670103409542-793', author: 'test', time: 1670103409542, caption: 'fsidbuisvlfdbva'}
    return (
        <>
            <h4>Chat Page</h4>
            <Post userInfo={userInfo} post={postInfo}/>
        </>
    );
}

export default Chat;