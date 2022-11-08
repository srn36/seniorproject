import routes from './helper/routes';
import bg from './BG.jpeg';
import { RouterProvider } from 'react-router-dom';
import { withAuthenticator, View } from '@aws-amplify/ui-react';

function App({ signOut }) {
    const router = routes();
    return (
        <View>
            <main>
                <img className='background-pic' src={bg} alt='' />
            </main>
            <RouterProvider router={router} />
        </View>
    );
}

export default withAuthenticator(App);