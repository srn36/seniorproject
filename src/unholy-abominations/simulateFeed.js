/* I am so sorry for the damage I am causing to your mind, body, and soul */

import { getFriendsForUser } from "./simulateFriends";
import { getPostsForUser } from "./simulatePosts";

/**
 * Constructs a user's post feed.
 * First retrieves the usernames of all the user's friends.
 * Then iterates over each user, fetching all of their posts.
 * Flattens the array of posts, then sorts them in chronological order,
 * with the most recent posts being displayed first.
 */
export async function getFeedForUser(userInfo, username, pageParam = 1) {
    const friends = await getFriendsForUser(username);
    const filterFriends = Object.values(friends).filter(friend => friend.username.length > 0);
    if(filterFriends.length === 0) {
        return [];
    }
    const friendNames = Object.values(filterFriends).map(friend => friend.username);
    
    const friendPosts = await Promise.allSettled(friendNames.map(name => getPostsForUser(userInfo, name))).then(results => {
        return results.map(result => !!(result.value) ? result.value : null);
    });
    const flatFriendPosts = friendPosts.flat();
    const sortedPosts = flatFriendPosts.sort((a,b) => extractTime(b) - extractTime(a));
    return sortedPosts;
}

function extractTime(post) {
    return parseInt(post.props.post.s3key.split('-')[1]);
}