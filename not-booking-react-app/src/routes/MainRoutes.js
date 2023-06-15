
import MainLayout from "../layout/MainLayout";
import { lazy } from 'react';

import Loadable from '../ui-component/Loadable.js';

// ==============================|| MAIN ROUTING ||============================== //
const CreateAccomodation = Loadable(lazy(() => import('../views/host-view/forms/CreateAccomodation/CreateAccomodation'))); 

const MainRoutes = {
  path: "/main",
  element: <MainLayout />,
  children: [
    {  path: 'host',
    children: [
        {
            path: 'createAccomodation',
            element: <CreateAccomodation />
        }
    ]}
  ],

};

export default MainRoutes;
