import React from 'react';

function ErrorPage(props) {
    return (
        <>
            <h1>It seems the page you're looking for doesn't exist...</h1>
            <h3>
                If you believe this is an error, please report the issue {
                    <a 
                        href='https://github.com/srn36/seniorproject/issues'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        here
                    </a>
                }                
            </h3>
        </>
    );
}

export default ErrorPage;