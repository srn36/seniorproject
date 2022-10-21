import mockPFP from '../../logo192.png';

export /*async*/ function fetchFriendRequestsForUser(username) {
    /*
    return fetch('token? to requests list service', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'token': token})
    }).then(data => 
        data.json()
    );
    */
    const mockRequestList = [
        {key: 'Request 1', username: 'Request 1', profilePic: mockPFP},
        {key: 'Request 2', username: 'Request 2', profilePic: mockPFP},
        {key: 'Request 3', username: 'Request 3', profilePic: mockPFP},
        {key: 'Request 4', username: 'Request 4', profilePic: mockPFP},
        {key: 'Request 5', username: 'Request 5', profilePic: mockPFP},
        {key: 'Request 6', username: 'Request 6', profilePic: mockPFP},
        {key: 'Request 7', username: 'Request 7', profilePic: mockPFP},
        {key: 'Request 8', username: 'Request 8', profilePic: mockPFP},
        {key: 'Request 9', username: 'Request 9', profilePic: mockPFP},
        {key: 'Request 10', username: 'Request 10', profilePic: mockPFP},
        {key: 'Request 11', username: 'Request 11', profilePic: mockPFP},
        {key: 'Request 12', username: 'Request 12', profilePic: mockPFP},
        {key: 'Request 13', username: 'Request 13', profilePic: mockPFP},
        {key: 'Request 14', username: 'Request 14', profilePic: mockPFP},
        {key: 'Request 15', username: 'Request 15', profilePic: mockPFP},
        {key: 'Request 16', username: 'Request 16', profilePic: mockPFP},
        {key: 'Request 17', username: 'Request 17', profilePic: mockPFP},
        {key: 'Request 18', username: 'Request 18', profilePic: mockPFP},
        {key: 'Request 19', username: 'Request 19', profilePic: mockPFP},
        {key: 'Request 20', username: 'Request 20', profilePic: mockPFP}
    ];
    return mockRequestList;
}

export function sendFriendRequest(fromUser, toUser) {
    //I honestly don't know what a put call looks like and i do not feel like googling it rn
}

export function acceptFriendRequest(fromUser, toUser) {
    //delete existing request between the two users
    //put request to create friend relationship between the users
}

export function rejectFriendRequest(fromUser, toUser) {
    //delete existing request between the two users
}

export function removeFriend(user1, user2) {
    //delete existing friend relationship between the two users
}