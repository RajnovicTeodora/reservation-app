import Unregistered from "../layout/Unregistered";
/* import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));
*/
// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
    path: '/',
    element: <Unregistered />,
    children: [
        {
            path: '/pages/login/login3',
            element: <Unregistered />
        },
        {
            path: '/pages/register/register3',
            element: <Unregistered />
        }
    ]
};

export default AuthenticationRoutes;
 