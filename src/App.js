import routes from './helper/routes';
import { RouterProvider } from 'react-router-dom';

function App() {
    const router = routes();
    return <RouterProvider router={router} />;
}

export default App;