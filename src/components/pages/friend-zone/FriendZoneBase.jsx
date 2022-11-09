import React from 'react';
import { Link, Outlet, useLocation, useOutletContext } from 'react-router-dom';

function FriendZoneBase(props) {
    const {userInfo} = useOutletContext();
    const path = useLocation().pathname;

    return (
        <>
            <div className='friend-zone'>
                <Link 
                    to='requests'
                >
                    <button disabled={path.includes('requests')}>
                        Requests
                    </button>
                </Link>
                <Link
                    to='recommendations'                    
                >
                    <button disabled={path.includes('recommendations')}>
                        Recommendations
                    </button>
                </Link>
            </div>
            <Outlet context={{userInfo: userInfo}}/>
        </>
    );
}

export default FriendZoneBase;