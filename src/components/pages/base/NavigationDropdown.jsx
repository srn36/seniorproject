/* 
Use of this component has now been packaged into AuthRoute, which will serve as a base page.
Load pages with AuthRoute to automatically have a NavigationBar appended
*/
import React, { useMemo, useRef } from "react";
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

function NavigationDropdown(props) {
    const userInfo = props.userInfo;
    const closeDropdownRef = useRef(null);
    const pathName = useLocation().pathname.replaceAll('/','').toLowerCase();

    const logOut = () => {
        localStorage.removeItem('token');
        props.navigate('/login/');
    };

    const autoGenTabs = useMemo(() => {
        //To add a tab to the navigation dropdown, simply add the tab's path to tabPaths
        //Add a key, value mapping to overrideText if you want to display different text for a tab
        const tabPaths =['Home', 'Chat', 'Requests'];
        const overrideText = {
            'Requests': 'Friend Requests',
        };
        const tabsFromList = tabPaths.map(path => 
            <Dropdown.Item
                key={path}
                disabled={path.toLowerCase() === pathName}
                as={Link}
                to={`/${path}/`}
                className='dropdown-item'
                onClick={_e => closeDropdownRef.current.click()}
                state={{userInfo: userInfo}}
            >
                {overrideText[path] ? overrideText[path] : path}
            </Dropdown.Item>
        );

        const profilePath = `/profile/${userInfo.username}`;
        const profileItem = (
            <Dropdown.Item
                reloadDocument
                key={profilePath}
                disabled={profilePath.replaceAll('/','').toLowerCase() === pathName}
                as={Link}
                to={profilePath}
                className='dropdown-item'
                onClick={_e => closeDropdownRef.current.click()}
                state={{userInfo: userInfo}}
            >
                Profile
            </Dropdown.Item>
        );

        return [
            ...tabsFromList,
            profileItem
        ];
    }, [userInfo, closeDropdownRef, pathName])  

    return (
        <DropdownButton id="dropdown-basic-button" title="Navigation" ref={closeDropdownRef}>
            {autoGenTabs}
            <Dropdown.Divider />
            <button onClick={_e => logOut()} className='dropdown-item'>Log Out</button>
        </DropdownButton>
    );
}

NavigationDropdown.propTypes = {
    navigate: PropTypes.func.isRequired,
    userInfo: PropTypes.any.isRequired
};

export default NavigationDropdown;