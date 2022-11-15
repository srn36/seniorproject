import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function PageWithNavTabs({ tabs, children }) {
    const path = useLocation().pathname.toLowerCase();
    
    const pathTabs = tabs.map(tab => (
        <Link 
            key={tab}
            to={tab}                    
        >
            <button disabled={path.includes(tab.toLowerCase())}>
                {tab}
            </button>
        </Link>
    ));

    return (
        <div className='base-grid'>
            <div className='tabs'>
                {pathTabs}
            </div>
            <div className='content'>
                {children}
            </div>          
        </div>
    );
}

export default PageWithNavTabs;