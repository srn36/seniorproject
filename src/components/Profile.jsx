import React, { useMemo, useState } from "react";
import { fetchFriendsForUser, fetchUserPosts } from "../helper/apiCalls";
import InfiniteScroll from 'react-infinite-scroller';
import { useInfiniteQuery } from 'react-query';
import FeedPost from './FeedPost';
import { getToken } from "../helper/tokens";
import { Table } from "react-bootstrap";
import FriendRow from "./FriendRow";
import { useParams } from "react-router-dom";

const toggleFriendsOrPosts = {Friends: 'Posts', Posts: 'Friends'};

function Profile(props) {
    const token = getToken();
    const username = useParams();
    const [postFriendToggle, setPostFriendToggle] = useState('Friends');

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

    const friendList = /*async*/ (t) => {
        return /*await*/ fetchFriendsForUser(t)/*.then(results => results.json())*/;
    };

    const friends = friendList(token);
    const content = useMemo(() => {
        const friendTable = Array.isArray(friends) 
                            && friends.map(friend => <FriendRow key={friend.username} 
                                                                username={friend.username} 
                                                                profilePic={friend.profilePic}/>);
        return (
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <h2>Profile Page for {username.username}</h2>            
                <div>
                    <h4>hi</h4>
                    <button onClick={e => {setPostFriendToggle(toggleFriendsOrPosts[postFriendToggle]);}}>Show {postFriendToggle}</button>
                </div>
                {
                    (toggleFriendsOrPosts[postFriendToggle] === 'Friends') &&
                    <div style={{placeItems: 'center', display: 'flex', flexDirection: 'column'}}>
                        <h3>{username.username}'s Friends</h3>
                        <div className="col-6" style={{display: 'flex', maxHeight: '75vh', overflowY: 'scroll'}}>
                            {
                                (Object.keys(friendTable).length > 0) &&
                                <Table bordered hover>
                                    <tbody>
                                        {friendTable}
                                    </tbody>
                                </Table>
                            }
                        </div>
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
    }, [friends, data?.pages, fetchNextPage, hasNextPage, isError, isLoading, username, postFriendToggle]);

    return content;
}

export default Profile;