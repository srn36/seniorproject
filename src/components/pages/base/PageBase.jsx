import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { Outlet } from 'react-router-dom';
import NavigationDropdown from './NavigationDropdown';
import SearchBar from './SearchBar';
import smallLogo from '../../../smollogo.png';

function PageBase(props) {
    const [userInfo, setUserInfo] = useState({loading: true, data: null});
    
    useEffect(() => {
        Auth.currentUserInfo().then(info => 
            setUserInfo({loading: false, data: info})
        );
    }, []);

    return (
        <>
            { userInfo.loading ?
                <p>Loading...</p> :
                <div className='App'>
                    <header className='App-header'>
                        <img className='site-logo' src={smallLogo} alt='logo'/>
                        <SearchBar/>
                        <NavigationDropdown userInfo={userInfo.data}/>
                    </header>
                    <main className='App-main'>
                        <Outlet context={{userInfo: userInfo.data}}/>
                    </main>
                </div>
            }
        </>
    );
}

export default PageBase;