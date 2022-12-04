import React from 'react';

function IconButton({ Icon, children, ...props }) {
    const spanProps = {...props};
    const hasChildren = !!children;

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
                borderRadius: hasChildren ? '25% / 50%' : '50%',
            }}
            {...spanProps}
        >
            <button 
                className={`icon-button-${hasChildren}`}
                onClick={onClick}
                disabled={disable}
            >
                <Icon/>
                {hasChildren && children}
            </button>
        </span>
    );
}

export default IconButton;