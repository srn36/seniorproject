import React, { useMemo } from "react";
import { useFriendRequests } from "../helper/api-calls/useApiCall";
import FriendList from "./friend-displays/FriendList";

function Requests(props) {
    const userInfo = props.userInfo;
    const {loading, error, data} = useFriendRequests(userInfo.username);

    const content = useMemo(() => {
        let requestRows;
        if(!loading && !error) {
            const incomingRequests = data?.filter(request => request.toUsername === userInfo.username);
            requestRows = Array.isArray(incomingRequests) ? incomingRequests : [];
        }

        return (
            <>
                <h3>Friend Requests</h3>
                {
                    loading ? 
                        <h4>Loading...</h4> : (
                            !!error ? <h4>Error</h4> : <FriendList friends={requestRows} type={'Requests'} userInfo={userInfo}/>
                        )
                }               
            </>
        );
    }, [userInfo, loading, error, data]);

    return content;
}

export default Requests;