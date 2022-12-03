import React from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import PageWithNavTabs from '../base/PageWithNavTabs';

function SettingsPageBase(props) {
    const {userInfo} = useOutletContext();
    
    return(
        <PageWithNavTabs  tabs={['Profile', 'Account']}>
            <Outlet context={{userInfo: userInfo, username: userInfo.username, attributes: userInfo.attributes}}/>
        </PageWithNavTabs>
    );
}

export default SettingsPageBase;