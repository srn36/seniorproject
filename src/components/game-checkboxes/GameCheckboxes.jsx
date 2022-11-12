import React, { useState } from 'react';
import { CheckboxField, Flex } from '@aws-amplify/ui-react';
import { games } from '../../helper/game-selection';
import CheckboxLabel from './CheckboxLabel';

function GameCheckboxes({ validationErrors }) {
    const allFalseCheckValues = games.map(_game => false);
    const [selectedGames, setSelectedGames] = useState(allFalseCheckValues);

    const handleGameChecked = (index, e) => {
        const newSelectedGames = Object.keys(selectedGames).map(gameIndex => {
            return gameIndex === index ? e.target.checked : selectedGames[gameIndex];
        });
        setSelectedGames(newSelectedGames);
    };

    const gamesKeys = Object.keys(games);
    const checkboxesFromGames = gamesKeys.map(index => {
        const gameTitle = games[index].title;
        return (
            // This check ensures that the error message is only displayed once instead of after each checkbox
            parseInt(index) === (gamesKeys.length - 1) ?
                <CheckboxField
                    errorMessage={validationErrors.game || validationErrors[gameTitle]}
                    hasError={!!validationErrors.game || !!validationErrors[gameTitle]}
                    key={index}
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
                :
                <CheckboxField
                    errorMessage={validationErrors[gameTitle]}
                    hasError={!!validationErrors.game || !!validationErrors[gameTitle]}
                    key={index}
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
        );
    });

    return (
        <Flex direction='column' gap='0'>
            {checkboxesFromGames}
        </Flex>
    );
}

export default GameCheckboxes;