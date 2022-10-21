import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { acceptFriendRequest, rejectFriendRequest } from "../../helper/api-calls/friend";

function FriendRequestRow({ username, profilePic, userInfo }) {
    const [row, setRow] = useState();

    useEffect(() => {
        setRow(
            <tr>
                <td>
                    <Link className='friend'
                        style={{justifyContent: 'space-between', display: 'flex'}} 
                        to={`/profile/${username}`} 
                        state={{userInfo: userInfo}}
                    >
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <img src={profilePic} alt=''/>
                            <p>{username}</p>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row'}}>
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

export default FriendRequestRow