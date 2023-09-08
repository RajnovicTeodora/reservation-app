import MainLayout from '../layout/MainLayout';
import Accommodations from '../views/shared-view/accommodations-view/Accommodations';
import AccommodationView from '../views/shared-view/accommodations-view/accommodation-view/AccommodationView';
import CreateRequest from '../views/guest-view/forms/CreateRequest';
import RequestsForApprovingPage from '../views/host-view/pages/RequestsForApprovingPage';
import TableRequestPage from '../views/guest-view/pages/TableRequestsPage';
import TableReservationPage from '../views/guest-view/pages/TableReservationPage';
import SamplePage from '../views/shared-view/sample-page';
import UserProfile from '../views/shared-view/UserProfile';
import CreateAccomodation from '../views/host-view/forms/CreateAccomodation/CreateAccomodation';
import PriceTable from '../views/host-view/tabels/PriceTable';
import UnavilabilityAccomodationTabel from '../views/host-view/tabels/UnavilabilityAccomodationTabel';

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/main',
    element: <MainLayout allowedRoles={['HOST', 'GUEST']} />,
    children: [
        {
            path: '/main',
            element: <SamplePage />,
        },
        {
            path: 'host',
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
                    path: 'prices',
                    element: <PriceTable allowedRoles={['HOST']} />,
                },
                {
                    path: 'requests',
                    element: <RequestsForApprovingPage allowedRoles={['HOST']} />,
                },
                {
                    path: 'unavaliability',
                    element: <UnavilabilityAccomodationTabel allowedRoles={['HOST']} />,
                },
            ],
        },
        {
            path: 'guest',
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
                    ],
                },
                {
                    path: 'requests',
                    element: <TableRequestPage allowedRoles={['GUEST']} />,
                },
                {
                    path: 'reservations',
                    element: <TableReservationPage allowedRoles={['GUEST']} />,
                },
                {
                    path: 'create',
                    element: <CreateRequest allowedRoles={['GUEST']} />,
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
