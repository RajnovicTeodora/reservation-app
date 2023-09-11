// material-ui
import { useTheme, styled } from '@mui/material/styles';
import {
    Avatar,
    Button,
    Chip,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Typography,
} from '@mui/material';
import NotificationService from '../../../../services/notification.service';

// assets
import { IconSquareCheck } from '@tabler/icons';
import { Message, useToaster } from 'rsuite';
import { useEffect, useState } from 'react';

// styles
const ListItemWrapper = styled('div')(({ theme }) => ({
    cursor: 'pointer',
    padding: 16,
    '&:hover': {
        background: theme.palette.primary.light,
    },
    '& .MuiListItem-root': {
        padding: 0,
    },
}));

// ==============================|| NOTIFICATION LIST ITEM ||============================== //

function removeUnderscore(value) {
    return value ? value.replace(/_/g, ' ') : value;
}

const NotificationList = ({ notificationList, typeChosen }) => {
    const theme = useTheme();
    const toaster = useToaster();
    const [nList, setNList] = useState([]);

    const chipSX = {
        height: 24,
        padding: '0 6px',
    };
    const chipErrorSX = {
        ...chipSX,
        color: theme.palette.orange.dark,
        backgroundColor: theme.palette.orange.light,
        marginRight: '5px',
    };

    const chipSuccessSX = {
        ...chipSX,
        color: theme.palette.success.dark,
        backgroundColor: theme.palette.success.light,
        height: 28,
    };

    const handleNotifications = () => {
        NotificationService.getNotifications(typeChosen).then(
            (response) => {
                setNList(response.data);
            },
            (error) => {
                toaster.push(
                    <Message showIcon type="error" closable>
                        {error.response}
                    </Message>,
                    { placement: 'topEnd' }
                );
            }
        );
    };

    const handleMarkRead = (notifId) => {
        NotificationService.markAsRead(notifId).then(
            () => {
                handleNotifications();
                toaster.push(
                    <Message showIcon type="success">
                        Notification marked as read
                    </Message>,
                    { placement: 'topEnd' }
                );
            },
            (error) => {
                toaster.push(
                    <Message showIcon type="error" closable>
                        {error.response}
                    </Message>,
                    { placement: 'topEnd' }
                );
            }
        );
    };

    useEffect(() => {
        if (notificationList.length != 0) {
            setNList(notificationList);
        }
    }, [notificationList]);

    return (
        <List
            sx={{
                width: 400,
                maxWidth: 400,
                py: 0,
                borderRadius: '10px',
                [theme.breakpoints.down('md')]: {
                    maxWidth: 300,
                },
                '& .MuiListItemSecondaryAction-root': {
                    top: 22,
                },
                '& .MuiDivider-root': {
                    my: 0,
                },
                '& .list-container': {
                    pl: 7,
                },
            }}
        >
            {nList.map((item) => (
                <Grid key={item.id}>
                    <ListItemWrapper>
                        <ListItem alignItems="center">
                            <ListItemAvatar>
                                <Avatar
                                    sx={{
                                        color: theme.palette.warning.dark,
                                        backgroundColor: theme.palette.warning.light,
                                        border: 'none',
                                        borderColor: theme.palette.warning.main,
                                    }}
                                >
                                    {item.type == 'RESERVATION_REQUEST' && (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="icon icon-tabler icon-tabler-calendar-plus"
                                            size="1.3rem"
                                            viewBox="-3 -3 33 33"
                                            stroke="darkgrey"
                                            fill="none"
                                        >
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M12.5 21h-6.5a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v5" />
                                            <path d="M16 3v4" />
                                            <path d="M8 3v4" />
                                            <path d="M4 11h16" />
                                            <path d="M16 19h6" />
                                            <path d="M19 16v6" />
                                        </svg>
                                    )}
                                    {item.type == 'RESERVATION_CANCELLATION' && (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="icon icon-tabler icon-tabler-calendar-cancel"
                                            size="1.3rem"
                                            viewBox="-3 -3 33 33"
                                            stroke="crimson"
                                            fill="none"
                                        >
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M12.5 21h-6.5a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v5" />
                                            <path d="M16 3v4" />
                                            <path d="M8 3v4" />
                                            <path d="M4 11h16" />
                                            <path d="M19 19m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                                            <path d="M17 21l4 -4" />
                                        </svg>
                                    )}
                                    {item.type == 'HOST_RATING' && (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="icon icon-tabler icon-tabler-user-star"
                                            size="1.3rem"
                                            viewBox="-3 -3 33 33"
                                            stroke="currentColor"
                                            fill="none"
                                        >
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                                            <path d="M6 21v-2a4 4 0 0 1 4 -4h.5" />
                                            <path d="M17.8 20.817l-2.172 1.138a.392 .392 0 0 1 -.568 -.41l.415 -2.411l-1.757 -1.707a.389 .389 0 0 1 .217 -.665l2.428 -.352l1.086 -2.193a.392 .392 0 0 1 .702 0l1.086 2.193l2.428 .352a.39 .39 0 0 1 .217 .665l-1.757 1.707l.414 2.41a.39 .39 0 0 1 -.567 .411l-2.172 -1.138z" />
                                        </svg>
                                    )}
                                    {item.type == 'ACCOMMODATION_RATING' && (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="icon icon-tabler icon-tabler-home-star"
                                            size="1.3rem"
                                            viewBox="-3 -3 33 33"
                                            stroke="#597e8d"
                                            fill="none"
                                        >
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M19.258 10.258l-7.258 -7.258l-9 9h2v7a2 2 0 0 0 2 2h4" />
                                            <path d="M9 21v-6a2 2 0 0 1 2 -2h1.5" />
                                            <path d="M17.8 20.817l-2.172 1.138a.392 .392 0 0 1 -.568 -.41l.415 -2.411l-1.757 -1.707a.389 .389 0 0 1 .217 -.665l2.428 -.352l1.086 -2.193a.392 .392 0 0 1 .702 0l1.086 2.193l2.428 .352a.39 .39 0 0 1 .217 .665l-1.757 1.707l.414 2.41a.39 .39 0 0 1 -.567 .411l-2.172 -1.138z" />
                                        </svg>
                                    )}
                                    {item.type == 'HOST_RESPONSE' && (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="icon icon-tabler icon-tabler-message-circle-plus"
                                            size="1.3rem"
                                            viewBox="-3 -3 33 33"
                                            stroke="currentColor"
                                            fill="none"
                                        >
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M12.007 19.98a9.869 9.869 0 0 1 -4.307 -.98l-4.7 1l1.3 -3.9c-2.324 -3.437 -1.426 -7.872 2.1 -10.374c3.526 -2.501 8.59 -2.296 11.845 .48c1.992 1.7 2.93 4.04 2.747 6.34" />
                                            <path d="M16 19h6" />
                                            <path d="M19 16v6" />
                                        </svg>
                                    )}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <Typography variant="subtitle1">
                                        {removeUnderscore(item.type)}
                                    </Typography>
                                }
                            />
                            <ListItemSecondaryAction>
                                <Grid container justifyContent="flex-end">
                                    <Grid item xs={12}>
                                        <Typography variant="caption" display="block" gutterBottom>
                                            {item.date}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Grid container direction="column" className="list-container">
                            <Grid item xs={12} sx={{ pb: 2 }}>
                                <Typography variant="subtitle2">{item.message}</Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <Grid container>
                                    <Grid item>
                                        {item.read && <Chip label="Read" sx={chipSuccessSX} />}
                                        {!item.read && <Chip label="Unread" sx={chipErrorSX} />}
                                    </Grid>
                                    {!item.read && (
                                        <Grid item>
                                            <Button
                                                onClick={() => {
                                                    handleMarkRead(item.id);
                                                }}
                                                variant="contained"
                                                disableElevation
                                                endIcon={
                                                    <IconSquareCheck stroke={1.5} size="1.3rem" />
                                                }
                                            >
                                                Mark Read
                                            </Button>
                                        </Grid>
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>
                    </ListItemWrapper>
                    <Divider />
                </Grid>
            ))}
        </List>
    );
};

export default NotificationList;
