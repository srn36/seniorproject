import React, { useEffect, useState } from 'react';
import '../styles/Home.css';
import InfiniteScroll from 'react-infinite-scroller';
import { useInfiniteQuery } from 'react-query';
import FeedPost from './FeedPost';
import { getToken } from '../helper/tokens';
import { fetchFeedForUser } from '../helper/apiCalls';
import App from '../App';
import { DropdownButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';



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
                        <DropdownButton id="dropdown-basic-button" title="Navigation" style={{display: 'flex'}}>
                            <Link to='/' className='dropdown-item'>Home</Link>
                            <Link to='/chat' className='dropdown-item'>Chat</Link>
                            <Link to='/profile' className='dropdown-item'>Profile</Link>
                            <button onClick={e => logOut()} className='dropdown-item'>Log Out</button>
                        </DropdownButton>
                    </header>
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
