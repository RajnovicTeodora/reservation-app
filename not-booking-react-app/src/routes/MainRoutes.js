import MainLayout from '../layout/MainLayout';
import { lazy } from 'react';

import Loadable from '../ui-component/Loadable.js';
import Accommodations from '../views/shared-view/accommodations-view/Accommodations';
import AccommodationView from '../views/shared-view/accommodations-view/accommodation-view/AccommodationView';

// ==============================|| MAIN ROUTING ||============================== //
const UnavilabilityAccomodationTabel = Loadable(
    lazy(() => import('../views/host-view/tabels/UnavilabilityAccomodationTabel'))
);
const PriceTable = Loadable(lazy(() => import('../views/host-view/tabels/PriceTable')));
const CreateAccomodation = Loadable(
    lazy(() => import('../views/host-view/forms/CreateAccomodation/CreateAccomodation'))
);
const UserProfile = Loadable(lazy(() => import('../views/shared-view/UserProfile')));

const MainRoutes = {
    path: '/main',
    element: <MainLayout />,
    children: [
        {
            path: 'accommodations',
            children: [
                {
                    path: 'all',
                    element: <Accommodations />,
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

        {
            path: 'host',
            children: [
                {
                    path: 'un',
                    element: <UnavilabilityAccomodationTabel />,
                },
                {
                    path: 'pricesTable',
                    element: <PriceTable />,
                },
            ],
        },
        {
            path: 'profile',
            element: <UserProfile />,
        },
    ],
};

export default MainRoutes;
