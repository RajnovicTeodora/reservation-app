import { useState, useEffect } from 'react';
import RequestTable from '../../shared-view/requests-view/RequestTable';
import requestService from '../../../services/RequestService';
import { useToaster } from 'rsuite/toaster';
import { Message } from 'rsuite';
const RequestsForApprovingPage = () => {
    const [rows, setRows] = useState([]);
    const toaster = useToaster();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await requestService.getListRequestByAccomodationId(
                    localStorage.accommodationId
                );
                if (response.status !== 200) {
                    toaster.push(
                        <Message showIcon type="error">
                            There is no requests for accomodation.
                        </Message>,
                        { placement: 'topEnd' }
                    );
                } else {
                    setRows(response.data);
                }
            } catch (error) {
                toaster.push(
                    <Message showIcon type="error">
                        There is no requests for accomodation.
                    </Message>,
                    { placement: 'topEnd' }
                );
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
