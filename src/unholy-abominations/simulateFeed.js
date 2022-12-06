import { getFriendsForUser } from "./simulateFriends";
import { getPostsForUser } from "./simulatePosts";


export async function getFeedForUser(userInfo, username, pageParam = 1) {
    const friends = await getFriendsForUser(username);
    const friendNames = Object.values(friends).map(friend => friend.username);
    
    const friendPosts = await Promise.allSettled(friendNames.map(name => getPostsForUser(userInfo, name))).then(results => {
        return results.map(result => !!(result.value) ? result.value : null);
    });
    const flatFriendPosts = friendPosts.flat();
    const sortedPosts = flatFriendPosts.sort((a,b) => extractTime(a) - extractTime(b));
    return sortedPosts;
}

function extractTime(post) {
    return parseInt(post.props.post.s3key.split('-')[1]);
}