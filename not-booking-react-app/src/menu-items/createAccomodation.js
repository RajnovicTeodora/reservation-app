import { IconHomePlus } from '@tabler/icons';

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const createAccomodation = {
    id: 'createAccomodation',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Create Accomodation',
            type: 'item',
            url: '/main/accommodations/create',
            icon: IconHomePlus,
            breadcrumbs: false,
        },
    ],
};

export default createAccomodation;
