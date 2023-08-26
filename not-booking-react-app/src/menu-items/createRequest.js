import { IconHomePlus } from '@tabler/icons';

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const createRequest = {
    id: 'createRequest',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'request ',
            type: 'item',
            url: '/main/request/create',
            icon: IconHomePlus,
            breadcrumbs: false,
        },
    ],
};

export default createRequest;
