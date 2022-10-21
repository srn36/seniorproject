import React from 'react';

const Post = ({ post } ) => {
    return (
        <div className='post'>
            <img src={post.download_url} alt={post.author} />
            <h4>{post.author}</h4> {/*eventually replace with a bar containing post info (likes? description?)*/}
        </div>
    );
}

export default Post