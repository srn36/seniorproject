import React from 'react';
import PropTypes from 'prop-types';
import PostAuthorBar from './PostAuthorBar';

function Post(props) {
    const {userInfo, post} = props;

    return (
        //<div className='App-logo' >
        <div className='post'>
            <img src={post.download_url} alt={post.author}/>
            <PostAuthorBar userInfo={userInfo} author={post.author}/>
        </div>
        //</div>
    );
}

Post.propTypes ={
    userInfo: PropTypes.any.isRequired,
    post: PropTypes.any.isRequired
};

export default Post;