import React from "react";
import { Link } from "react-router-dom";

function FriendRequestRow({ username, profilePic, userInfo }) {
    return (
        <tr>
            <td>
                <Link className='friend'
                    style={{justifyContent: 'space-between', display: 'flex'}} 
                    to={`/profile/${username}`} 
                    state={{userInfo: userInfo}}
                >
                    <div>
                        <img src={profilePic} alt=''/>
                        <p>{username}</p>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <button onClick={e => {
                            e.preventDefault();
                            console.log('Accept friend request');
                        }}>
                            Accept
                        </button>
                        <button onClick={e => {
                            e.preventDefault();
                            console.log('Reject friend request');
                        }}>
                            Reject
                        </button> 
                    </div>        
                </Link>
            </td>
        </tr>
    );
}

export default FriendRequestRow