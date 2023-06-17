import { lazy } from 'react';

// project imports
import Loadable from '../ui-component/Loadable';
import Unregistered from '../layout/Unregistered';
import AccommodationsView from '../views/accommodaton-view/AccommodationsView';

const Login = Loadable(lazy(() => import('../views/shared-view/auth-forms/Login3')));
const Register = Loadable(lazy(() => import('../views/shared-view/auth-forms/Register')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
    path: '/',
    element: <Unregistered />,
    children: [
        {
            path: '/',
            element: <AccommodationsView />,
        },
        {
            path: 'login',
            element: <Login />,
        },
        {
            path: 'register',
            element: <Register />,
        },
    ],
};

export default AuthenticationRoutes;
