import UnavilabilityAccomodationTabel from '../views/host-view/tabels/UnavilabilityAccomodationTabel';

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const UnavilabilityRoutes = {
    path: '/',
    element: <UnavilabilityAccomodationTabel />,
    children: [
        {
            path: '/pages/unavilability/unavilabilityTable',
            element: <UnavilabilityAccomodationTabel />,
        },
    ],
};

export default UnavilabilityRoutes;
