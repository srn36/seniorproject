import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { useInfiniteQuery } from 'react-query';
import FeedPost from './FeedPost';
import { getToken } from '../helper/tokens';
import { fetchFeedForUser } from '../helper/apiCalls';
import NavigationBar from './NavigationBar';
import '../styles/Home.css';

function Home(props) {
    const loginToken = getToken();

    const fetchPosts = async ({ pageParam = 1 }) => {
        const results = await fetchFeedForUser(loginToken, pageParam);
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
    const [content, setContent] = useState();

    useEffect(() => {
        setContent(
            <div className='App'>
                <NavigationBar setContent={setContent}/>
                <main>
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
                </main>
            </div>
        );
    }, [props, data, isLoading, isError, hasNextPage, fetchNextPage, loginToken]);
    
    return content;
}

export default Home
