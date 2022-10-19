/* 
Use of this component has now been packaged into AuthRoute, which will serve as a base page.
Load pages with AuthRoute to automatically have a NavigationBar appended
*/

import React from "react";
import { Navigate } from "react-router-dom/dist";
import { DropdownButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import smallLogo from '../smollogo.png';

function NavigationBar(props) {
    const logOut = () => {
        sessionStorage.removeItem('token');
        return props.setContent(<Navigate to='/login/' />);
    };
//style={{display: 'flex'}}
    return (
        <div>
            <DropdownButton id="dropdown-basic-button" title="Navigation">
                <Link to='/' className='dropdown-item'>Home</Link>
                <Link to='/chat' className='dropdown-item'>Chat</Link>
                <Link to={`/profile/${props.username}`} className='dropdown-item'>Profile</Link>
                <button onClick={e => logOut()} className='dropdown-item'>Log Out</button>
            </DropdownButton>
            <img src={smallLogo} height="50" width="auto" alt="logo"/>
        </div>
    );
}

NavigationBar.propTypes = {
    setContent: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired
};

export default NavigationBar