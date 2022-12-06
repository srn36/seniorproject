/* Lord forgive me */

import { Storage } from 'aws-amplify';

export function getPostsKeysForUser(username) {
    return new Promise(async (resolve) => {
        const s3Key = `${username}-posts.txt`;
        const reader = new FileReader();
        reader.onloadend = function() {
            const postKeys = reader.result.split('\n');
            console.log(postKeys)
            resolve(postKeys);
        };
        const s3url = await Storage.get(s3Key);
        const response = await fetch(s3url);
        const postListBlob = await response.blob();
        const postFile = new File([postListBlob], s3Key, {type: 'text/plain'});
        reader.readAsText(postFile);
    });
}

export async function uploadPost(postData) {
    const {key, author, caption} = postData;
    let currentPosts = []; 
    try {
        currentPosts = await getPostsKeysForUser(author);
    } catch(error) {
        console.log(error);
    }
    const newPosts = [...currentPosts, `${key} ${caption}`];
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