import React from 'react';

function IconButton({ Icon, children, ...props }) {
    const spanProps = {...props};

    let onClick = () => {};
    if(!!spanProps.onClick) {
        onClick = spanProps.onClick;
        delete spanProps.onClick;
    }

    let disable = false;
    if(spanProps.disabled) {
        disable = spanProps.disabled;
        delete spanProps.disabled;
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
                disabled={disable}
            >
                <Icon/>
                {!!children && children}
            </button>
        </span>
    );
}

export default IconButton;