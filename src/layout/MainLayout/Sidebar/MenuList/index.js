// material-ui
import { Typography } from '@mui/material';

// project imports
import NavGroup from './NavGroup';
//import menuItem from '../../../../menu-items';
import hostMenuItems from '../../../../menu-items/hostMenuItems';
import guestMenuItems from '../../../../menu-items/guestMenuItems';
import { useState } from 'react';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
    const [userType] = useState(JSON.parse(localStorage.getItem('user')).userType);
    const menuItems = userType == 'HOST' ? hostMenuItems : guestMenuItems;
    const navItems = menuItems.items.map((item) => {
        switch (item.type) {
            case 'group':
                return <NavGroup key={item.id} item={item} />;
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    });

    return <>{navItems}</>;
};

export default MenuList;
