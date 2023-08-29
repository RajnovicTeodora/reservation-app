// assets
import { IconDashboard } from '@tabler/icons';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const tableOfRequests = {
    id: 'tableOfRequests',
    title: 'Table of requests',
    type: 'group',
    children: [
        {
            id: '',
            title: 'Table of requests',
            type: 'item',
            url: '/main/guest/table_request_page',
            icon: icons.IconDashboard,
            breadcrumbs: false,
        },
    ],
};

export default tableOfRequests;
