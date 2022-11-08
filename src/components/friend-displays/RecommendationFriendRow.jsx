import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AddButton } from '../helper/friend-buttons';

function RecommendationFriendRow({ username, profilePic, userInfo }) {
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
                        <AddButton userInfo={userInfo} username={username} onClick={() => setRow()}/> 
                    </Link>
                </td>
            </tr>
        );
    }, [username, profilePic, userInfo]);

    return row;
}

export default RecommendationFriendRow;