// EditModal.jsx
import React, { useState, useEffect } from "react";
import "./EditModal.css";

const EditModal = ({ packageDetails, onSave, onClose }) => {
  const [editedDetails, setEditedDetails] = useState({ ...packageDetails });
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
    formData.append("nombre_paquete", editedDetails.nombre_paquete);
    formData.append("descripcion", editedDetails.descripcion);
    formData.append("duracion", editedDetails.duracion);
    formData.append("precio", editedDetails.precio);
    formData.append("estado", editedDetails.estado);
    if (imageFile) {
      formData.append("imagen", imageFile);
    }

    onSave(formData);
    onClose();
  };

  const handleClickOutside = (e) => {
    const modal = document.getElementById("editModal");
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
    <div id="editModal" className="modal">
      <h2>Editar Paquete</h2>
      {/* Campos editables */}
      <label>Nombre:</label>
      <input
        type="text"
        name="nombre_paquete"
        value={editedDetails.nombre_paquete}
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

      <label>Duración:</label>
      <input
        type="number"
        name="duracion"
        value={editedDetails.duracion}
        onChange={handleInputChange}
      />

      <label>Precio:</label>
      <input
        type="number"
        name="precio"
        value={editedDetails.precio}
        onChange={handleInputChange}
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

      {/* Agrega más campos según sea necesario */}

      <button onClick={handleSave}>Guardar</button>
      <button onClick={onClose}>Cancelar</button>
    </div>
  );
};

export default EditModal;
