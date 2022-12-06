/* eslint-disable */
import { Storage } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { searchUsers } from '../../helper/api-calls/cognito-access';
import { getPostsForUser, getPostsKeysForUser } from '../../unholy-abominations/simulatePosts';
import { AcceptButton, AddButton, RejectButton, RemoveButton } from '../helper/friend-buttons';
import Post from '../post-feed/Post';

function Chat(props) {
    const {userInfo} = useOutletContext();
    const postInfo = {key: 'test-1670113549379-437', author: 'test', time: 1670113549379, caption: 'gffgf'}
    const [posts, setPosts] = useState([]);
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
        }).then(resp => console.log(resp)).catch(error => window.alert(`Error uploading file: ${error}`));
    }

    const createTextFiles = async () => {
        const users = (await searchUsers()).Users;
        const nameList = users.map(userResult => {
            return {username: userResult.Username};
        }).map(user => user.username);
        nameList.forEach(async name => {
            const emptyBlob = new Blob([''], {type: 'text/plain'});
            const friends = new File([emptyBlob], `${name}-friends.txt`, {type: 'text/plain'});
            const incoming = new File([emptyBlob], `${name}-incoming.txt`, {type: 'text/plain'});
            const outgoing = new File([emptyBlob], `${name}-outgoing.txt`, {type: 'text/plain'});
            try {
               /*  await Storage.put(`${name}-friends.txt`, friends, {
                    contentType: 'text/plain',
                });
                await Storage.put(`${name}-incoming.txt`, incoming, {
                    contentType: 'text/plain',
                });
                await Storage.put(`${name}-outgoing.txt`, outgoing, {
                    contentType: 'text/plain',
                }); */
                return;
            } catch(error) {
                console.log(error);
            }
        });


    }

    useEffect(() => {
        const fetchPosts = async () => {
            const results = await getPostsForUser(userInfo, 'public');
            setPosts(results);
        };

        fetchPosts();
    }, []); 

    return (
        <>
            <h4>Chat Page</h4>
            {/* <button onClick={() => createTextFiles()}>make</button> */}
            <button onClick={() => request()}>request</button>
            {(posts.length > 0) && posts}
        </>
    );
}

export default Chat;