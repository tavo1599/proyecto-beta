// EditModalFormaPago.jsx
import React, { useState, useEffect } from "react";
import "./EditModalFormaPago.css";

const EditModalFormaPago = ({ formaPagoDetails, onSave, onClose }) => {
  const [editedDetails, setEditedDetails] = useState({ ...formaPagoDetails });
  const [imageFile, setImageFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleSave = () => {
    const formData = new FormData();
    formData.append("id", editedDetails.id);
    formData.append("nombre", editedDetails.nombre);
    formData.append("descripcion", editedDetails.descripcion);
    formData.append("estado", editedDetails.estado);
    formData.append("numero", editedDetails.numero);
    formData.append("cci", editedDetails.cci);
    if (imageFile) {
      formData.append("imagen", imageFile);
    }

    onSave(formData);
    onClose();
  };

  const handleClickOutside = (e) => {
    const modal = document.getElementById("editModalFormaPago");
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
    <div id="editModalFormaPago" className="modal">
      <h2>Editar Forma de Pago</h2>
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

      <label>Imagen:</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />

      <label>Estado:</label>
      <select
        name="estado"
        value={editedDetails.estado}
        onChange={handleInputChange}
      >
        <option value={true}>Activo</option>
        <option value={false}>Inactivo</option>
      </select>

      <label>Número:</label>
      <input
        type="text"
        name="numero"
        value={editedDetails.numero}
        onChange={handleInputChange}
      />

      <label>CCI:</label>
      <input
        type="text"
        name="cci"
        value={editedDetails.cci}
        onChange={handleInputChange}
      />

      {/* Agrega más campos según sea necesario */}

      <button onClick={handleSave}>Guardar</button>
      <button onClick={onClose}>Cancelar</button>
    </div>
  );
};

export default EditModalFormaPago;
