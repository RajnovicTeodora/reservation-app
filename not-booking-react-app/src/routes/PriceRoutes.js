import PriceTable from '../views/host-view/tabels/PriceTable';

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const PriceRoutes = {
    path: '/',
    element: <PriceTable />,
    children: [
        {
            path: '/pages/price/pricesTable',
            element: <PriceTable />,
        },
    ],
};

export default PriceRoutes;
