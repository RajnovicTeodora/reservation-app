// assets
import { IconHome, IconHomePlus } from '@tabler/icons';

const hostMenuItems = {
    items: [
        {
            id: 'hostMenuItems',
            title: 'Menu Items',
            type: 'group',
            children: [
                {
                    id: 'host-accommodations',
                    title: 'Accommodations',
                    type: 'item',
                    url: '/main/host/accommodations/all',
                    icon: IconHome,
                    breadcrumbs: false,
                },
                {
                    id: 'host-accommodations-create',
                    title: 'Create Accomodation',
                    type: 'item',
                    url: '/main/host/accommodations/create',
                    icon: IconHomePlus,
                    breadcrumbs: false,
                },
            ],
        },
    ],
};

export default hostMenuItems;
