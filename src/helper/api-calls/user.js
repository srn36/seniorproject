import mockPFP from '../../logo192.png';

export /*async*/ function fetchProfileInfoForUser(username) {
    return {profilePic: mockPFP};
}

export /*async*/ function fetchFriendsForUser(username) {
    /*
    return fetch('token? to friends list service', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'token': token})
    }).then(data => 
        data.json()
    );
    */
    console.log(`fetching ${username}'s friends`);
    const mockFriendList = [
        {key: 'Friend 1', username: 'Friend 1', profilePic: mockPFP},
        {key: 'Friend 2', username: 'Friend 2', profilePic: mockPFP},
        {key: 'Friend 3', username: 'Friend 3', profilePic: mockPFP},
        {key: 'Friend 4', username: 'Friend 4', profilePic: mockPFP},
        {key: 'Friend 5', username: 'Friend 5', profilePic: mockPFP},
        {key: 'Friend 6', username: 'Friend 6', profilePic: mockPFP},
        {key: 'Friend 7', username: 'Friend 7', profilePic: mockPFP},
        {key: 'Friend 8', username: 'Friend 8', profilePic: mockPFP},
        {key: 'Friend 9', username: 'Friend 9', profilePic: mockPFP},
        {key: 'Friend 10', username: 'Friend 10', profilePic: mockPFP},
        {key: 'Friend 11', username: 'Friend 11', profilePic: mockPFP},
        {key: 'Friend 12', username: 'Friend 12', profilePic: mockPFP},
        {key: 'Friend 13', username: 'Friend 13', profilePic: mockPFP},
        {key: 'Friend 14', username: 'Friend 14', profilePic: mockPFP},
        {key: 'Friend 15', username: 'Friend 15', profilePic: mockPFP},
        {key: 'Friend 16', username: 'Friend 16', profilePic: mockPFP},
        {key: 'Friend 17', username: 'Friend 17', profilePic: mockPFP},
        {key: 'Friend 18', username: 'Friend 18', profilePic: mockPFP},
        {key: 'Friend 19', username: 'Friend 19', profilePic: mockPFP},
        {key: 'Friend 20', username: 'Friend 20', profilePic: mockPFP},
        //{key: 'Friend 21', username: 'username', profilePic: mockPFP}
    ];
    return mockFriendList;
}

export async function fetchFeedForUser(username, pageParam) {
    /*
    return fetch('token? to feed service', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'token': userToken})
    }).then(data => 
        data.json()
    );
    */
    console.log(`fetching ${username}'s feed`);
    return fetch(
    //This is just an api which provides images to use as sample posts
        `https://picsum.photos/v2/list?page=${pageParam}&limit=10`, 
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ).then(response => 
        response.json()
    );
}

export async function fetchUserPosts(username, pageParam) {
    /*
    return fetch('username? to posts service', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'username': username})
    }).then(data => 
        data.json()
    );
    */
    console.log(`fetching ${username}'s posts`);
    return fetch(
    //This is just an api which provides images to use as sample posts
        `https://picsum.photos/v2/list?page=${pageParam}&limit=10`, 
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ).then(response => 
        response.json()
    );
}