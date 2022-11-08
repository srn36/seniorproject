import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { removeFriend } from '../../helper/api-calls/friend';

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
                        <button onClick={e => {
                            e.preventDefault();
                            removeFriend(userInfo.username, username);
                            setRow();
                        }}>
                            Remove
                        </button> 
                    </Link>
                </td>
            </tr>
        );
    }, [username, profilePic, userInfo]);

    return row;
}

export default RemovableFriendRow;