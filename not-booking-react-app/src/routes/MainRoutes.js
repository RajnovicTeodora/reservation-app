import MainLayout from '../layout/MainLayout';
import { lazy } from 'react';

import Loadable from '../ui-component/Loadable.js';
import AccommodationView from '../accommodation/accommodation/AccommodationView';
import AccommodationsView from '../views/accommodaton-view/AccommodationsView';

// ==============================|| MAIN ROUTING ||============================== //
const CreateAccomodation = Loadable(
    lazy(() => import('../views/host-view/forms/CreateAccomodation/CreateAccomodation'))
);

const MainRoutes = {
    path: '/main',
    element: <MainLayout />,
    children: [
        {
            path: 'accommodations',
            children: [
                {
                    path: 'all',
                    element: <AccommodationsView />,
                },
                {
                    path: ':id',
                    element: <AccommodationView />,
                },
                {
                    path: 'create',
                    element: <CreateAccomodation />,
                },
            ],
        },
    ],
};

export default MainRoutes;
