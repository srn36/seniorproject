import React from 'react';
import { Link } from 'react-router-dom';

 function PostAuthorBar({ author, time, preview }) {
    const dateToText = (date) => {
        const postedMonth = date.getMonth() + 1;
        const postedDay = date.getDate();
        const postedYear = date.getFullYear();
        return `${postedMonth}/${postedDay}/${postedYear}`;
    }

    const currentDate = new Date();
    const postDate = new Date(time || 1);
    const dateText = preview ? dateToText(currentDate) : dateToText(postDate);

    return (
        <span className={`author-bar-${preview}`}>
            <Link to={`/profile/${author}`} reloadDocument>
                {author}
            </Link>
            {dateText}
        </span>
    );
 }

 export default PostAuthorBar;