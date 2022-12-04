import React from 'react';
import PostAuthorBar from './PostAuthorBar';
import { Divider, TextAreaField } from '@aws-amplify/ui-react';

function PostPreview({ post, captionChange }) {
    
    return (
        <div className='post'>
            <img src={post.image} alt={post.author}/>
            <Divider/>
            <PostAuthorBar author={post.author} preview={true}/>
            <Divider/>
            <TextAreaField
                className='caption-preview'
                label='caption'
                placeholder='Enter caption'
                defaultValue={post.caption}
                onChange={e => captionChange(e)}
                maxLength={50}
                rows={1}
                labelHidden
            />
        </div>
    );        
}

export default PostPreview;