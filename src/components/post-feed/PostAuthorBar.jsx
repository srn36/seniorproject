import React from 'react';
import { Link } from 'react-router-dom';

 function PostAuthorBar({ userInfo, author, preview }) {
    return (
        <div className={`author-bar-${preview}`}>
            <Link reloadDocument to={`/profile/${author}`}>
                {author}
            </Link>
            {
                (userInfo.username === author) &&
                <button onClick={_e => {
                    console.log('Edit Post');
                }}>
                    Edit Post
                </button>
            }
        </div>
    );
 }

 export default PostAuthorBar;