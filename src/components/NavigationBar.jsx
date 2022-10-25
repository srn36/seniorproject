/* 
Use of this component has now been packaged into AuthRoute, which will serve as a base page.
Load pages with AuthRoute to automatically have a NavigationBar appended
*/
import React, { useRef } from "react";
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function NavigationBar(props) {
    const userInfo = props.userInfo;
    const closeDropdownRef = useRef(null);

    const logOut = () => {
        localStorage.removeItem('token');
        props.navigate('/login/');
    };

    return (
        <DropdownButton id="dropdown-basic-button" title="Navigation" ref={closeDropdownRef}>
            <Link
                to='/'
                className='dropdown-item'
                onClick={_e => closeDropdownRef.current.click()}
                state={{userInfo: userInfo}}
            >
                Home
            </Link>
            <Link
                to='/chat'
                className='dropdown-item'
                onClick={_e => closeDropdownRef.current.click()}
                state={{userInfo: userInfo}}
            >
                Chat
            </Link>
            <Link reloadDocument
                to={`/profile/${userInfo?.username}`}
                className='dropdown-item'
                onClick={_e => closeDropdownRef.current.click()}
                state={{userInfo: userInfo}}
            >
                Profile
            </Link>
            <Link
                to='/requests/'
                className='dropdown-item'
                onClick={_e => closeDropdownRef.current.click()}
                state={{userInfo: userInfo}}
            >
                Friend Requests
            </Link>
            <Dropdown.Divider />
            <button onClick={_e => logOut()} className='dropdown-item'>Log Out</button>
        </DropdownButton>
    );
}

NavigationBar.propTypes = {
    navigate: PropTypes.func.isRequired,
    userInfo: PropTypes.any.isRequired
};

export default NavigationBar;