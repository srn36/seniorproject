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
                border: 'none',
                borderRadius: !!children ? '25% / 50%' : '50%',
            }}
            {...spanProps}
        >
            <button 
                className={`icon-button-${!!children}`}
                onClick={onClick}
            >
                <Icon/>
                {!!children && children}
            </button>
        </span>
    );
}

export default IconButton;