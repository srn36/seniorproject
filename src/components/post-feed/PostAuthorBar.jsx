import React from 'react';
import { Link } from 'react-router-dom';

 function PostAuthorBar({ userInfo, author, deletePost, preview }) {
    return (
        <span className={`author-bar-${preview}`}>
            <Link to={`/profile/${author}`} reloadDocument>
                {author}
            </Link>
            {
                (userInfo.username === author) &&
                <button onClick={deletePost}>
                    Delete Post
                </button>
            }
        </span>
    );
 }

 export default PostAuthorBar;