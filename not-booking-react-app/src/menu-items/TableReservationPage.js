// assets
import { IconDashboard } from '@tabler/icons';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const tableOfReservations = {
    id: 'tableOfReservations',
    title: 'Table of reservation',
    type: 'group',
    children: [
        {
            id: '',
            title: 'Table of reservation',
            type: 'item',
            url: '/main/guest/table_reservation_page',
            icon: icons.IconDashboard,
            breadcrumbs: false,
        },
    ],
};

export default tableOfReservations;
