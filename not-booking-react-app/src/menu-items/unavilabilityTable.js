// assets
import { IconDashboard } from '@tabler/icons';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const unavilabilityTable = {
    id: 'unavilabilityTable',
    title: 'Table of unavilability',
    type: 'group',
    children: [
        {
            id: '',
            title: 'Table of unavilability',
            type: 'item',
            url: '/main/host/unavilabilityTable',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
    ]
};

export default unavilabilityTable;
