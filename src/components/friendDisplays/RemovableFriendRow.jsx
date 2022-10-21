import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { removeFriend } from "../../helper/api-calls/friend";

function RemovableFriendRow({ username, profilePic, userInfo }) {
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

export default RemovableFriendRow