import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./CreateButtonestado.css";

function CreateButtonestado({ fetchEstado }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const modalRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNombre("");
    setDescripcion("");
  };

  const handleGuardar = async () => {
    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("descripcion", descripcion);
    
  
    try {
      const response = await axios.post(
        "http://localhost:5000/Estado",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      console.log("Solicitud POST exitosa:", response.data);
      // Actualiza la tabla después de guardar el nuevo paquete
      fetchEstado();
      closeModal();
    } catch (error) {
      console.error("Error al realizar la solicitud POST:", error);
    }
  };
  return (
    <>
      <button className="button-create" onClick={openModal}>
        <span>Nuevo</span>
        <i className="bx bx-cross"></i>
      </button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal" ref={modalRef}>
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>Crear Nuevo Paquete</h2>
            <label>Nombre:</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />

            <label>Descripción:</label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />

            <div className="buttons-container">
              <button onClick={handleGuardar}>Guardar</button>
              <button onClick={closeModal}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CreateButtonestado;
