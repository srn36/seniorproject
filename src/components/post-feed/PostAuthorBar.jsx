import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

 function PostAuthorBar(props) {
    const {userInfo, author} = props;

    return (
        <div className="author-bar">
            <Link to={`/profile/${author}`}
                state={{userInfo: userInfo}}
            >
                {author}
            </Link>
            {
                (userInfo.username === author) &&
                <button onClick={_e => {
                    console.log("Edit Post");
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