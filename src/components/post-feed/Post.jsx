import React from 'react';
import PropTypes from 'prop-types';
import PostAuthorBar from './PostAuthorBar';
import { Divider } from '@aws-amplify/ui-react';

function Post(props) {
    const {userInfo, post} = props;
    const preview = props.preview || false;

    return (
        <div className='post'>
            <img src={post.download_url || post.image} alt={post.author}/>
            <Divider orientation='horizontal' style={{marginTop: '2px', marginTBottom: '2px'}}/>
            <PostAuthorBar userInfo={userInfo} author={post.author} preview={preview}/>
        </div>
    );
}

Post.propTypes ={
    userInfo: PropTypes.any.isRequired,
    post: PropTypes.any.isRequired
};

export default Post;