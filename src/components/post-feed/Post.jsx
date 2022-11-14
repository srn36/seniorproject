import React from 'react';
import PostAuthorBar from './PostAuthorBar';
import { Divider } from '@aws-amplify/ui-react';

function Post({ userInfo, post, preview = false }) {
    return (
        <div className='post'>
            <img src={post.download_url || post.image} alt={post.author}/>
            <Divider orientation='horizontal' style={{marginTop: '2px', marginTBottom: '2px'}}/>
            <PostAuthorBar userInfo={userInfo} author={post.author} preview={preview}/>
        </div>
    );
}

export default Post;