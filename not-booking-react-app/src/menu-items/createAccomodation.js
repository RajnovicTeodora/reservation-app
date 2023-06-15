// assets
import { IconDashboard } from '@tabler/icons';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const createAccomodation = {
    id: 'createAccomodation',
    title: 'Create accomodation',
    type: 'group',
    children: [
        {
            id: '',
            title: 'Create Accomodation',
            type: 'item',
            url: '/main/host/createAccomodation',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
    ]
};

export default createAccomodation;
