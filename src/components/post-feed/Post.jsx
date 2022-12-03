/* eslint-disable */
import React, { useEffect, useState } from 'react';
import PostAuthorBar from './PostAuthorBar';
import { Divider } from '@aws-amplify/ui-react';
import { Storage } from 'aws-amplify';

function Post({ userInfo, post, preview = false }) {
    const [postURL, setPostURL] = useState();
    /* useEffect(() => {
        const fetchPost = async () => {
            if(preview) {
                setPostURL(post.image);
            } else {
                setPostURL(await Storage.get(`${post.key}`)); 
            }
        }
        fetchPost();
    }, [post]); */
    
    useEffect(() => {
        setPostURL(post.download_url || post.image);
    }, [post]);

    const deletePost = async (_e) => {
        const s3Key = post.key;
        await Storage.remove(s3Key);
        // Remove post from db
    }
    
    return (
        <div className='post'>
            <img src={postURL} alt={post.author}/>
            <Divider/>
            <PostAuthorBar userInfo={userInfo} author={post.author} deletePost={deletePost} preview={preview}/>
        </div>
    )
        
}

export default Post;