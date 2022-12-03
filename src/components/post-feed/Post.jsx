/* eslint-disable */
import React, { useEffect, useMemo, useState } from 'react';
import PostAuthorBar from './PostAuthorBar';
import { Divider } from '@aws-amplify/ui-react';
import { Storage } from 'aws-amplify';

function Post({ userInfo, post, preview = false }) {
    const [postURL, setPostURL] = useState(null);
    /* Storage.get(`${post.image}`).then(url =>
        setPostURL(url)
    ); */
    useEffect(() => {
        setPostURL(post.download_url || post.image);
    }, []);
    
    return useMemo(() => {
        return (
            !!postURL &&
            <div className='post'>
                <img src={postURL} alt={post.author}/>
                <Divider/>
                <PostAuthorBar userInfo={userInfo} author={post.author} preview={preview}/>
            </div>
        );
    }, [postURL]);
}

export default Post;