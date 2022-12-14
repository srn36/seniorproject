import Post from '../../components/post-feed/Post';

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
        {key: 'Friend 1', username: 'Friend 1'},
        {key: 'Friend 2', username: 'Friend 2'},
        {key: 'Friend 3', username: 'Friend 3'},
        {key: 'Friend 4', username: 'Friend 4'},
        {key: 'Friend 5', username: 'Friend 5'},
        {key: 'Friend 6', username: 'Friend 6'},
        {key: 'Friend 7', username: 'Friend 7'},
        {key: 'Friend 8', username: 'Friend 8'},
        {key: 'Friend 9', username: 'Friend 9'},
        {key: 'Friend 10', username: 'Friend 10'},
        {key: 'Friend 11', username: 'Friend 11'},
        {key: 'Friend 12', username: 'Friend 12'},
        {key: 'Friend 13', username: 'Friend 13'},
        {key: 'Friend 14', username: 'Friend 14'},
        {key: 'Friend 15', username: 'Friend 15'},
        {key: 'Friend 16', username: 'Friend 16'},
        {key: 'Friend 17', username: 'Friend 17'},
        {key: 'Friend 18', username: 'Friend 18'},
        {key: 'Friend 19', username: 'Friend 19'},
        {key: 'Friend 20', username: 'Friend 20'},
        //{key: 'Friend 21', username: 'username'}
    ];
    return mockFriendList;
}

export async function fetchFeedForUser(userInfo, username, pageParam=1) {
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
    ).then(json => 
        json.map((post) => <Post post={post} userInfo={userInfo} key={post.id}/>)
    );
}

export async function putUserInfoFromSettings(settings) {
    /*
    retrun put('settings service', {
        method:
    })
    */
}