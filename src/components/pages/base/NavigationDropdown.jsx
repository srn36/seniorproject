/* 
Use of this component has now been packaged into PageBase, which will serve as a base page.
Load pages with PageBase to automatically have a NavigationBar appended
*/
import React, { useMemo, useRef } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { withAuthenticator } from '@aws-amplify/ui-react';

function NavigationDropdown({ userInfo, signOut }) {
    const closeDropdownRef = useRef(null);
    const pathName = useLocation().pathname.replaceAll('/','').toLowerCase();

    const dropdownTabs = useMemo(() => {
        //To add a tab to the navigation dropdown, simply add the tab's path to tabPaths
        //Add a key, value mapping to overrideText if you want to display different text for a tab
        const tabPaths = ['Home', 'Chat', 'friend-zone'];
        const overrideText = {
            'friend-zone': 'Friend Zone',
        };
        const autoGenFromList = tabPaths.map(path => 
            <Dropdown.Item
                key={path}
                disabled={path.toLowerCase() === pathName || pathName.includes(path.toLowerCase())}
                as={Link}
                to={`/${path}`}
                className='dropdown-item'
                onClick={_e => closeDropdownRef.current.click()}
            >
                {overrideText[path] ? overrideText[path] : path}
            </Dropdown.Item>
        );

        const profilePath = `/profile/${userInfo.username}`;
        const profileTab = (
            <Dropdown.Item
                reloadDocument
                key={profilePath}
                disabled={pathName.includes(profilePath.replaceAll('/','').toLowerCase())}
                as={Link}
                to={profilePath}
                className='dropdown-item'
                onClick={_e => closeDropdownRef.current.click()}
            >
                Profile
            </Dropdown.Item>
        );

        return [
            ...autoGenFromList,
            profileTab
        ];
    }, [userInfo, closeDropdownRef, pathName]);  

    return (
        <DropdownButton id='dropdown-basic-button' title='Navigation' ref={closeDropdownRef}>
            {dropdownTabs}
            <Dropdown.Divider />
            <button onClick={signOut} className='dropdown-item'>Log Out</button>
        </DropdownButton>
    );
}

export default withAuthenticator(NavigationDropdown);