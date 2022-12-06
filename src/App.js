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
import GameCheckboxes from './components/signup-components/game-checkboxes/GameCheckboxes';
import { Auth, Storage } from 'aws-amplify';
import PrivacySelection from './components/signup-components/PrivacySelection';
import ProfilePictureUpload from './components/signup-components/ProfilePictureUpload';
import { validateBirthday } from './helper/birthdate-validation';

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
                                <ProfilePictureUpload onImageChange={onImageChange}/>
                                <Divider/>
                                <PrivacySelection/>
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
                    const selectedConsoles = Object.keys(formData).filter(dataKey => formData[dataKey] === 'console-selected');
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
                    

                    // Check that user is 13 years old
                    const birthdate = formData.birthdate || '';
                    const birthdateValid = validateBirthday(birthdate);
                    if(!(birthdateValid.valid)) {
                        validateErrors['birthdate'] = `${birthdateValid.message}`;
                    }
                    
                    if (Object.keys(validateErrors).length > 0) {
                        return validateErrors;
                    }
                },
                async handleSignUp(formData) {
                    let { username, password, attributes } = formData;
                    attributes['custom:bio'] = '';

                    const profilePicKey = `${username}-profilepic`;
                    const backendAttributes = {
                        username: username,
                        password: password,
                        email: attributes['email'],
                        birthday: attributes['birthdate'],
                        firstname: attributes['first_name'],
                        lastname: attributes['given_name'],
                        biography: ''
                    }

                    const postsBlob = new Blob([], {type: 'text/plain'});
                    const postsFile = new File([postsBlob], `${username}-posts.txt`, {type: 'text/plain'});

                    const signUpRequests = [
                        Auth.signUp({
                            username,
                            password,
                            attributes,
                            autoSignIn: {
                                enabled: true,
                            }
                        }),
                        Storage.put(profilePicKey, pictureFile, {
                            contentType: 'image/png',
                        }),
                        Storage.put(`${username}-posts.txt`, postsFile, {
                            contentType: 'text/plain',
                        }),
                        Promise.resolve(backendAttributes) //TODO: Real call to backend
                    ];
                    
                    return Promise.allSettled(signUpRequests).then(values => {
                        // Determine which, if any, requests need to be retried
                        const retry = Object.keys(values).map(respKey => 
                            (values[respKey].status === 'rejected') ? 
                                signUpRequests[respKey] 
                                : values[respKey].value
                        );
                        
                        /**
                         * Retry any failed requests
                         * Any values from successful requests resolve instantly,
                         * so there is no cost to always running this
                         */
                        return Promise.allSettled(retry).then(values =>
                            values[0].value
                        ).catch(e => 
                            window.alert(`Error signing up for site: ` + e)
                        );
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