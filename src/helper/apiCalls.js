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
   return "login token";
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