import React, { useMemo } from "react";
import { fetchFriendsForUser } from "../helper/apiCalls";
import { getToken } from "../helper/tokens";
import { Table } from "react-bootstrap";

function Profile(props) {
    const token = getToken();

    const friendList = /*async*/ (t) => {
        return /*await*/ fetchFriendsForUser(t)/*.then(results => results.json())*/;
    };

    const friends = friendList(token);
    const content = useMemo(() => {
        const friendTable = Array.isArray(friends) 
                            && friends.map(friend => (
                                <tr key={friend.username}>
                                    <td key={friend.username}>{friend.username}</td>
                                </tr>
                            ));
        return (
            <div>
                <h2>Profile Page</h2>
                <div className="row">
                    <h4>hi</h4>
                </div>
                <div className="row" style={{placeItems: 'center', display: 'flex', flexDirection: 'column'}}>
                    <h3>Friend List</h3>
                    <div className="col-6" style={{display: 'flex'}}>
                        {
                            (Object.keys(friendTable).length > 0) &&
                            <Table striped bordered title="Friend List">
                                <thead>
                                    <tr>
                                        <th>Username</th>
                                    </tr>
                                </thead>
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