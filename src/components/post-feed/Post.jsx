/* eslint-disable */
import React, { useEffect, useMemo, useState } from 'react';
import PostAuthorBar from './PostAuthorBar';
import { Divider } from '@aws-amplify/ui-react';
import { Storage } from 'aws-amplify';

function Post({ userInfo, post, preview = false }) {
    const [postURL, setPostURL] = useState(null);
    /* if(preview) {
        setPostURL(post.image);
    } else {
       Storage.get(`${post.key}`).then(url =>
            setPostURL(url)
        ).catch(e => console.log('Error retrieving post: ', e)); 
    } */
    
    useEffect(() => {
        setPostURL(post.download_url || post.image);
    }, []);

    const deletePost = async (_e) => {
        const s3Key = post.key;
        await Storage.remove(s3Key);
        // Remove post from db
    }
    
    return useMemo(() => {
        return (
            !!postURL &&
            <div className='post'>
                <img src={postURL} alt={post.author}/>
                <Divider/>
                <PostAuthorBar userInfo={userInfo} author={post.author} deletePost={deletePost} preview={preview}/>
            </div>
        );
    }, [postURL]);
}

export default Post;