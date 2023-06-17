// material-ui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

// project imports
import LogoSection from '../../MainLayout/LogoSection';
import SearchSection from '../../MainLayout/Header/SearchSection';
import AuthSection from '../AuthSection';

const UHeader = () => {
    const theme = useTheme();
    return (
        <>
            {/* logo & toggler button */}
            <Box
                sx={{
                    width: 228,
                    display: 'flex',
                    [theme.breakpoints.down('md')]: {
                        width: 'auto',
                    },
                }}
            >
                <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
                    <LogoSection />
                </Box>
            </Box>

            {/* header search */}
            <SearchSection />
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ flexGrow: 1 }} />

            {/* login and sign up */}
            <AuthSection />
        </>
    );
};

export default UHeader;
