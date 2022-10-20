import React from "react";
import { Link } from "react-router-dom";

function FriendRow({ username, profilePic, userInfo }) {
    return (
        <tr>
            <td>
                <Link className='friend' to={`/profile/${username}`} state={{userInfo: userInfo}}>
                    <img src={profilePic} alt=''/>
                    <p>{username}</p>              
                </Link>
            </td>
        </tr>
    );
}

export default FriendRow