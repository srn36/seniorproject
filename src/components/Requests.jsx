import React, { useMemo } from "react";
import { fetchFriendRequestsForUser } from "../helper/api-calls/friend";
import FriendList from "./friend-displays/FriendList";

function Requests(props) {
    const userInfo = props.userInfo;

    const requestList = /*async*/ (uname) => {
        return /*await*/ fetchFriendRequestsForUser(uname)/*.then(results => results.json())*/;
    };

    const content = useMemo(() => {
        const retrieveFriendRequests = requestList(userInfo.username);
        const friendRequests = Array.isArray(retrieveFriendRequests) ? retrieveFriendRequests : [];

        return (
            <>
                <h3>Friend Requests</h3>
                <FriendList friends={friendRequests} type={'Requests'} userInfo={userInfo}/>
            </>
        );
    }, [userInfo]);

    return content;
}

export default Requests;