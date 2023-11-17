// Modalviewpackage.jsx
import React from "react";
import "./Modalviewestado.css";

const Modalviewestado = ({ onClose, children }) => {
  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal">
        <button className="close-button2" onClick={onClose}>
          Cerrar
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modalviewestado;
