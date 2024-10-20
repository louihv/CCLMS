// Modal.js
import React from 'react';
import './Modal.css'; // Import CSS for the modal

const Modal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <h2>Logout Confirmation</h2>
        <p>Are you sure you want to log out?</p>
        <div className="modalActions">
          <button className="modalButton confirm" onClick={onConfirm}>Yes</button>
          <button className="modalButton cancel" onClick={onClose}>No</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
