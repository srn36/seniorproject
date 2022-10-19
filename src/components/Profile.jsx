import React, { useMemo } from "react";
import { fetchFriendsForUser } from "../helper/apiCalls";
import { getToken } from "../helper/tokens";
import { Table } from "react-bootstrap";
import FriendRow from "./FriendRow";

function Profile(props) {
    const token = getToken();

    const friendList = /*async*/ (t) => {
        return /*await*/ fetchFriendsForUser(t)/*.then(results => results.json())*/;
    };

    const friends = friendList(token);
    const content = useMemo(() => {
        const friendTable = Array.isArray(friends) 
                            && friends.map(friend => <FriendRow key={friend.username} 
                                                                username={friend.username} 
                                                                profilePic={friend.profilePic}/>);
        return (
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <h2>Profile Page</h2>
                <div>
                    <h4>hi</h4>
                </div>
                <div style={{placeItems: 'center', display: 'flex', flexDirection: 'column'}}>
                    <h3>Friend List</h3>
                    <div className="col-6" style={{display: 'flex'}}>
                        {
                            (Object.keys(friendTable).length > 0) &&
                            <Table bordered hover>
                                <tbody>
                                    {friendTable}
                                </tbody>
                            </Table>
                        }
                    </div>
                </div>
            </div>
        );
    }, [friends]);

    return content;
}

export default Profile;