import { useRoutes } from "react-router-dom";

// routes
import MainRoutes from "./MainRoutes";
import AuthenticationRoutes from './AuthenticationRoutes';
import AccomodationRoutes from './AccomodationRoutes';
import UnsvilabilityRoutes from './UnavilabilityRoutes';
import PriceRoutes from './PriceRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([MainRoutes, AuthenticationRoutes, AccomodationRoutes, UnsvilabilityRoutes, PriceRoutes]);
}
