import { IconHomePlus } from '@tabler/icons';

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const requestTable = {
    id: 'requestTable',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'request ',
            type: 'item',
            url: '/main/requestTable/get',
            icon: IconHomePlus,
            breadcrumbs: false,
        },
    ],
};

export default requestTable;
