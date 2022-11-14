import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

 function PostAuthorBar(props) {
    const {userInfo, author, preview} = props;

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

PostAuthorBar.propTypes = {
    userInfo: PropTypes.any.isRequired,
    author: PropTypes.string.isRequired
};

 export default PostAuthorBar;