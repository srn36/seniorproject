import React, { useEffect, useMemo, useState } from "react";
import { fetchFriendsForUser, fetchUserPosts } from "../helper/api-calls/user";
import InfiniteScroll from 'react-infinite-scroller';
import { useInfiniteQuery } from 'react-query';
import FeedPost from './FeedPost';
import { useParams } from "react-router-dom";
import FriendList from "./friendDisplays/FriendList";
import { removeFriend, sendFriendRequest } from "../helper/api-calls/friend";

const toggleFriendsOrPosts = {Friends: 'Posts', Posts: 'Friends'};

function Profile(props) {
    const userInfo = props.userInfo;
    const username = useParams();
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
        const retrieveFriends = friendList(username.username);
        const friends = Array.isArray(retrieveFriends) ? retrieveFriends : [];
        const isOwnProfile = (username.username === userInfo?.username);
        const friendListType = isOwnProfile ? 'Removable' : 'Standard';
        let alreadyFriends = isOwnProfile || false;
        friends.forEach(friend => {
            if(friend.username === userInfo?.username) {                
                alreadyFriends = true;
            }
        });

        return (
            <div style={{placeItems: 'center', display: 'flex', flexDirection: 'column', }}>
                <div className='col-6' style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                    <img src='' alt='profile pic here'/>
                    <h2>Profile Page for {username.username}</h2>
                    {//Also need to check if there is an existing friend request between them at some point
                        !isOwnProfile && (
                            (!alreadyFriends && <button onClick={_e => {sendFriendRequest(userInfo.username, username)}}>Request Friend</button>) ||
                            (<button onClick={_e => {removeFriend(userInfo.username, username)}}>Remove Friend</button>)
                        )
                    }
                </div>
                <>
                    <h4>hi</h4>
                    <button onClick={_e => {setPostFriendToggle(toggleFriendsOrPosts[postFriendToggle]);}}>Show {postFriendToggle}</button>
                </>
                {
                    (toggleFriendsOrPosts[postFriendToggle] === 'Friends') &&
                    <div className='col-12' style={{placeItems: 'center', display: 'flex', flexDirection: 'column'}}>
                        <h3>{username.username}'s Friends</h3>
                        <FriendList friends={friends} type={friendListType} userInfo={userInfo}/>
                    </div>
                }
                {
                    (toggleFriendsOrPosts[postFriendToggle] === 'Posts') &&
                    <div style={{placeItems: 'center', display: 'flex', flexDirection: 'column'}}>
                        <h3>{username.username}'s Posts</h3>
                        <div className="col-6" style={{display: 'flex', justifyContent: 'center'}}>
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
                        </div>
                    </div>
                }
            </div>
        );
    }, [data?.pages, fetchNextPage, hasNextPage, isError, isLoading, username, postFriendToggle, userInfo]);

    return content;
}

export default Profile;