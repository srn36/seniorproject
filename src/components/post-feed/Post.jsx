/* eslint-disable */
import React, { useEffect, useState } from 'react';
import PostAuthorBar from './PostAuthorBar';
import { Divider, TextAreaField } from '@aws-amplify/ui-react';
import { Storage } from 'aws-amplify';

function Post({ userInfo, post, preview = false, captionChange = () => {} }) {
    const [postURL, setPostURL] = useState();
    useEffect(() => {
        const fetchPost = async () => {
            if(preview) {
                setPostURL(post.image);
            } else {
                setPostURL(await Storage.get(`${post.key}`)); 
            }
        }
        fetchPost();
    }, [post]);
    
    /* useEffect(() => {
        setPostURL(post.download_url || post.image);
    }, [post]); */

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
            <Divider/>
            <TextAreaField
                className={`preview-${preview}`}
                label='caption'
                placeholder='Enter caption'
                defaultValue={post.caption}
                onChange={captionChange}
                maxLength={50}
                rows={1}
                labelHidden
            />
        </div>
    )
        
}

export default Post;