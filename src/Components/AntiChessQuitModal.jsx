import React from "react";
import Modal from "react-modal";

const AntiChessQuitModal = ({ isAntiChessModalOpen, closeAntiChessModal, handleAntiChessQuit }) => {
  return (
    <Modal
      isOpen={isAntiChessModalOpen}
      onRequestClose={closeAntiChessModal}
      contentLabel="Quit Confirmation"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <h2>Are you sure you want to quit?</h2>
      <div className="button-group">
        <button onClick={handleAntiChessQuit} className="modal-button">
          Yes
        </button>
        <button onClick={closeAntiChessModal} className="modal-button">
          No
        </button>
      </div>
    </Modal>
  );
};

export default AntiChessQuitModal;
