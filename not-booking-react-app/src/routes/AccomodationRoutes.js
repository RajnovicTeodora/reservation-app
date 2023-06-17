import CreateAccomodation from '../views/host-view/forms/CreateAccomodation/CreateAccomodation';

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AccomodationRoutes = {
    path: '/',
    element: <CreateAccomodation />,
    children: [
        {
            path: '/pages/accomodation/createAccomodation',
            element: <CreateAccomodation />,
        },
    ],
};

export default AccomodationRoutes;
