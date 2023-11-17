// EditModal.jsx
import React, { useState, useEffect } from "react";
import "./EditModalEstado.css";

const EditModalEstado = ({ estadoDetails, onSave, onClose }) => {
  const [editedDetails, setEditedDetails] = useState({ ...estadoDetails });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };


  const handleSave = () => {
    const formData = new FormData();
    formData.append("id", editedDetails.id);
    formData.append("nombre", editedDetails.nombre);
    formData.append("descripcion", editedDetails.descripcion);
    

    onSave(formData);
    onClose();
  };

  const handleClickOutside = (e) => {
    const modal = document.getElementById("editModalEstado");
    if (modal && !modal.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // Se ejecuta solo una vez al montar el componente

  return (
    <div id="editModalEstado" className="modal">
      <h2>Editar Estado</h2>
      {/* Campos editables */}
      <label>Nombre:</label>
      <input
        type="text"
        name="nombre"
        value={editedDetails.nombre}
        onChange={handleInputChange}
      />

      <label>Descripción:</label>
      <input
        type="text"
        name="descripcion"
        value={editedDetails.descripcion}
        onChange={handleInputChange}
      />

      {/* Agrega más campos según sea necesario */}

      <button onClick={handleSave}>Guardar</button>
      <button onClick={onClose}>Cancelar</button>
    </div>
  );
};

export default EditModalEstado;
