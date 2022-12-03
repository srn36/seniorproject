import React from 'react';
import routes from './helper/routes';
import bg from './BG.jpeg';
import { RouterProvider } from 'react-router-dom';
import { 
    View,
    Authenticator,
    useAuthenticator,
    Divider
} from '@aws-amplify/ui-react';
import GameCheckboxes from './components/game-checkboxes/GameCheckboxes';
import { Auth, Storage } from 'aws-amplify';

function App() {
    const router = routes();
    let pictureFile;
    
    async function onImageChange(e) {
        pictureFile = e.target.files[0];
    }

    return (
        <Authenticator
            initialState='signIn'
            components={{
                SignUp: {
                    FormFields() {
                        const { validationErrors } = useAuthenticator((context) => [context.validationErrors]);
                        return (
                            <>
                                <Authenticator.SignUp.FormFields/>
                                <Divider/>
                                <input
                                    type='file'
                                    accept='image/*'
                                    onChange={onImageChange}
                                />
                                <Divider/>                    
                                <GameCheckboxes validationErrors={validationErrors}/>
                            </>
                        );
                    },
                },
            }}
            services={{
                async validateCustomSignUp(formData) {
                    const selectedGames = Object.keys(formData).filter(dataKey => formData[dataKey] === 'game-selected');
                    const selectedConsoles = Object.keys(formData).filter(dataKey => formData[dataKey] === 'console-selected')
                    const gameToInfoMap = {};
                    const validateErrors = selectedGames.length > 0 ? {} : {game: 'You must select at least one game'};

                    selectedGames.forEach(gameTitle => {
                        // I can explain, I swear
                        const selectedConsolesForTitle = selectedConsoles.filter(gameConsoleLabel => 
                            gameConsoleLabel.includes(gameTitle)
                        ).map(selectedConsole => 
                            // selectedConsoles has strings formatted as '<gameTitle>-<console>', we want '<console>'
                            selectedConsole.substring(gameTitle.length + 1)
                        );
                        gameToInfoMap[gameTitle] = {
                            'consoles': [...selectedConsolesForTitle],
                        };

                        // Add validation errors
                        if(selectedConsolesForTitle.length === 0) {
                            validateErrors[gameTitle] = `You must select at least one console for ${gameTitle}`;
                        }
                    });

                    if (Object.keys(validateErrors).length > 0) {
                        return validateErrors;
                    }
                },
                async handleSignUp(formData) {
                    let { username, password, attributes } = formData;
                    attributes['custom:privacy'] = 'Private';
                    attributes['custom:bio'] = 'Bio';
                    const profilePicKey = `${username}-profilepic`;
                    
                    return await Storage.put(profilePicKey, pictureFile, {
                        contentType: 'image/png',
                    }).then(async () => 
                        await Auth.signUp({
                            username,
                            password,
                            attributes,
                            autoSignIn: {
                                enabled: true,
                            }
                        })
                    ).catch((error) => {
                        console.log('Error signing up: ', error);
                    });
                },
            }}
        >
            {({ signOut, user }) => (
                <View>
                    <main>
                        <img className='background-pic' src={bg} alt='' />
                    </main>
                    <RouterProvider router={router} />
                </View>
            )}
        </Authenticator>
    );
}

export default App;