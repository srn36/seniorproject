/* 
Use of this component has now been packaged into AuthRoute, which will serve as a base page.
Load pages with AuthRoute to automatically have a NavigationBar appended
*/

import React from "react";
import { Navigate } from "react-router-dom/dist";
import { DropdownButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function NavigationBar(props) {
    const logOut = () => {
        sessionStorage.removeItem('token');
        return props.setContent(<Navigate to='/login/' />);
    };

    return (
        <div>
            <DropdownButton id="dropdown-basic-button" title="Navigation" style={{display: 'flex'}}>
                <Link to='/' className='dropdown-item'>Home</Link>
                <Link to='/chat' className='dropdown-item'>Chat</Link>
                <Link to={`/profile/${props.username}`} className='dropdown-item'>Profile</Link>
                <button onClick={e => logOut()} className='dropdown-item'>Log Out</button>
            </DropdownButton>
            <img src="/Users/surbhi/Clone/seniorproject/src/smollogo.png" align="left"/>
        </div>
    );
}

NavigationBar.propTypes = {
    setContent: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired
};

export default NavigationBar