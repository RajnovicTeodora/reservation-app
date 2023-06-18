
import MainLayout from "../layout/MainLayout";
import { lazy } from 'react';

import Loadable from '../ui-component/Loadable.js';

// ==============================|| MAIN ROUTING ||============================== //
const CreateAccomodation = Loadable(lazy(() => import('../views/host-view/forms/CreateAccomodation/CreateAccomodation'))); 
const UnavilabilityAccomodationTabel = Loadable(lazy(() => import('../views/host-view/tabels/UnavilabilityAccomodationTabel'))); 
const PriceTable = Loadable(lazy(() => import('../views/host-view/tabels/PriceTable'))); 

const MainRoutes = {
  path: "/main",
  element: <MainLayout />,
  children: [
    {  path: 'host',
    children: [
        {
            path: 'createAccomodation',
            element: <CreateAccomodation />
        },
        
    ]},

    {  path: 'host',
    children: [{
          path: 'unavilabilityTable',
          element: <UnavilabilityAccomodationTabel />
      }]},
      {  path: 'host',
      children: [{
            path: 'pricesTable',
            element: <PriceTable />
        }]},
  
  ],

};

export default MainRoutes;
