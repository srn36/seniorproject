/* Lord forgive me */

import { Storage } from 'aws-amplify';
import Post from '../components/post-feed/Post';

export async function getPostsForUser(userInfo, username) {
    const postKeys = (await getPostsKeysForUser(username));
    if(postKeys.length === 0) {
        return [<h3 key='none'>No posts to display</h3>];
    }
    const results = postKeys.map(pKey => {
        const firstSpace = pKey.indexOf(' ');
        let postData = {};
        if(firstSpace > -1) {
            const postKey = pKey.substring(0, firstSpace);
            const caption = pKey.substring(firstSpace + 1);
            postData = {s3key: postKey, caption: caption};
        } else {
            postData = {s3key: pKey};
        }
        return <Post key={pKey} userInfo={userInfo} post={postData}/>
    });

    return results;
};

function getPostsKeysForUser(username) {
    return new Promise(async (resolve) => {
        try {
            const s3Key = `${username}-posts.txt`;
            const reader = new FileReader();
            reader.onloadend = function() {
                const postKeys = reader.result.split('\n');
                resolve((postKeys[0] === '' && postKeys.length === 1) ? [] : postKeys);
            };
            const s3url = await Storage.get(s3Key);
            const response = await fetch(s3url);
            const postListBlob = await response.blob();
            const postFile = new File([postListBlob], s3Key, {type: 'text/plain'});
            reader.readAsText(postFile);
        } catch(error) {
            console.log('Error retrieving post keys: ', error);
            resolve([]);
        }
    });
}

export async function uploadPost(postData) {
    console.log(postData)
    const {s3key, author, caption} = postData;
    let currentPosts = []; 
    try {
        currentPosts = await getPostsKeysForUser(author);
    } catch(error) {
        console.log(error);
    }
    const newPosts = [...currentPosts, `${s3key} ${caption}`];
    const postListString = newPosts.join('\n');
    const postsBlob = new Blob([postListString], {type: 'text/plain'});
    const postFile = new File([postsBlob], `${author}-posts.txt`, {type: 'text/plain'});
    return Storage.put(`${author}-posts.txt`, postFile, {
        contentType: 'text/plain',
    });
}

export async function removePost(postKey, author) {
    let currentPosts = []; 
    try {
        currentPosts = await getPostsKeysForUser(author);
    } catch(error) {
        console.log(error);
    }
    const newPosts = currentPosts.filter(key => key.substring(postKey.length) !== postKey);
    const postListString = newPosts.join('\n');
    const postsBlob = new Blob([postListString], {type: 'text/plain'});
    const postFile = new File([postsBlob], `${author}-posts.txt`, {type: 'text/plain'});
    return Storage.put(`${author}-posts.txt`, postFile, {
        contentType: 'text/plain',
    });
}