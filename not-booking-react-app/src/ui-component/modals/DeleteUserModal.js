import Modal, {
  useModalState,
  modalAnimation,
} from "react-simple-modal-provider";
import "./modal.scss";
import { IconAlertTriangle, IconX } from "@tabler/icons";
import UserService from "../../services/user.service";
import AuthService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const DeleteUserModal = ({ children }) => {
  const [isOpen, setOpen] = useModalState();
  const [user] = useState(JSON.parse(localStorage.getItem("user")));
  const navigate = useNavigate();

  const handleDelete = () => {
    UserService.deleteAccount(user.email).then(
      (response) => {
        console.log(response);
        AuthService.logout().then(
          () => {
            navigate("/");
            window.location.reload();
          },
          (error) => {
            console.log(error);
            const resMessage = error.response.data;
            console.log(resMessage);
          }
        );
      },
      (error) => {
        console.log(error);
        const resMessage = error.response.data;
        console.log(resMessage);
      }
    );
  };

  return (
    <Modal
      id={"DeleteUserModal"}
      consumer={children}
      isOpen={isOpen}
      setOpen={setOpen}
      duration={250}
      animation={modalAnimation.scaleUp}
      draggable={true}
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
            <p style={{ color: 'rgba(107,114,128,var(1))', fontSize: '0.875rem', lineHeight: '1.25rem' }}>
            Are you sure you want to delete your account?
            </p>  
          </div>
          
          
        </div>
        <div style={{textAlignLast: 'right'}}>
          <button
            onClick={handleDelete}
            className="ok-button"
          >
            Yes
          </button>
          <button
            onClick={() => setOpen(false)}
            type="button"
            className="cancel-button"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteUserModal;
