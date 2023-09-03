import { useState, useRef, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Chip,
    ClickAwayListener,
    Divider,
    Grid,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    Popper,
    Stack,
    Switch,
    Typography,
} from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from '../../../../ui-component/cards/MainCard';
import Transitions from '../../../../ui-component/extended/Transitions';

// assets
import { IconKey, IconLogout, IconSettings, IconUser } from '@tabler/icons';

import AuthService from '../../../../services/auth.service';
import UserService from '../../../../services/user.service';

import { useModal } from 'react-simple-modal-provider';

import { Message } from 'rsuite';
import { useToaster } from 'rsuite/toaster';

// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = () => {
    const theme = useTheme();
    const toaster = useToaster();
    const customization = useSelector((state) => state.customization);
    const navigate = useNavigate();
    const { open: openModal2 } = useModal('DeleteUserModal');
    const { open: openChangePassword } = useModal('ChangePasswordModal');

    const [notification1, setNotification1] = useState(false);
    const [notification2, setNotification2] = useState(false);
    const [notification3, setNotification3] = useState(false);
    const [notification4, setNotification4] = useState(false);
    const [notification5, setNotification5] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [open, setOpen] = useState(false);
    const [user] = useState(JSON.parse(localStorage.getItem('user')));
    /**
     * anchorRef is used on different componets and specifying one type leads to other components throwing an error
     * */
    const anchorRef = useRef(null);

    const handleLogout = async () => {
        AuthService.logout().then(
            () => {
                navigate('/');
                toaster.push(
                    <Message showIcon type="success">
                        Successfully logged out!
                    </Message>,
                    { placement: 'topEnd' }
                );
            },
            (error) => {
                const resMessage = error.response.data;
                toaster.push(
                    <Message showIcon type="error" closable>
                        {resMessage}
                    </Message>,
                    { placement: 'topEnd' }
                );
            }
        );
    };

    const handleNotification = (checked, type) => {
        switch (type) {
            case 1:
                setNotification1(checked);
                break;
            case 2:
                setNotification2(checked);
                break;
            case 3:
                setNotification3(checked);
                break;
            case 4:
                setNotification4(checked);
                break;
            case 5:
                setNotification5(checked);
                break;
            default:
                break;
        }
        UserService.changeNotification(type).then(
            (response) => {
                toaster.push(
                    <Message showIcon type="success">
                        {response.data}
                    </Message>,
                    { placement: 'topEnd' }
                );
            },
            (error) => {
                const resMessage = error.response.data;
                toaster.push(
                    <Message showIcon type="error" closable>
                        {resMessage}
                    </Message>,
                    { placement: 'topEnd' }
                );
            }
        );
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const handleListItemClick = (event, index, route = '') => {
        setSelectedIndex(index);
        handleClose(event);

        if (route && route !== '') {
            navigate(route);
        }
    };
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        if (open) {
            UserService.checkNotification(user.username).then(
                (response) => {
                    if (user.userType == 'HOST') {
                        setNotification1(response.data.type1);
                        setNotification2(response.data.type2);
                        setNotification3(response.data.type3);
                        setNotification4(response.data.type4);
                    } else {
                        setNotification5(response.data.type5);
                    }
                },
                (error) => {
                    const resMessage = error.response;
                    toaster.push(
                        <Message showIcon type="error" closable>
                            {resMessage}
                        </Message>,
                        { placement: 'topEnd' }
                    );
                }
            );
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <>
            <Chip
                sx={{
                    height: '48px',
                    alignItems: 'center',
                    borderRadius: '27px',
                    transition: 'all .2s ease-in-out',
                    borderColor: theme.palette.secondary.light,
                    backgroundColor: theme.palette.secondary.light,
                    '&[aria-controls="menu-list-grow"], &:hover': {
                        borderColor: theme.palette.secondary.main,
                        background: `${theme.palette.secondary.main}!important`,
                        color: theme.palette.primary.light,
                        '& svg': {
                            stroke: theme.palette.primary.light,
                        },
                    },
                    '& .MuiChip-label': {
                        lineHeight: 0,
                    },
                }}
                icon={
                    <Avatar
                        {...UserService.stringAvatar(user.fullName)}
                        sx={{
                            ...theme.typography.mediumAvatar,
                            margin: '8px 0 8px 8px !important',
                            cursor: 'pointer',
                        }}
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        color="inherit"
                    />
                }
                label={
                    <IconSettings stroke={1.5} size="1.5rem" color={theme.palette.secondary.main} />
                }
                variant="outlined"
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                color="primary"
            />
            <Popper
                placement="bottom-end"
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 14],
                            },
                        },
                    ],
                }}
            >
                {({ TransitionProps }) => (
                    <Transitions in={open} {...TransitionProps}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MainCard
                                    border={false}
                                    elevation={16}
                                    content={false}
                                    boxShadow
                                    shadow={theme.shadows[16]}
                                >
                                    <Box sx={{ p: 2 }}>
                                        <Stack>
                                            <Stack
                                                direction="row"
                                                spacing={0.5}
                                                alignItems="center"
                                            >
                                                <Typography variant="h4">Good Morning,</Typography>
                                                <Typography
                                                    component="span"
                                                    variant="h4"
                                                    sx={{ fontWeight: 400 }}
                                                >
                                                    {user.fullName}
                                                </Typography>
                                            </Stack>
                                            <Typography variant="subtitle2">
                                                {user.userType}
                                            </Typography>
                                        </Stack>
                                    </Box>
                                    <Divider />
                                    <Box sx={{ p: 2, marginBottom: '-30px' }}>
                                        <Typography
                                            component="span"
                                            variant="subtitle1"
                                            sx={{ fontWeight: 400 }}
                                        >
                                            Notifications On
                                        </Typography>
                                    </Box>
                                    <PerfectScrollbar
                                        style={{
                                            height: '100%',
                                            maxHeight: 'calc(100vh - 250px)',
                                            overflowX: 'hidden',
                                        }}
                                    >
                                        <Box sx={{ p: 2 }}>
                                            <Card
                                                sx={{
                                                    bgcolor: theme.palette.primary.light,
                                                    my: 2,
                                                }}
                                            >
                                                <CardContent>
                                                    <Grid container spacing={3} direction="column">
                                                        {user.userType == 'GUEST' && (
                                                            <Grid item>
                                                                <Grid
                                                                    item
                                                                    container
                                                                    alignItems="center"
                                                                    justifyContent="space-between"
                                                                >
                                                                    <Grid item>
                                                                        <Typography variant="subtitle1">
                                                                            Reservation Request
                                                                            Response
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid item>
                                                                        <Switch
                                                                            checked={notification5}
                                                                            onChange={(e) =>
                                                                                handleNotification(
                                                                                    e.target
                                                                                        .checked,
                                                                                    5
                                                                                )
                                                                            }
                                                                            name="sdm"
                                                                            size="small"
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        )}
                                                        {user.userType == 'HOST' && (
                                                            <>
                                                                <Grid item>
                                                                    <Grid
                                                                        item
                                                                        container
                                                                        alignItems="center"
                                                                        justifyContent="space-between"
                                                                    >
                                                                        <Grid item>
                                                                            <Typography variant="subtitle1">
                                                                                New Reservation
                                                                                Request
                                                                            </Typography>
                                                                        </Grid>
                                                                        <Grid item>
                                                                            <Switch
                                                                                checked={
                                                                                    notification1
                                                                                }
                                                                                onChange={(e) =>
                                                                                    handleNotification(
                                                                                        e.target
                                                                                            .checked,
                                                                                        1
                                                                                    )
                                                                                }
                                                                                name="sdm"
                                                                                size="small"
                                                                            />
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid item>
                                                                    <Grid
                                                                        item
                                                                        container
                                                                        alignItems="center"
                                                                        justifyContent="space-between"
                                                                    >
                                                                        <Grid item>
                                                                            <Typography variant="subtitle1">
                                                                                Cancelled
                                                                                Reservation
                                                                            </Typography>
                                                                        </Grid>
                                                                        <Grid item>
                                                                            <Switch
                                                                                checked={
                                                                                    notification2
                                                                                }
                                                                                onChange={(e) =>
                                                                                    handleNotification(
                                                                                        e.target
                                                                                            .checked,
                                                                                        2
                                                                                    )
                                                                                }
                                                                                name="sdm"
                                                                                size="small"
                                                                            />
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid item>
                                                                    <Grid
                                                                        item
                                                                        container
                                                                        alignItems="center"
                                                                        justifyContent="space-between"
                                                                    >
                                                                        <Grid item>
                                                                            <Typography variant="subtitle1">
                                                                                New Host Rating
                                                                            </Typography>
                                                                        </Grid>
                                                                        <Grid item>
                                                                            <Switch
                                                                                checked={
                                                                                    notification3
                                                                                }
                                                                                onChange={(e) =>
                                                                                    handleNotification(
                                                                                        e.target
                                                                                            .checked,
                                                                                        3
                                                                                    )
                                                                                }
                                                                                name="sdm"
                                                                                size="small"
                                                                            />
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid item>
                                                                    <Grid
                                                                        item
                                                                        container
                                                                        alignItems="center"
                                                                        justifyContent="space-between"
                                                                    >
                                                                        <Grid item>
                                                                            <Typography variant="subtitle1">
                                                                                New Accommodation
                                                                                Rating
                                                                            </Typography>
                                                                        </Grid>
                                                                        <Grid item>
                                                                            <Switch
                                                                                checked={
                                                                                    notification4
                                                                                }
                                                                                onChange={(e) =>
                                                                                    handleNotification(
                                                                                        e.target
                                                                                            .checked,
                                                                                        4
                                                                                    )
                                                                                }
                                                                                name="sdm"
                                                                                size="small"
                                                                            />
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                            </>
                                                        )}
                                                    </Grid>
                                                </CardContent>
                                            </Card>
                                            <Divider />
                                            <List
                                                component="nav"
                                                sx={{
                                                    width: '100%',
                                                    maxWidth: 350,
                                                    minWidth: 300,
                                                    backgroundColor: theme.palette.background.paper,
                                                    borderRadius: '10px',
                                                    [theme.breakpoints.down('md')]: {
                                                        minWidth: '100%',
                                                    },
                                                    '& .MuiListItemButton-root': {
                                                        mt: 0.5,
                                                    },
                                                }}
                                            >
                                                <ListItemButton
                                                    sx={{
                                                        borderRadius: `${customization.borderRadius}px`,
                                                    }}
                                                    selected={selectedIndex === 0}
                                                    onClick={openModal2}
                                                >
                                                    <ListItemIcon>
                                                        <IconSettings stroke={3.5} size="1.3rem" />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={
                                                            <Typography variant="subtitle1">
                                                                Delete Account
                                                            </Typography>
                                                        }
                                                    />
                                                </ListItemButton>
                                                <ListItemButton
                                                    sx={{
                                                        borderRadius: `${customization.borderRadius}px`,
                                                    }}
                                                    selected={selectedIndex === 1}
                                                    onClick={openChangePassword}
                                                >
                                                    <ListItemIcon>
                                                        <IconKey stroke={3.5} size="1.3rem" />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={
                                                            <Typography variant="subtitle1">
                                                                Change Password
                                                            </Typography>
                                                        }
                                                    />
                                                </ListItemButton>
                                                <ListItemButton
                                                    sx={{
                                                        borderRadius: `${customization.borderRadius}px`,
                                                    }}
                                                    selected={selectedIndex === 2}
                                                    onClick={(event) =>
                                                        handleListItemClick(
                                                            event,
                                                            2,
                                                            '/main/profile'
                                                        )
                                                    }
                                                >
                                                    <ListItemIcon>
                                                        <IconUser stroke={3.5} size="1.3rem" />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={
                                                            <Grid
                                                                container
                                                                spacing={1}
                                                                justifyContent="space-between"
                                                            >
                                                                <Grid item>
                                                                    <Typography variant="subtitle1">
                                                                        User Profile
                                                                    </Typography>
                                                                </Grid>
                                                            </Grid>
                                                        }
                                                    />
                                                </ListItemButton>
                                                <ListItemButton
                                                    sx={{
                                                        borderRadius: `${customization.borderRadius}px`,
                                                    }}
                                                    selected={selectedIndex === 3}
                                                    onClick={handleLogout}
                                                >
                                                    <ListItemIcon>
                                                        <IconLogout stroke={3.5} size="1.3rem" />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={
                                                            <Typography variant="subtitle1">
                                                                Logout
                                                            </Typography>
                                                        }
                                                    />
                                                </ListItemButton>
                                            </List>
                                        </Box>
                                    </PerfectScrollbar>
                                </MainCard>
                            </ClickAwayListener>
                        </Paper>
                    </Transitions>
                )}
            </Popper>
        </>
    );
};

export default ProfileSection;
