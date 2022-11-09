import React, { useState } from 'react';
import { CheckboxField, Flex, /* View */ } from '@aws-amplify/ui-react';
import placeholderImg from '../../logo192.png';

export const gamesList = [
    {icon: placeholderImg, title: 'Game 00'},
    {icon: placeholderImg, title: 'Game 01'},
    {icon: placeholderImg, title: 'Game 02'},
    {icon: placeholderImg, title: 'Game 03'},
    {icon: placeholderImg, title: 'Game 04'},
    {icon: placeholderImg, title: 'Game 05'},
    {icon: placeholderImg, title: 'Game 06'},
    {icon: placeholderImg, title: 'Game 07'},
    {icon: placeholderImg, title: 'Game 08'},
    {icon: placeholderImg, title: 'Game 09'},
    {icon: placeholderImg, title: 'Game 10'},
    {icon: placeholderImg, title: 'Game 11'},
    {icon: placeholderImg, title: 'Game 12'},
    {icon: placeholderImg, title: 'Game 13'},
    {icon: placeholderImg, title: 'Game 14'}
];


export function GameCheckboxes({ validationErrors }) {
    const allFalseCheckValues = gamesList.map(_game => false);
    //const allTrueCheckValues = gamesList.map(_game => true);
    const [selectedGames, setSelectedGames] = useState(allFalseCheckValues);

    const handleGameChecked = (index, e) => {
        const newSelectedGames = Object.keys(selectedGames).map(gameIndex => {
            return gameIndex === index ? e.target.checked : selectedGames[gameIndex];
        });
        setSelectedGames(newSelectedGames);
    };

    const gameListKeys = Object.keys(gamesList);
    const checkBoxesFromGameList = gameListKeys.map(index => {
        return (
            // This check ensures that the error message is only displayed once instead of after each checkbox
            parseInt(index) === (gameListKeys.length - 1) ?
                <CheckboxField
                    errorMessage={validationErrors.game}
                    hasError={!!validationErrors.game}
                    key={index}
                    name={gamesList[index].title}
                    label={gamesList[index].title}
                    value='game-selected'
                    onChange={e => handleGameChecked(index, e)}
                />
                :
                <CheckboxField
                    hasError={!!validationErrors.game}
                    key={index}
                    name={gamesList[index].title}
                    label={gamesList[index].title}
                    value='game-selected'
                    onChange={e => handleGameChecked(index, e)}
                />
        );
    });

    return (
        <Flex direction='column' gap='0'>
            {/* <CheckboxField
                errorMessage={validationErrors.game}
                hasError={!!validationErrors.game}
                name='games'
                label='All Games'
                value={[...selectedGames]}
                checked={allChecked}
                onChange={handleAllGamesChange}
            />
            <View paddingLeft='25px'>               
                {checkBoxesFromGameList}
            </View> */}

            {checkBoxesFromGameList}
        </Flex>
    );
}