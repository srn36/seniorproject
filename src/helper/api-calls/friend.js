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
        {key: 'Request 1', fromUsername: 'Friend 1', toUsername: username, profilePic: mockPFP},
        {key: 'Request 2', fromUsername: 'Friend 2', toUsername: username, profilePic: mockPFP},
        {key: 'Request 3', fromUsername: 'Friend 3', toUsername: username, profilePic: mockPFP},
        {key: 'Request 4', fromUsername: 'Friend 4', toUsername: username, profilePic: mockPFP},
        {key: 'Request 5', fromUsername: 'Friend 5', toUsername: username, profilePic: mockPFP},
        {key: 'Request 6', fromUsername: 'Friend 6', toUsername: username, profilePic: mockPFP},
        {key: 'Request 7', fromUsername: 'Friend 7', toUsername: username, profilePic: mockPFP},
        {key: 'Request 8', fromUsername: 'Friend 8', toUsername: username, profilePic: mockPFP},
        {key: 'Request 9', fromUsername: 'Friend 9', toUsername: username, profilePic: mockPFP},
        {key: 'Request 10', fromUsername: 'Friend 10', toUsername: username, profilePic: mockPFP},
        {key: 'Request 11', fromUsername: 'Request 11', toUsername: username, profilePic: mockPFP},
        {key: 'Request 12', fromUsername: 'Request 12', toUsername: username, profilePic: mockPFP},
        {key: 'Request 13', fromUsername: 'Request 13', toUsername: username, profilePic: mockPFP},
        {key: 'Request 14', fromUsername: 'Request 14', toUsername: username, profilePic: mockPFP},
        {key: 'Request 15', fromUsername: 'Request 15', toUsername: username, profilePic: mockPFP},
        {key: 'Request 16', fromUsername: 'Request 16', toUsername: username, profilePic: mockPFP},
        {key: 'Request 17', fromUsername: 'Request 17', toUsername: username, profilePic: mockPFP},
        {key: 'Request 18', fromUsername: 'Request 18', toUsername: username, profilePic: mockPFP},
        {key: 'Request 19', fromUsername: 'Request 19', toUsername: username, profilePic: mockPFP},
        {key: 'Request 20', fromUsername: 'Request 20', toUsername: username, profilePic: mockPFP},
        {key: 'Request 21', fromUsername: username, toUsername: 'Friend 1', profilePic: mockPFP},
        {key: 'Request 22', fromUsername: username, toUsername: 'Friend 22', profilePic: mockPFP},
        {key: 'Request 23', fromUsername: username, toUsername: 'Friend 23', profilePic: mockPFP},
        {key: 'Request 24', fromUsername: username, toUsername: 'Friend 24', profilePic: mockPFP},
        {key: 'Request 25', fromUsername: username, toUsername: 'Friend 25', profilePic: mockPFP},
        {key: 'Request 26', fromUsername: username, toUsername: 'Friend 26', profilePic: mockPFP},
        {key: 'Request 27', fromUsername: username, toUsername: 'Friend 27', profilePic: mockPFP},
        {key: 'Request 28', fromUsername: username, toUsername: 'Friend 28', profilePic: mockPFP},
        {key: 'Request 29', fromUsername: username, toUsername: 'Friend 29', profilePic: mockPFP},
        {key: 'Request 30', fromUsername: username, toUsername: 'Friend 30', profilePic: mockPFP},
        {key: 'Request 31', fromUsername: username, toUsername: 'Request 31', profilePic: mockPFP},
        {key: 'Request 32', fromUsername: username, toUsername: 'Request 32', profilePic: mockPFP},
        {key: 'Request 33', fromUsername: username, toUsername: 'Request 33', profilePic: mockPFP},
        {key: 'Request 34', fromUsername: username, toUsername: 'Request 34', profilePic: mockPFP},
        {key: 'Request 35', fromUsername: username, toUsername: 'Request 35', profilePic: mockPFP},
        {key: 'Request 36', fromUsername: username, toUsername: 'Request 36', profilePic: mockPFP},
        {key: 'Request 37', fromUsername: username, toUsername: 'Request 37', profilePic: mockPFP},
        {key: 'Request 38', fromUsername: username, toUsername: 'Request 38', profilePic: mockPFP},
        {key: 'Request 39', fromUsername: username, toUsername: 'Request 39', profilePic: mockPFP},
        {key: 'Request 40', fromUsername: username, toUsername: 'Request 40', profilePic: mockPFP},
    ];
    return mockRequestList;
}

export /*async*/ function checkFriendRequests(loggedInUsername, viewingUsername) {
    const requestsForLoggedInUser = fetchFriendRequestsForUser(loggedInUsername);
    return !!(requestsForLoggedInUser?.filter(request => request.toUsername === viewingUsername).length) ? 
        'Outgoing'
        :
        (
            !!(requestsForLoggedInUser?.filter(request => request.fromUsername === viewingUsername).length) ?
                'Incoming'
                :
                'None'
        );

}

export /*async*/ function sendFriendRequest(fromUser, toUser) {
    console.log('send');
    //I honestly don't know what a put call looks like and i do not feel like googling it rn
}

export /*async*/ function acceptFriendRequest(fromUser, toUser) {
    console.log('accept');
    //delete existing request between the two users
    //put request to create friend relationship between the users
}

export /*async*/ function rejectFriendRequest(fromUser, toUser) {
    console.log('reject');
    //delete existing request between the two users
}

export /*async*/ function removeFriend(user1, user2) {
    //delete existing friend relationship between the two users
}