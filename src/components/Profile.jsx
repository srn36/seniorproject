import React, { useEffect, useMemo, useState } from "react";
import { fetchFriendsForUser, fetchUserPosts } from "../helper/api-calls/user";
import InfiniteScroll from 'react-infinite-scroller';
import { useInfiniteQuery } from 'react-query';
import FeedPost from './post-feed/Post';
import { useParams } from "react-router-dom";
import FriendList from "./friend-displays/FriendList";
import { removeFriend, sendFriendRequest } from "../helper/api-calls/friend";

const toggleFriendsOrPosts = {Friends: 'Posts', Posts: 'Friends'};

function Profile(props) {
    const userInfo = props.userInfo;
    const username = useParams().username;
    const [postFriendToggle, setPostFriendToggle] = useState();

    useEffect(() => {
        setPostFriendToggle('Friends');
    }, [username]);

    const fetchPosts = async ({ pageParam = 1 }) => {
        const results = await fetchUserPosts(username, pageParam);
        return { results, nextPage: pageParam + 1, totalPages: 100 };
    };

    const {
        data,
        isLoading,
        isError,
        hasNextPage,
        fetchNextPage
    } = useInfiniteQuery('posts', fetchPosts, {
        getNextPageParam: (lastPage) => (lastPage.nextPage < lastPage.totalPages) ? lastPage.nextPage : undefined
    });

    const friendList = /*async*/ (uname) => {
        return /*await*/ fetchFriendsForUser(uname)/*.then(results => results.json())*/;
    };

    const content = useMemo(() => {
        const retrieveFriends = friendList(username);
        const friends = Array.isArray(retrieveFriends) ? retrieveFriends : [];
        const isOwnProfile = (username === userInfo?.username);
        const friendListType = isOwnProfile ? 'Removable' : 'Standard';

        return (
            <>
                <ProfileHeadline username={username} userInfo={userInfo} isOwnProfile={isOwnProfile} friends={friends}/>
                <h4>hi</h4>
                <button onClick={_e => {setPostFriendToggle(toggleFriendsOrPosts[postFriendToggle]);}}>Show {postFriendToggle}</button>
                {
                    (toggleFriendsOrPosts[postFriendToggle] === 'Friends') &&
                    <>
                        <h3>{username}'s Friends</h3>
                        <FriendList friends={friends} type={friendListType} userInfo={userInfo}/>
                    </>
                }
                {
                    (toggleFriendsOrPosts[postFriendToggle] === 'Posts') &&
                    <>
                        <h3>{username}'s Posts</h3>
                        {isLoading ? (
                                <p>Loading...</p>
                            ) : isError ? (
                                    <p>There was an error</p>
                                ) : (
                                    <InfiniteScroll hasMore={hasNextPage} loadMore={fetchNextPage}>
                                        {data?.pages.map((page) =>
                                            page.results.map((post) => <FeedPost post={post} key={post.id} />)
                                        )}
                                    </InfiniteScroll>
                                )
                        }
                    </>
                }
            </>
        );
    }, [data?.pages, fetchNextPage, hasNextPage, isError, isLoading, username, postFriendToggle, userInfo]);

    return content;
}

function ProfileHeadline({ username, userInfo, isOwnProfile, friends }) {
    let alreadyFriends = isOwnProfile || false;
    friends.forEach(friend => {
        if(friend.username === userInfo?.username) {                
            alreadyFriends = true;
        }
    });

    return (
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <img src='' alt='profile pic here'/>
            <h2>Profile Page for {username}</h2>
            {//Also need to check if there is an existing friend request between them at some point
                !isOwnProfile && (
                    (!alreadyFriends && <button onClick={_e => {sendFriendRequest(userInfo.username, username)}}>Request Friend</button>) ||
                    (<button onClick={_e => {removeFriend(userInfo.username, username)}}>Remove Friend</button>)
                )
            }
        </div>
    );
}

export default Profile;