/* Important requirement for using this component:

Whichever page is using this component must be rendered by storing the page data in a State Hook.
For the sake of consistency I recommend calling this Hook 'content'.
Regardless of what the Hook is called, the setter for the Hook must be passed to the setContent prop of NavigationBar.
This is an example implementation of the NavigationBar in a page:

export default function Example() {
    //For the sake of adequately demonstrating usage, my Hook is not called 'content'. Please call your Hook 'content' in real uses.
    const [pageContent, setPageContent] = useState();
    
    useEffect(() => {
        setPageContent(
            <div>
                <NavigationBar setContent={setPageContent} />
                <h4> Hi, this is an example </h4>
            </div>
        );
    }, []);

    return pageContent;
}
*/

import React from "react";
import { Navigate } from "react-router-dom/dist";
import { DropdownButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Home.css';

function NavigationBar(props) {
    const logOut = () => {
        sessionStorage.removeItem('token');
        return props.setContent(<Navigate to='/login/' />);
    };

    return (
        <header className='App-header'>
            <DropdownButton id="dropdown-basic-button" title="Navigation" style={{display: 'flex'}}>
                <Link to='/' className='dropdown-item'>Home</Link>
                <Link to='/chat' className='dropdown-item'>Chat</Link>
                <Link to='/profile' className='dropdown-item'>Profile</Link>
                <button onClick={e => logOut()} className='dropdown-item'>Log Out</button>
            </DropdownButton>
        </header>
    );
}

NavigationBar.propTypes = {
    setContent: PropTypes.func.isRequired
};

export default NavigationBar