import { Auth, API } from 'aws-amplify';
import React from 'react';

let nextToken;

async function listEditors(limit){
    let apiName = 'AdminQueries';
    let path = '/listUsers';
    let myInit = { 
        body: {
            Filter: '',
            Limit: 1000,
            UserPoolId: 'us-east-1_gameon',
        },
        headers: {
          'Content-Type' : 'application/x-amz-json-1.1',
          Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
        }
    }
    const { NextToken, ...rest } = await API.get(apiName, path, myInit);
    nextToken = NextToken;
    console.log(rest);
    return rest;
}


function Chat(props) {

    
    
    return (
        <>
            <h4>Chat Page</h4>
            <button onClick={_e => listEditors(10)}>test</button>
        </>
    );
}

export default Chat;