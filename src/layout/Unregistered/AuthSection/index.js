import { useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button } from '@mui/material';

// assets
import { IconUser, IconUserPlus } from '@tabler/icons';

const AuthSection = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/login');
    };

    const handleSignUp = () => {
        navigate('/register');
    };

    return (
        <>
            <Button
                variant="outlined"
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
                startIcon={<IconUserPlus />}
                onClick={handleSignUp}
            >
                Sign Up
            </Button>

            <Box
                sx={{
                    ml: 2,
                    mr: 3,
                    [theme.breakpoints.down('md')]: {
                        mr: 2,
                    },
                }}
            >
                <Button
                    variant="outlined"
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
                    startIcon={<IconUser />}
                    onClick={handleClick}
                >
                    Login
                </Button>
            </Box>
        </>
    );
};

export default AuthSection;
