import React, { useState } from 'react';
import { CheckboxField, Flex } from '@aws-amplify/ui-react';
import { games } from '../../helper/game-selection';
import CheckboxLabel from './CheckboxLabel';
import { Dropdown } from 'react-bootstrap';

function GameCheckboxes({ validationErrors }) {
    const allFalseCheckValues = {};
    games.forEach(game => allFalseCheckValues[game.title] = false);
    // We have to track which checkboxes are not checked so that we can disable their droprowns
    const [selectedGames, setSelectedGames] = useState(Object.values(allFalseCheckValues));
    const [defaultUsernames, setDefaultUsernames] = useState(allFalseCheckValues);

    // Checkbox event handlers
    const handleGameChecked = (index, e) => {
        const newSelectedGames = Object.keys(selectedGames).map(gameIndex => {
            return gameIndex === index ? e.target.checked : selectedGames[gameIndex];
        });
        setSelectedGames(newSelectedGames);
    };
    const handleUsernameChecked = (gameTitle, e) => {
        const newDefaultUsernames = {};
        Object.keys(defaultUsernames).forEach(title => {
            newDefaultUsernames[title] = title === gameTitle ? e.target.checked : defaultUsernames[title];
        });
        setDefaultUsernames(newDefaultUsernames);
    }

    const gamesKeys = Object.keys(games);
    const checkboxesFromGames = gamesKeys.map(index => {
        const gameTitle = games[index].title;
        // The following check ensures that the error message is only displayed once instead of after each checkbox
        const errorMessage = parseInt(index) === (gamesKeys.length - 1) ?
                                (validationErrors.game || validationErrors[gameTitle])
                                :
                                (validationErrors[gameTitle]);
 
        return (
            <React.Fragment key={index}>
                <Dropdown.Divider/>
                <div className={`checkbox-grid-${!!selectedGames[index]}`}>
                    <CheckboxField
                        className='checkbox'
                        errorMessage={errorMessage}
                        hasError={!!validationErrors.game || !!validationErrors[gameTitle]}
                        name={gameTitle}
                        label={
                            <CheckboxLabel {
                                ...{
                                    'disable': !selectedGames[index],
                                    'hasError': !!validationErrors[gameTitle],
                                    ...games[index]
                                }
                            }/>
                        }
                        value='game-selected'
                        onChange={e => handleGameChecked(index, e)}
                    />
                    {
                        !!selectedGames[index] &&
                        <CheckboxField
                            className='username-select'
                            id={`${gameTitle}-Default-Username`}
                            errorMessage={validationErrors[`${gameTitle}-Username`]}
                            hasError={!!validationErrors[`${gameTitle}-Username`]}
                            name={`${gameTitle}-Default-Username`}
                            label={
                                <div>
                                    <p>Use site username</p>
                                    <input
                                        name={`${gameTitle}-Username`}
                                        type='text'
                                        className='form-control'
                                        placeholder='Username'
                                        disabled={defaultUsernames[gameTitle]}
                                    />
                                </div>
                            }
                            value='default-username'
                            onChange={e => handleUsernameChecked(gameTitle, e)}
                        />                       
                    }
                </div>
            </React.Fragment>
        );
    });

    return (
        <Flex direction='column' gap='0'>
            {checkboxesFromGames}
        </Flex>
    );
}

export default GameCheckboxes;