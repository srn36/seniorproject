import React, { useEffect, useState } from 'react';
import logo from '../logo.svg';
import '../styles/Home.css';
import InfiniteScroll from 'react-infinite-scroller';
import { useInfiniteQuery } from 'react-query';
import FeedPost from './FeedPost';
import { getToken } from '../helper/tokens';
import { fetchFeedForUser } from '../helper/apiCalls';
import App from '../App';
import { Dropdown } from 'react-bootstrap';


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
        const logOut = () => {
            sessionStorage.removeItem('token');
            let propsCopy = {...props};
            delete propsCopy.userInfo;
            setContent(<App {...propsCopy} />);
        };

        const homePage = () => {
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
                    <button onClick={e => logOut()}>Log Out</button>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Dropdown Button
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="http://localhost:3000/">Home</Dropdown.Item>
                            <Dropdown.Item href="http://localhost:3000/Chat/">Chat</Dropdown.Item>
                            <Dropdown.Item href="http://localhost:3000/Profile/">Profile</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
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
        };

        if(loginToken == null) {
            setContent(<App {...props}/>);
        }
        else {
            setContent(homePage());
        }
    }, [props, data, isLoading, isError, hasNextPage, fetchNextPage, loginToken]);
    
    return content;
}

export default Home
