import * as ProfilePic from '../logo192.png';

export /*async*/ function fetchLoginTokenFromCredentials(credentials) {
    /*
    return fetch('login token service', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    }).then(data => 
        data.json()
    );
    */
   return 'login token';
}

export /*async*/ function fetchUserInfoFromToken(token) {
    /*
    return fetch('token to info service', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'token': token})
    }).then(data => 
        data.json()
    );
    */
    return {username: 'username', password: 'password'};
}

export /*async*/ function fetchFriendsForUser(userToken) {
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
    const mockFriendList = [
        {id: 'Friend 1', username: 'Friend 1', profilePicture: <img src={ProfilePic} alt='Profile Pic'/>},
        {id: 'Friend 2', username: 'Friend 2', profilePicture: <img src={ProfilePic} alt='Profile Pic'/>},
        {id: 'Friend 3', username: 'Friend 3', profilePicture: <img src={ProfilePic} alt='Profile Pic'/>},
        {id: 'Friend 4', username: 'Friend 4', profilePicture: <img src={ProfilePic} alt='Profile Pic'/>},
        {id: 'Friend 5', username: 'Friend 5', profilePicture: <img src={ProfilePic} alt='Profile Pic'/>},
        {id: 'Friend 6', username: 'Friend 6', profilePicture: <img src={ProfilePic} alt='Profile Pic'/>},
        {id: 'Friend 7', username: 'Friend 7', profilePicture: <img src={ProfilePic} alt='Profile Pic'/>},
        {id: 'Friend 8', username: 'Friend 8', profilePicture: <img src={ProfilePic} alt='Profile Pic'/>},
        {id: 'Friend 9', username: 'Friend 9', profilePicture: <img src={ProfilePic} alt='Profile Pic'/>},
        {id: 'Friend 10', username: 'Friend 10', profilePicture: <img src={ProfilePic} alt='Profile Pic'/>}
    ];
    return mockFriendList;
}

export async function fetchFeedForUser(userToken, pageParam) {
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
    return fetch(
        //This is just an api which provides images to use as sample posts
        `https://picsum.photos/v2/list?page=${pageParam}&limit=10`
    ).then(response => 
        response.json()
    );
}