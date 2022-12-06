import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { useInfiniteQuery } from 'react-query';
import FootBar from './FootBar';

function Feed({ userInfo, username, fetchFunction }) {
    const fetchPosts = async (pageParam) => {
        const results = await fetchFunction(userInfo, username);
        return { results, nextPage: pageParam + 1, totalPages: 1 };
    };

    const {
        data,
        isLoading,
        isError,
        hasNextPage,
        fetchNextPage
    } = useInfiniteQuery('posts', ({ pageParam = 1 }) => fetchPosts(pageParam), {
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        getNextPageParam: (lastPage) => (lastPage.nextPage < lastPage.totalPages) ? lastPage.nextPage : undefined
    });

    return (
        <>
            {isLoading ? (
                    <p>Loading...</p>
                ) : isError ? (
                        <p>There was an error</p>
                    ) : ((!!data && !!(data.pages) && !!(data.pages[0]) && !!(data.pages[0].results) && !!(data.pages[0].results[0])) ?
                            <>
                                <InfiniteScroll hasMore={hasNextPage} loadMore={fetchNextPage}>
                                    {data.pages.map((page) =>
                                        page.results
                                    )}
                                </InfiniteScroll>
                                <FootBar/>
                            </>
                            :
                            <h3>No posts to display</h3>
                    )
            }
        </>
    );
}

export default Feed;