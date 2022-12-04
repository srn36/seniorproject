import React from 'react';

function IconButton({ Icon, children, ...props }) {
    const spanProps = {...props};
    let onClick = () => {};
    if(!!spanProps.onClick) {
        onClick = spanProps.onClick;
        delete spanProps.onClick;
    }

    return (
        <span 
            style={{
                background: 'transparent',
                border: 'none'
            }}
            {...spanProps}
        >
            <button 
                className='icon-button'
                onClick={onClick}
            >
                <Icon/>
            </button>
        </span>
    );
}

export default IconButton;