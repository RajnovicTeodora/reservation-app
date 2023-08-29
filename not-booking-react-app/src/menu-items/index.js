import dashboard from './dashboard';
import pages from './pages';
import utilities from './utilities';
import other from './other';
import createAccomodation from './createAccomodation';
import unavilabilityTable from './unavilabilityTable';

import priceTable from './priceTable';
import tableOfRequests from './TableRequestPage';
import createRequest from './createRequest';
import requestTable from './requestTable';
import tableOfReservations from './TableReservationPage';
// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
    items: [
        dashboard,
        pages,
        utilities,
        other,
        createAccomodation,
        unavilabilityTable,
        priceTable,
        createRequest,
        requestTable,
        tableOfRequests,
        tableOfReservations,
    ],
};

export default menuItems;
