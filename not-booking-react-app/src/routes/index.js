import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import UnsvilabilityRoutes from './UnavilabilityRoutes';
import createRequest from './CreateRequest';
import requestTable from '../menu-items/requestTable';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    return useRoutes([
        MainRoutes,
        AuthenticationRoutes,
        UnsvilabilityRoutes,
        createRequest,
        requestTable,
    ]);
}
