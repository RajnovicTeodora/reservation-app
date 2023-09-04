import Modal, { useModalState, modalAnimation } from 'react-simple-modal-provider';
import './modal.scss';
import { IconAlertTriangle, IconX } from '@tabler/icons';
import UserService from '../../services/user.service';
import AuthService from '../../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Message } from 'rsuite';
import { useToaster } from 'rsuite/toaster';
import reservationService from '../../services/ReservationService';
import accomoddationService from '../../services/AccomoddationService';

const DeleteUserModal = ({ children }) => {
    const toaster = useToaster();
    const [isOpen, setOpen] = useModalState();
    const [user] = useState(JSON.parse(localStorage.getItem('user')));
    const navigate = useNavigate();

    const handleDelete = () => {
        //TODO check
        reservationService.checkActiveReservations(user.username, user.userType).then(
            (res) => {
                if (!res.data) {
                    UserService.deleteAccount(user.email).then(
                        () => {
                            if (user.userType == 'HOST') {
                                accomoddationService.deleteAccommodations(user.username).then(
                                    () => {
                                        toaster.push(
                                            <Message showIcon type="success">
                                                Successfully deleted host accommodations!
                                            </Message>,
                                            { placement: 'topEnd' }
                                        );
                                        logout();
                                    },
                                    (er) => {
                                        showErrorMessage(er.response.data);
                                    }
                                );
                            } else {
                                logout();
                            }
                        },
                        (error) => {
                            showErrorMessage(error.response.data);
                        }
                    );
                } else {
                    showErrorMessage('Forbidden! Active reservations present');
                }
            },
            (err) => {
                showErrorMessage(err.response.data);
            }
        );
    };

    const showErrorMessage = (message) => {
        toaster.push(
            <Message showIcon type="error" closable>
                {message}
            </Message>,
            { placement: 'topEnd' }
        );
    };

    const logout = () => {
        AuthService.logout().then(
            () => {
                toaster.push(
                    <Message showIcon type="success">
                        Successfully deleted account!
                    </Message>,
                    { placement: 'topEnd' }
                );
                navigate('/');
            },
            (error) => {
                toaster.push(
                    <Message showIcon type="error" closable>
                        {error.response.data}
                    </Message>,
                    { placement: 'topEnd' }
                );
            }
        );
    };

    return (
        <Modal
            id={'DeleteUserModal'}
            consumer={children}
            isOpen={isOpen}
            setOpen={setOpen}
            duration={250}
            animation={modalAnimation.scaleUp}
            draggable={false}
        >
            <div className="custom-modal">
                <div className="custom-x-button-modal">
                    <button
                        type="button"
                        className="custom-x-button"
                        onClick={() => setOpen(false)}
                    >
                        <IconX />
                    </button>
                </div>
                <div className="flex-disp">
                    <div className="custom-modal-icon">
                        <IconAlertTriangle className="custom-icon" />
                    </div>
                    <div className="custom-text-modal">
                        <h3 className="custom-text">Warning</h3>
                        <p
                            style={{
                                color: 'rgba(107,114,128,var(1))',
                                fontSize: '0.875rem',
                                lineHeight: '1.25rem',
                            }}
                        >
                            Are you sure you want to delete your account?
                        </p>
                    </div>
                </div>
                <div style={{ textAlignLast: 'right' }}>
                    <button onClick={handleDelete} className="ok-button">
                        Yes
                    </button>
                    <button onClick={() => setOpen(false)} type="button" className="cancel-button">
                        Cancel
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default DeleteUserModal;
