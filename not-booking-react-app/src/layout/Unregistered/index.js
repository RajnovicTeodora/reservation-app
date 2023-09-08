import { Outlet } from 'react-router-dom';

// project imports
import UHeader from './UHeader';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { AppBar, Box, CssBaseline, Toolbar } from '@mui/material';

//import navigation from 'menu-items';
import { drawerWidth } from '../../store/constant';
import ParticlesBg from 'particles-bg';
import { ModalProvider } from 'react-simple-modal-provider';
import modals from '../../ui-component/modals';

// constant

const Main = styled('main')(({ theme }) => ({
    ...theme.typography.mainContentTransparent,
    ...{
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        [theme.breakpoints.up('md')]: {
            marginLeft: '20px',
            width: `calc(100% - ${drawerWidth}px)`,
        },
        [theme.breakpoints.down('md')]: {
            marginLeft: '20px',
            width: `calc(100% - ${drawerWidth}px)`,
            padding: '16px',
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '10px',
            width: `calc(100% - ${drawerWidth}px)`,
            padding: '16px',
            marginRight: '10px',
        },
    },
}));

const Unregistered = () => {
    const theme = useTheme();
    return (
        <ModalProvider value={modals}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                {/* header */}
                <AppBar
                    enableColorOnDark
                    position="fixed"
                    color="inherit"
                    elevation={0}
                    sx={{
                        zIndex: 0,
                        bgcolor: theme.palette.background.default,
                        transition: 'none',
                    }}
                >
                    <Toolbar>
                        <UHeader />
                    </Toolbar>
                </AppBar>

                {/* main content */}
                <Main
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <ParticlesBg type="circle" bg={true} />
                    <Outlet />
                </Main>
            </Box>
        </ModalProvider>
    );
};

export default Unregistered;
