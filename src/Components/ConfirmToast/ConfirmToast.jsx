import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './confirmToast.css';

const ConfirmModal = ({ show, onClose, onConfirm, message }) => {
  const handleConfirmClick = () => {
    onConfirm(); // Call the handleConfirm function
    onClose();   // Close the modal
  };

  return (
    <Modal show={show} onHide={onClose} className="custom-confirm-modal">
       <Modal.Header closeButton>Confirmation
      </Modal.Header>
       <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="warning" onClick={handleConfirmClick}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// const ConfirmModal = ({ show, onClose, onConfirm, message }) => {
//   return (
//     <Modal show={show} onHide={onClose} className="custom-confirm-modal">
//       <Modal.Header closeButton>
//         <Modal.Title>Confirmation</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>{message}</Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={onClose}>
//           Cancel
//         </Button>
//         <Button variant="warning" onClick={onConfirm}>
//           Confirm
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

export default ConfirmModal;
