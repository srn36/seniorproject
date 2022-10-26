import React from "react";
import { Link } from "react-router-dom";

function FriendRow({ username, profilePic, userInfo }) {
    return (
        <tr>
            <td>
                <Link 
                    reloadDocument
                    className='friend'
                    to={`/profile/${username}`}
                    state={{userInfo: userInfo}}
                >
                    <div>
                        <img src={profilePic} alt=''/>
                        <p>{username}</p>
                    </div>          
                </Link>
            </td>
        </tr>
    );
}

export default FriendRow;