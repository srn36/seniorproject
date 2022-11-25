import { Auth, API } from 'aws-amplify';
import React from 'react';

let nextToken;

async function listEditors(limit){
    let apiName = 'AdminQueries';
    let path = '/listUsersInGroup';
    let myInit = { 
        queryStringParameters: {
          "groupname": "all",
          "limit": limit,
          "token": nextToken
        },
        headers: {
          'Content-Type' : 'application/json',
          Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
        }
    }
    const { NextToken, ...rest } =  await API.get(apiName, path, myInit);
    nextToken = NextToken;
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