import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RemoveButton } from '../../helper/friend-buttons';

function RemovableFriendRow({ username, profilePic, userInfo }) {
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
                        <RemoveButton userInfo={userInfo} username={username} onClick={() => setRow()}/>  
                    </Link>
                </td>
            </tr>
        );
    }, [username, profilePic, userInfo]);

    return row;
}

export default RemovableFriendRow;