import React, { useEffect, useState } from "react";
import { Auth } from 'aws-amplify';
import NavigationDropdown from "./NavigationDropdown";
import smallLogo from '../../../smollogo.png';
import bg from '../../../BG.jpeg';

function PageBase({children: Child}) {
    const [userInfo, setUserInfo] = useState({loading: true, data: null});
    useEffect(() => {
        Auth.currentUserInfo().then(info => 
            setUserInfo({loading: false, data: info})
        );
    }, []);

    return (
        <>
            <main>
                <img className="background-pic" src={bg} alt="" />
            </main>
            { userInfo.loading ?
                <p>Loading...</p> :
                <div className='App'>
                    <header className='App-header'>
                        <img src={smallLogo} alt="logo"/>
                        <NavigationDropdown userInfo={userInfo.data}/>
                    </header>
                    <main className='App-main'>
                        <Child userInfo={userInfo.data}/>
                    </main>
                </div>
            }
        </>
    );
}

export default PageBase;