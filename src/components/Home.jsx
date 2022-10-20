import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { useInfiniteQuery } from 'react-query';
import FeedPost from './FeedPost';
import { fetchFeedForUser } from '../helper/apiCalls';

function Home(props) {
    const userInfo = props.userInfo;

    const fetchPosts = async ({ pageParam = 1 }) => {
        const results = await fetchFeedForUser(userInfo?.username, pageParam);
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
    
    return (
        <div>
            {isLoading ? (
                    <p>Loading...</p>
                ) : isError ? (
                        <p>There was an error</p>
                    ) : (
                        <InfiniteScroll hasMore={hasNextPage} loadMore={fetchNextPage}>
                            {data.pages.map((page) =>
                                page.results.map((post) => <FeedPost post={post} key={post.id} />)
                            )}
                        </InfiniteScroll>
                    )
            }
        </div>
    );
}


export default Home
