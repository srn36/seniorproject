import React from "react";
import { Link } from "react-router-dom";

function RemovableFriendRow({ username, profilePic, userInfo }) {
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
                    <button onClick={e => {
                        e.preventDefault();
                        console.log('Remove friend');
                    }}>
                        Remove
                    </button> 
                </Link>
            </td>
        </tr>
    );
}

export default RemovableFriendRow