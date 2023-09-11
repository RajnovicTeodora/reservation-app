// assets
import { IconHome, IconListDetails, IconListCheck } from '@tabler/icons';

const guestMenuItems = {
    items: [
        {
            id: 'guestMenuItems',
            title: 'Menu Items',
            type: 'group',
            children: [
                {
                    id: 'guest-accommodations',
                    title: 'Accommodations',
                    type: 'item',
                    url: '/main/guest/accommodations/all',
                    icon: IconHome,
                    breadcrumbs: false,
                },
                {
                    id: 'guest-reservations',
                    title: 'Reservations',
                    type: 'item',
                    url: '/main/guest/reservations',
                    icon: IconListCheck,
                    breadcrumbs: false,
                },
                {
                    id: 'host-requests',
                    title: 'Request List',
                    type: 'item',
                    url: '/main/guest/requests',
                    icon: IconListDetails,
                    breadcrumbs: false,
                },
            ],
        },
    ],
};

export default guestMenuItems;
