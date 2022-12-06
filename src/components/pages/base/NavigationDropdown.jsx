import React, { useCallback, useMemo } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';

function NavigationDropdown({ userInfo }) {
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
            'make-post': 'Make a Post',
            [profilePath]: 'Profile',
        };

        return {
            'pagePaths': pagePathArray,
            'actionPaths': actionPathArray,
            'overrideText': override
        };
    }, [profilePath]);

    const generateTabsFromList = useCallback((tabPaths) => {
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
    }, [pathName, navigate, overrideText]);

    const dropdownTabs = useMemo(() => {
        const pageTabList = generateTabsFromList(pagePaths);
        const actionTabList = generateTabsFromList(actionPaths);
        return [
            ...pageTabList,
            <Dropdown.Divider key='divider'/>,
            ...actionTabList
        ];
    }, [pagePaths, actionPaths, generateTabsFromList]);

    return (
        <DropdownButton id='dropdown-basic-button' title='Navigation'>
            {dropdownTabs}
            <Dropdown.Divider/>
            <button onClick={() => (Auth.signOut()).then(() => navigate('/'))} className='dropdown-item'>Log Out</button>
        </DropdownButton>
    );
}

export default NavigationDropdown;