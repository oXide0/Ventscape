import { useAuth } from 'hooks/useAuth';
import { RouterProvider } from 'react-router-dom';
import { router } from 'routes/routes';
import Loader from 'components/ui/Loader';

const App = () => {
    const { isLoading } = useAuth();

    return isLoading ? <Loader /> : <RouterProvider router={router} />;
};

export default App;
