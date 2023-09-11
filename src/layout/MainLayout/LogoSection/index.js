import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { ButtonBase } from '@mui/material';

// project imports
import config from '../../../config';
import Logo from '../../../ui-component/Logo';
import { MENU_OPEN } from '../../../store/actions';
import { useState } from 'react';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => {
    const defaultId = useSelector((state) => state.customization.defaultId);
    const dispatch = useDispatch();
    const [user] = useState(JSON.parse(localStorage.getItem('user')));
    const path = user ? '/main' : config.defaultPath;
    return (
        <ButtonBase
            disableRipple
            onClick={() => dispatch({ type: MENU_OPEN, id: defaultId })}
            component={Link}
            to={path}
        >
            <Logo sx={{ borderRadius: '27px' }} />
        </ButtonBase>
    );
};

export default LogoSection;
