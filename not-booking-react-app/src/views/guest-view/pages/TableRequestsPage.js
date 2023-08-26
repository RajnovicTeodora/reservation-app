import { useState, useEffect } from 'react';
import RequestTable from '../../shared-view/requests-view/RequestTable';
import requestService from '../../../services/RequestService';

const TableRequestPage = () => {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await requestService.getListRequestByGostId(
                    '649c60569d0f1b098ea84bb5' //todo id od pravog korisnika
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
            <RequestTable rows={rows} isByGuest={true} />
        </>
    );
};
export default TableRequestPage;
