import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { acceptFriendRequest, rejectFriendRequest } from "../../helper/api-calls/friend";

function FriendRequestRow({ username, profilePic, userInfo }) {
    const [row, setRow] = useState();

    useEffect(() => {
        setRow(
            <tr>
                <td>
                    <Link className='friend' to={`/profile/${username}`}>
                        <div>
                            <img src={profilePic} alt=''/>
                            <p>{username}</p>
                        </div>
                        <div>
                            <button onClick={e => {
                                e.preventDefault();
                                acceptFriendRequest(username, userInfo.username);
                                setRow();
                            }}>
                                Accept
                            </button>
                            <button onClick={e => {
                                e.preventDefault();
                                rejectFriendRequest(username, userInfo.username);
                                setRow();
                            }}>
                                Reject
                            </button> 
                        </div>        
                    </Link>
                </td>
            </tr>
        );
    }, [username, profilePic, userInfo]);

    return row;
}

export default FriendRequestRow;