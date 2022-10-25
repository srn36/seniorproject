/* 
Use of this component has now been packaged into AuthRoute, which will serve as a base page.
Load pages with AuthRoute to automatically have a NavigationBar appended
*/
import React, { useRef } from "react";
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function NavigationDropdown(props) {
    const userInfo = props.userInfo;
    const closeDropdownRef = useRef(null);

    const logOut = () => {
        localStorage.removeItem('token');
        props.navigate('/login/');
    };

    //To add a tab to the navigation dropdown, simply add the tab's path to tabPaths
    //Add a key, value mapping to overrideText if you want to display different text for a tab
    const tabPaths =['Home', 'Chat', 'Requests'];
    const overrideText = {
        'Requests': 'Friend Requests',
    };
    const autoGenTabs = tabPaths.map(path => 
        <Link
            to={`/${path}/`}
            className='dropdown-item'
            onClick={_e => closeDropdownRef.current.click()}
            state={{userInfo: userInfo}}
        >
            {overrideText[path] ? overrideText[path] : path}
        </Link>
    );

    return (
        <DropdownButton id="dropdown-basic-button" title="Navigation" ref={closeDropdownRef}>
            {autoGenTabs}
            <Link reloadDocument
                to={`/profile/${userInfo.username}`}
                className='dropdown-item'
                onClick={_e => closeDropdownRef.current.click()}
                state={{userInfo: userInfo}}
            >
                Profile
            </Link>
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