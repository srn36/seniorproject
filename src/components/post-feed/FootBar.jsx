import React, { useMemo, useState } from 'react';

function FootBar() {
    const halfHeight = window.innerHeight / 2;
    const [showButton, setShowButton] = useState(false);

    //Logical XOR function
    const xOR = (val1, val2) => {
        return ((!!val1 || !!val2) && !(!!val1 && !!val2));
    }

    //Checks if the threshold for displaying the button has been passed (in either direction).
    //This is to avoid pushing an update to setShowButton unless it is actually necessary
    const handleScroll = _e => {
        const newHeightCheck = window.scrollY >= halfHeight;
        if(xOR(newHeightCheck, showButton)) {
            setShowButton(newHeightCheck);
        }
    }

    window.addEventListener('scroll', handleScroll);

    return useMemo(() => {
        return (
            <div className='App-footer'>
                {
                    showButton && <button className='return' onClick={_e => window.scrollTo(0, 0)}>Return to top</button>
                }
            </div>
        );
    }, [showButton]);
}

export default FootBar;