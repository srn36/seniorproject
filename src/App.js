import routes from './helper/routes';
import bg from './BG.jpeg';
import { RouterProvider } from 'react-router-dom';
import { 
    View,
    Authenticator,
    CheckboxField,
    useAuthenticator
} from "@aws-amplify/ui-react";

function App() {
    const router = routes();

    return (
        <Authenticator
            // Default to Sign Up screen
            initialState="signIn"
            // Customize `Authenticator.SignUp.FormFields`
            components={{
                SignUp: {
                    FormFields() {
                        const { validationErrors } = useAuthenticator();
            
                        return (
                            <>
                                <Authenticator.SignUp.FormFields />

                                {/* Append & require Terms & Conditions field to sign up  */}
                                <CheckboxField
                                    errorMessage={validationErrors.acknowledgement}
                                    hasError={!!validationErrors.acknowledgement}
                                    name="acknowledgement"
                                    value="yes"
                                    label="I agree with the Terms & Conditions"
                                />

                                <CheckboxField
                                    name="cat"
                                    label="Cat"
                                    value="cat"
                                    onChange={console.log('check')}
                                />
                            </>
                        );
                    },
                },
            }}
            services={{
                async validateCustomSignUp(formData) {
                    if (!formData.acknowledgement) {
                        return {
                            acknowledgement: 'You must agree to the Terms & Conditions',
                        };
                    }
                },
            }}
        >
            {({ signOut, user }) => (
                <View>
                    <main>
                        <img className="background-pic" src={bg} alt="" />
                    </main>
                    <div className='App'>
                        <RouterProvider router={router} />
                    </div>
                </View>
            )}
        </Authenticator>
    );
}

export default App;