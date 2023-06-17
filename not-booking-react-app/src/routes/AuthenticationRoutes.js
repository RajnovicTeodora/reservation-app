import { lazy } from 'react';

// project imports
import Loadable from '../ui-component/Loadable';
import Unregistered from '../layout/Unregistered';

const Login = Loadable(lazy(() => import('../views/shared-view/auth-forms/Login3')));
const Register = Loadable(lazy(() => import('../views/shared-view/auth-forms/Register')));
const Welcome = Loadable(lazy(() => import('../views/shared-view/Welcome')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
    path: '/',
    element: <Unregistered />,
    children: [
        {
            path: '/',
            element: <Welcome />,
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
