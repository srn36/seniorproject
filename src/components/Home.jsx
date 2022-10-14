import React from 'react';
import logo from '../logo.svg';
import '../styles/Home.css';
import InfiniteScroll from 'react-infinite-scroller';
import { useInfiniteQuery } from 'react-query';
import FeedPost from './FeedPost';

function Home() {
    const fetchPosts = async ({ pageParam = 1 }) => {
        const results = await fetch(
          `https://picsum.photos/v2/list?page=${pageParam}&limit=10`
        ).then(response => 
            response.json()
        );
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
        <div className='App'>
            <header className='App-header'>
                <img src={logo} className='App-logo' alt='logo' />
                <p>Edit <code>src/App.js</code> and save to reload.</p>
                <a
                    className='App-link'
                    href='https://reactjs.org'
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    Learn React
                </a>
            </header>
            <button>hi</button>
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
}

export default Home