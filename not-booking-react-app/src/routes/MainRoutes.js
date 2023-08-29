import MainLayout from '../layout/MainLayout';
import { lazy } from 'react';

import Loadable from '../ui-component/Loadable.js';
import Accommodations from '../views/shared-view/accommodations-view/Accommodations';
import AccommodationView from '../views/shared-view/accommodations-view/accommodation-view/AccommodationView';
import CreateRequest from '../views/guest-view/forms/CreateRequest';
import RequestsForApprovingPage from '../views/host-view/pages/RequestsForApprovingPage';
import TableRequestPage from '../views/guest-view/pages/TableRequestsPage';
import TableReservationPage from '../views/guest-view/pages/TableReservationPage';

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
            path: '/main',
            element: <Accommodations />,
        },
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
                    element: <CreateAccomodation allowedRoles={['host']} />,
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
                {
                    // mislim da ovde ide guest
                    path: 'request',
                    element: <CreateRequest />,
                },
                {
                    path: 'request_page',
                    element: <RequestsForApprovingPage />,
                },
            ],
        },
        {
            path: 'guest',
            children: [
                {
                    path: 'table_request_page',
                    element: <TableRequestPage />,
                },
                {
                    path: 'table_reservation_page',
                    element: <TableReservationPage />,
                },
                {
                    path: 'request',
                    element: <CreateRequest />,
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
