import React from "react";
import { Link } from "react-router-dom";

function FriendRow({ username, profilePic }) {
    return (
        <tr>
            <td>
                <Link className='friend' to={`/profile/${username}`}>
                    <img src={profilePic} alt=''/>
                    <p>{username}</p>              
                </Link>
            </td>
        </tr>
    );
}

export default FriendRow