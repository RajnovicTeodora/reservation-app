// assets
import { IconDashboard } from '@tabler/icons';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const priceTable = {
    id: 'priceTable',
    title: 'Table of prices',
    type: 'group',
    children: [
        {
            id: '',
            title: 'Table of prices',
            type: 'item',
            url: '/main/host/pricesTable',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
    ]
};

export default priceTable;
