import { CheckboxField } from '@aws-amplify/ui-react';
import React from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { consoles } from '../../helper/game-selection';

function optionStringToConsoles(optionString) {
    if(optionString.length !== consoles.length) {
        throw new Error(`Expected Option String of length ${consoles.length}. Received string with length ${optionString.length}.`);
    }

    const optionsAsArray = [...optionString];
    let consoleOptions = [];
    Object.keys(optionsAsArray).forEach(index => {
        const optionSelected = parseInt(optionsAsArray[index]) === 1;
        if(optionSelected) {
            consoleOptions = [consoles[index], ...consoleOptions];
        }
    });

    if(consoleOptions.length === 0) {
        throw new Error('No console options provided.');
    }

    return consoleOptions;
}

// eslint-disable-next-line
function ConsoleDropdown(title, consoleOptionString, disable, hasError) {
    let consoleOptions = [];
    try {
        consoleOptions = optionStringToConsoles(consoleOptionString);
    } catch(e) {
        console.error(e);
    }   
    const consoleDropdownItems = consoleOptions.map(gameConsole => 
        <Dropdown.Item
            as={CheckboxField}
            key={gameConsole}
            className='dropdown-item'
            hasError={hasError}
            name={`${title}-${gameConsole}`}
            label={gameConsole}
            value='console-selected'
        />
    );
    return (
        <DropdownButton
            id={`dropdown-basic-button-${title}`}
            title='Console'
            autoClose='outside'
            disabled={disable}
            onClick={e => {
                if(disable || e.target.className === 'dropdown-menu show') {
                    e.preventDefault();
                } else if(e.target.className !== 'dropdown-toggle btn btn-primary') {
                    e.stopPropagation();
                }
            }}
        >
            {consoleDropdownItems}
        </DropdownButton>
    );
}

// eslint-disable-next-line
function ConsoleDropdownWithUsername(title, consoleOptionString, disable, hasError) {
    let consoleOptions = [];
    try {
        consoleOptions = optionStringToConsoles(consoleOptionString);
    } catch(e) {
        console.error(e);
    }   
    const consoleDropdownItems = consoleOptions.map(gameConsole => 
        <Dropdown.Item
            as={CheckboxField}
            key={gameConsole}
            className='dropdown-item'
            hasError={hasError}
            name={`${title}-${gameConsole}`}
            label={gameConsole}
            value='console-selected'
        />
    );
    return (
        <DropdownButton
            id={`dropdown-basic-button-${title}`}
            title='Console'
            autoClose='outside'
            disabled={disable}
            onClick={e => {
                if(disable || e.target.className === 'dropdown-menu show') {
                    e.preventDefault();
                } else if(e.target.className !== 'dropdown-toggle btn btn-primary') {
                    e.stopPropagation();
                }
            }}
        >
            {consoleDropdownItems}
            <Dropdown.Divider/>
            <div key='Username'>
                <input
                    name={`${title}-Username`}
                    type='text'
                    className='form-control'
                    placeholder='Username'
                />
            </div>
        </DropdownButton>
    );
}


function CheckboxLabel(props) {
    const {disable, hasError, icon, title, consoleOptionString} = props;
    const consoleDropdown = ConsoleDropdownWithUsername(title, consoleOptionString, disable, hasError);

    return (
        <div
            className='game-label'
            onClick={e => e.preventDefault()}
        >
            <img src={icon} alt=''/>
            <p>{title}</p>
            {consoleDropdown}
        </div>
    );
}

export default CheckboxLabel;