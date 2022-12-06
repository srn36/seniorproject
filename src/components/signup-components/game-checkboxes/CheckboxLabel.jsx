import React, { useMemo, useState } from 'react';
import { CheckboxField } from '@aws-amplify/ui-react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { consoles } from '../../../helper/game-selection';

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


function ConsoleDropdown(title, consoleOptionString, disable, hasError, setSelectionList) {
    const [selections, setSelections] = useState([]);

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
            onChange={() => {
                const selected = selections.filter(name => name !== gameConsole);
                const updateSelections = selected.length === selections.length ? [...selected, gameConsole] : selected;
                setSelections(updateSelections);
                setSelectionList(updateSelections);
            }}
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


function CheckboxLabel(props) {
    const {disable, hasError, icon, title, consoleOptionString} = props;
    const [selectionList, setSelectionList] = useState([]);
    const consoleDropdown = ConsoleDropdown(title, consoleOptionString, disable, hasError, setSelectionList);

    const selectionString = useMemo(() => {
        let str = '';
        selectionList.forEach(select => str = str + `, ${select}`);
        return str.substring(2);
    }, [selectionList]);

    return (
        <div
            className={`game-label-${!!selectionList.length}`}
            onClick={e => e.preventDefault()}
        >
            <img src={icon} alt=''/>
            <p>{title}</p>
            {!!selectionList.length && <p className='selections'>{selectionString}</p>}
            {consoleDropdown}
        </div>
    );
}

export default CheckboxLabel;