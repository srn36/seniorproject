import React, { useMemo } from "react";
import { fetchFriendRequestsForUser } from "../helper/api-calls/friend";
import FriendList from "./friendDisplays/FriendList";

function Requests(props) {
    const userInfo = props.userInfo;

    const requestList = /*async*/ (uname) => {
        return /*await*/ fetchFriendRequestsForUser(uname)/*.then(results => results.json())*/;
    };

    const content = useMemo(() => {
        const retrieveFriendRequests = requestList(userInfo.username);
        const friendRequests = Array.isArray(retrieveFriendRequests) ? retrieveFriendRequests : [];

        return (
            <div style={{placeItems: 'center', display: 'flex', flexDirection: 'column', }}>
                <div className='col-12' style={{placeItems: 'center', display: 'flex', flexDirection: 'column'}}>
                    <h3>Friend Requests</h3>
                    <FriendList friends={friendRequests} type={'Requests'} userInfo={userInfo}/>
                </div>
            </div>
        );
    }, [userInfo]);

    return content;
}

export default Requests;