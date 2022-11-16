import React from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import PageWithNavTabs from '../base/PageWithNavTabs';

function SettingsPageBase(props) {
    const {userInfo} = useOutletContext();
    
    return(
        <PageWithNavTabs  tabs={['Account', 'Default',]}>
            <Outlet context={{userInfo: userInfo}}/>
        </PageWithNavTabs>
    );
}

export default SettingsPageBase;