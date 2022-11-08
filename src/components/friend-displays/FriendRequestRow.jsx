import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AcceptButton, RejectButton } from '../../helper/friend-buttons';

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
                            <AcceptButton userInfo={userInfo} username={username} onClick={() => setRow()}/> 
                            <RejectButton userInfo={userInfo} username={username} onClick={() => setRow()}/> 
                        </div>        
                    </Link>
                </td>
            </tr>
        );
    }, [username, profilePic, userInfo]);

    return row;
}

export default FriendRequestRow;