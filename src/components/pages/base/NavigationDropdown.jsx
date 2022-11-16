/* 
Use of this component has now been packaged into PageBase, which will serve as a base page.
Load pages with PageBase to automatically have a NavigationBar appended
*/
import React, { useMemo } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { withAuthenticator } from '@aws-amplify/ui-react';

function NavigationDropdown({ userInfo, signOut }) {
    const navigate = useNavigate();
    const pathName = useLocation().pathname.toLowerCase();

    const profilePath = useMemo(() => {
        return `profile/${userInfo.username}`;
    }, [userInfo]);

    const {
        pagePaths,
        actionPaths,
        overrideText
    } = useMemo(() => {
        const pagePathArray = ['Home', 'Chat', 'friend-zone', profilePath];
        const actionPathArray = ['make-post', 'Settings'];
        const override = {
            'friend-zone': 'Friend Zone',
            'make-post': 'Make Post',
            [profilePath]: 'Profile',
        };

        return {
            'pagePaths': pagePathArray,
            'actionPaths': actionPathArray,
            'overrideText': override
        };
    }, [profilePath]);

    const dropdownTabs = useMemo(() => {
        const generateTabsFromList = (tabPaths) => {
            return tabPaths.map(path => 
                <Dropdown.Item
                    key={path}
                    disabled={pathName.includes(path.toLowerCase())}
                    className='dropdown-item'
                    onClick={() => navigate(`/${path}`)}
                >
                    {overrideText[path] ? overrideText[path] : path}
                </Dropdown.Item>
            );
        };

        const pageTabList = generateTabsFromList(pagePaths);
        const actionTabList = generateTabsFromList(actionPaths);
        return [...pageTabList, <Dropdown.Divider/>, ...actionTabList];
    }, [pagePaths, actionPaths, overrideText, pathName, navigate]);  

    return (
        <DropdownButton id='dropdown-basic-button' title='Navigation'>
            {dropdownTabs}
            <Dropdown.Divider/>
            <button onClick={signOut} className='dropdown-item'>Log Out</button>
        </DropdownButton>
    );
}

export default withAuthenticator(NavigationDropdown);