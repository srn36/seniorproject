/* Here be dragons */

import { Storage } from 'aws-amplify';
import { searchUsers } from '../helper/api-calls/cognito-access';

async function validateUserList(listNames) {
    const existingUsers = (await searchUsers()).Users.map(userResult => userResult.Username);
    console.log(existingUsers)
    return listNames.filter(name => existingUsers.includes(name));
}

function getListForUser(username, list = 'friends') {
    return new Promise(async (resolve) => {
        try {
            const s3Key = `${username}-${list}.txt`;
            const reader = new FileReader();
            reader.onloadend = async function() {
                const listNames = reader.result.split('\n');
                const validatedList = await validateUserList(listNames);
                resolve(validatedList);
            };
            const s3url = await Storage.get(s3Key);
            const response = await fetch(s3url);
            const nameListBlob = await response.blob();
            const nameFile = new File([nameListBlob], s3Key, {type: 'text/plain'});
            reader.readAsText(nameFile);
        } catch(error) {
            console.log('Error retrieving post keys: ', error);
            resolve([]);
        }
    });
}

async function fetchLists(actionUser, otherUser, listType = 'friends') {
    const actionListType = listType === 'friends' ? 'friends' : 'incoming';
    const otherListType = listType === 'friends' ? 'friends' : 'outgoing';

    let actionUserList = [];
    let otherUserList = [];
    return await Promise.allSettled([
        getListForUser(actionUser, actionListType), 
        getListForUser(otherUser, otherListType)
    ]).then(async values => 
        await Promise.allSettled(
            [
                (values[0].status === 'fulfilled') ? 
                    values[0].value 
                    : 
                    getListForUser(actionUser, actionListType),
                (values[1].status === 'fulfilled') ?
                    values[1].value
                    :
                    getListForUser(otherUser, otherListType)
            ]
        ).then(retryVals => {
            actionUserList = retryVals[0].value ? retryVals[0].value : [];
            otherUserList = retryVals[1].value ? retryVals[1].value : [];
        })
    ).then(() =>{
        return {actionList: actionUserList, otherList: otherUserList};
    }).catch(error => 
        console.log(error)    
    );
}

async function uploadLists(actionUser, otherUser, actionListString, otherListString, listType = 'friends') {
    const actionListType = listType === 'friends' ? 'friends' : 'incoming';
    const otherListType = listType === 'friends' ? 'friends' : 'outgoing';

    const actionBlob = new Blob([actionListString], {type: 'text/plain'});
    const actionFile = new File([actionBlob], `${actionUser}-${actionListType}.txt`, {type: 'text/plain'});
    const otherBlob = new Blob([otherListString], {type: 'text/plain'});
    const otherFile = new File([otherBlob], `${otherUser}-${otherListType}.txt`, {type: 'text/plain'});

    await Promise.allSettled([
        Storage.put(`${actionUser}-${actionListType}.txt`, actionFile, {
            contentType: 'text/plain',
        }), 
        Storage.put(`${otherUser}-${otherListType}.txt`, otherFile, {
            contentType: 'text/plain',
        })
    ]).then(async values => 
        await Promise.allSettled([
            (values[0].status === 'fulfilled') ? 
                values[0].value 
                : 
                Storage.put(`${actionUser}-${actionListType}.txt`, actionFile, {
                    contentType: 'text/plain',
                }), 
            (values[1].status === 'fulfilled') ? 
                values[1].value 
                : 
                Storage.put(`${otherUser}-${otherListType}.txt`, otherFile, {
                    contentType: 'text/plain',
                })
        ]).catch(error => 
            console.log(error)    
        )
    );
}

function updateList(arrayToUpdate, updateName, updateType = 'add') {
    if(updateType.toLowerCase() === 'remove') {
        return arrayToUpdate.filter(name => name !== updateName && name.length > 0);
    } else {
        return [
            ...arrayToUpdate,
            updateName
        ];
    }
}

async function updateFriendshipList(actionUser, otherUser, listType = 'friends', updateType = 'add') {
    // Retrieve relevant list for both users
    const lists = await fetchLists(actionUser, otherUser, listType);
    const actionList = lists.actionList;
    const otherList = lists.otherList;
    
    // Update the lists, then convert the lists to strings
    const newActionString = updateList(actionList, otherUser, updateType).join('\n');
    const newOtherString = updateList(otherList, actionUser, updateType).join('\n');

    await uploadLists(actionUser, otherUser, newActionString, newOtherString, listType);

    return (newActionString.length > 0) ? newActionString.split('\n') : [];
}

export async function getFriendsForUser(username) {
    const friendList = await getListForUser(username, 'friends');
    const mapValues = friendList.map(friend => {
        return {
            key: friend, 
            username: friend
        };
    });
    return mapValues;
}

export async function getOutgoingRequestsForUser(username) {
    const requestList = await getListForUser(username, 'outgoing');
    const mapValues = requestList.map(friend => {
        return {
            key: `${friend}_${username}`, 
            toUsername: friend, 
            fromUsername: username
        };
    });
    return mapValues;
}

export async function getIncomingRequestsForUser(username) {
    const requestList = await getListForUser(username, 'incoming');
    const mapValues = requestList.map(friend => {
        return {
            key: `${username}_${friend}`, 
            toUsername: username, 
            fromUsername: friend
        };
    });
    return mapValues;
}

export async function sendFriendRequest(toUsername, fromUsername) {
    return await updateFriendshipList(toUsername, fromUsername, 'requests', 'add');
}

export async function acceptFriendRequest(toUsername, fromUsername) {
    return (
        await Promise.allSettled([
            updateFriendshipList(toUsername, fromUsername, 'requests', 'remove'),
            updateFriendshipList(toUsername, fromUsername, 'friends', 'add')
        ]).then(async values => 
            await Promise.allSettled([
                (values[0].status === 'fulfilled') ? 
                    values[0].value 
                    : 
                    updateFriendshipList(toUsername, fromUsername, 'requests', 'remove'), 
                (values[1].status === 'fulfilled') ? 
                    values[1].value 
                    : 
                    updateFriendshipList(toUsername, fromUsername, 'friends', 'add')
            ]).then(retryVals => {
                return retryVals[0].value;
            }).catch(error => 
                console.log(error)    
            )
        )
    );
}

export async function declineFriendRequest(toUsername, fromUsername) {
    return await updateFriendshipList(toUsername, fromUsername, 'requests', 'remove');
}

export async function removeFriend(username, friendName) {
   return await updateFriendshipList(username, friendName, 'friends', 'remove');
}