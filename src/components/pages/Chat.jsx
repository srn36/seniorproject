/* eslint-disable */
import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { searchUsers } from '../../helper/api-calls/cognito-access';
import { AcceptButton, AddButton, RejectButton, RemoveButton } from '../helper/friend-buttons';
import Post from '../post-feed/Post';

function Chat(props) {
    const {userInfo} = useOutletContext();
    const postInfo = {key: 'test-1670113549379-437', author: 'test', time: 1670113549379, caption: 'gffgf'}

    const showPost = <Post userInfo={userInfo} post={postInfo}/>;

    const request = () => {
        const postData = {
            username: 'username',
            password: 'password',
            firstname: 'firstname',
            lastname: 'lastname',
            email: 'zty@case.edu',
            biography: 'biography',
            birthday: '2001-08-15'
        };
    
        const body = JSON.stringify(postData);
    
        fetch('https://2b3c-129-22-1-26.ngrok.io/users/', {
            method: 'post',
            headers: {
                contentType: 'application/json'
            },
            body: body
        }).then(reps => console.log(resp)).catch(error => window.alert(`Error uploading file: ${error}`));
    }

    return (
        <>
            <h4>Chat Page</h4>
            
            <button onClick={() => request()}>request</button>
        </>
    );
}

export default Chat;