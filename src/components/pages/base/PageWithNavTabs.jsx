import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function PageWithNavTabs({ tabs, children }) {
    const path = useLocation().pathname.toLowerCase();
    const navigate = useNavigate();
    
    const pathTabs = tabs.map(tab => (
        <button 
            key={tab}
            className='tab-button'
            disabled={path.includes(tab.toLowerCase())}
            onClick={() => navigate(tab)}
        >
            {tab}
        </button>
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