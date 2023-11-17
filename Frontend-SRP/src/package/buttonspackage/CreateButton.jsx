import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./CreateButton.css";

function CreateButton({ fetchPaquetes }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [duracion, setDuracion] = useState(0);
  const [precio, setPrecio] = useState(0);
  const [estado, setEstado] = useState("Activo");
  const [imagen, setImagen] = useState(null);
  const [imagenPreview, setImagenPreview] = useState(null);

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
    setDuracion(0);
    setPrecio(0);
    setEstado("Activo");
    setImagen(null);
    setImagenPreview(null);
  };

  const handleImagenChange = (e) => {
    const selectedImagen = e.target.files[0];
    setImagen(selectedImagen);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagenPreview(reader.result);
    };
    if (selectedImagen) {
      reader.readAsDataURL(selectedImagen);
    }
  };

  const handleGuardar = async () => {
    const formData = new FormData();
    formData.append("nombre_paquete", nombre);
    formData.append("descripcion", descripcion);
    formData.append("duracion", duracion);
    formData.append("precio", precio);
    formData.append("estado", estado === "Activo"); // Convertir a booleano
    if (imagen) {
      formData.append("imagen", imagen);
    }
  
    try {
      const response = await axios.post(
        "http://localhost:5000/paquetes",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      console.log("Solicitud POST exitosa:", response.data);
      // Actualiza la tabla después de guardar el nuevo paquete
      fetchPaquetes();
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

            <label>Duración:</label>
            <input
              type="number"
              value={duracion}
              onChange={(e) => setDuracion(e.target.value)}
            />

            <label>Precio:</label>
            <input
              type="number"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
            />

            <label>Estado:</label>
            <select
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
            >
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>

            <label>Imagen:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImagenChange}
            />
            {imagenPreview && (
              <img
                src={imagenPreview}
                alt="Vista previa de la imagen"
                className="preview-image"
              />
            )}

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

export default CreateButton;
