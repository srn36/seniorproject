import React from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import PageWithNavTabs from '../base/PageWithNavTabs';

function FriendZoneBase(props) {
    const {userInfo} = useOutletContext();

    return (
        <PageWithNavTabs tabs={['Incoming', 'Outgoing'/* , 'Recommendations' */]}>
            <Outlet context={{userInfo: userInfo}}/>
        </PageWithNavTabs>
    );
}

export default FriendZoneBase;