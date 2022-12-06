/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { searchUsers } from '../../helper/api-calls/cognito-access';
import { getPostsKeysForUser } from '../../unholy-abominations/simulatePosts';
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

    const textFileTest = () => {
        
    }

    useEffect(() => {
        const fetchPosts = async () => {
            const postKeys = (await getPostsKeysForUser(userInfo.username));
            console.log(postKeys);
            const results = postKeys.map(pKey => {
                const firstSpace = pKey.indexOf(' ');
                let postData = {};
                if(firstSpace > -1) {
                    const postKey = pKey.substring(0, firstSpace);
                    const caption = pKey.substring(firstSpace + 1);
                    postData = {key: postKey, caption: caption};
                } else {
                    postData = {key: pKey};
                }
                return <Post key={pKey} userInfo={userInfo} post={postData}/>
            });
            setPosts(results);
        };

        fetchPosts();
    }, []); 

    return (
        <>
            <h4>Chat Page</h4>
            <button onClick={() => textFileTest()}>test text</button>
            <button onClick={() => request()}>request</button>
            {(posts.length > 0) && posts}
        </>
    );
}

export default Chat;