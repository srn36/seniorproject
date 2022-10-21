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
    const userInfo = props.userInfo;
    const logOut = () => {
        sessionStorage.removeItem('token');
        return props.setContent(<Navigate to='/login/' />);
    };
    return (
        <div style={{display: 'flex'}}>
            <DropdownButton id="dropdown-basic-button" title="Navigation">
                <Link to='/' className='dropdown-item' state={{userInfo: userInfo}}>Home</Link>
                <Link to='/chat' className='dropdown-item' state={{userInfo: userInfo}}>Chat</Link>
                <Link to={`/profile/${userInfo?.username}`} className='dropdown-item' state={{userInfo: userInfo}}>Profile</Link>
                <Link to={'/requests/'} className='dropdown-item' state={{userInfo: userInfo}}>Friend Requests</Link>
                <button onClick={e => logOut()} className='dropdown-item'>Log Out</button>
            </DropdownButton>
        </div>
    );
}

NavigationBar.propTypes = {
    setContent: PropTypes.func.isRequired
};

export default NavigationBar