import { useState, useEffect } from 'react';
import RequestTable from '../../shared-view/requests-view/RequestTable';
import requestService from '../../../services/RequestService';
import { useToaster } from 'rsuite/toaster';

import { Message } from 'rsuite';
const TableRequestPage = () => {
    const [rows, setRows] = useState([]);
    const toaster = useToaster();
    const username = localStorage.user.split('username":"')[1].split('"')[0];
    useEffect(() => {
        const fetchData = async () => {
            try {
                await requestService.getListRequestByGostId(username).then((resp) => {
                    if (resp.status !== 200) {
                        toaster.push(
                            <Message showIcon type="error">
                                There is no requests of user.
                            </Message>,
                            { placement: 'topEnd' }
                        );
                    } else {
                        setRows(resp.data);
                    }
                });
            } catch (error) {
                const resMessage = error.response;
                toaster.push(
                    <Message showIcon type="error" closable>
                        {resMessage}
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
            <RequestTable rows={rows} isByGuest={true} />
        </>
    );
};
export default TableRequestPage;
