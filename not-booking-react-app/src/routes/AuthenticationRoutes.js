import { lazy } from 'react';

// project imports
import Loadable from '../ui-component/Loadable';
import Unregistered from '../layout/Unregistered';
import Accommodations from '../views/shared-view/accommodations-view/Accommodations';

const Login = Loadable(lazy(() => import('../views/shared-view/auth-forms/Login3')));
const Register = Loadable(lazy(() => import('../views/shared-view/auth-forms/Register')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
    path: '/',
    element: <Unregistered />,
    children: [
        {
            path: '/',
            element: <Accommodations />,
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
