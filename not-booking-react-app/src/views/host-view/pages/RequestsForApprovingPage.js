import { useState, useEffect } from 'react';
import RequestTable from '../../shared-view/requests-view/RequestTable';
import requestService from '../../../services/RequestService';

const RequestsForApprovingPage = () => {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await requestService.getListRequestByAccomodationId(
                    '1' //todo id od accomodation
                );
                setRows(response.data);
                if (response.data.len == 0) {
                    //todo popup
                } //todo error
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <h2>Your requests</h2>
            <RequestTable rows={rows} isByGuest={false} />
        </>
    );
};
export default RequestsForApprovingPage;
