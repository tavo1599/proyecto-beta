// Package.jsx
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import "./estado.css";
import EstadoActions from "./buttonsestado/EstadoActions.jsx";
import CreateButtonestado from "./buttonsestado/CreateButtonestado";
import Modal from "./views/Modalviewestado.jsx"; 
import EditModalEstado from "../estados/views/EditModalEstado.jsx";


function estado() {
    
    const [estados, setestados] = useState([]);
    const [selectedestado, setSelectedEstado] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [estadoPerPage] = useState(10);

    const apiUrl = "http://localhost:5000/Estado";

    const fetchEstados = async () => {
        try {
            const response = await axios.get(apiUrl);
            setestados(response.data);
        } catch (error) {
            console.error("Error al obtener datos del paquete:", error);
        }
    };

    useEffect(() => {
        fetchEstados();
    }, []);

    const handleView = (id) => {
        const selected = estados.find((estado) => estado.id === id);
        setSelectedEstado(selected);
        setIsModalOpen(true);
    };

    const handleCloseView = () => {
        setSelectedEstado(null);
        setIsModalOpen(false);
    };

    const handleDelete = async (id) => {
        try {
            // Muestra una alerta de confirmación antes de eliminar
            const result = await Swal.fire({
                title: "¿Estás seguro?",
                text: "¡No podrás revertir esto!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí, eliminarlo",
            });

            if (result.isConfirmed) {
                // Si el usuario confirma, procede con la eliminación
                await axios.delete(`http://localhost:5000/Estado/${id}`);
                fetchEstados();
                Swal.fire("Eliminado", "El paquete ha sido eliminado.", "success");
            }
        } catch (error) {
            console.error("Error al eliminar el paquete:", error);
        }
    };

    const handleEdit = (id) => {
        const selected = estados.find((estado) => estado.id === id);
        setSelectedEstado(selected);
        setIsEditModalOpen(true);
      };

      const handleSaveEdit = async (editedEstado) => {
        try {
          await axios.put(`${apiUrl}/${editedEstado.get("id")}`, editedEstado, {
            headers: {
              "Content-Type": "multipart/form-data", // Asegúrate de establecer el tipo de contenido correcto
            },
          });
          fetchEstados();
        } catch (error) {
          console.error("Error al editar el paquete:", error);
        }
      };

    const handleCloseEdit = () => {
        setIsEditModalOpen(false);
    };

    // Calcular índices de la primera y última página
    const indexOfLastEstado = currentPage * estadoPerPage;
    const indexOfFirstEstado = indexOfLastEstado - estadoPerPage;
    const currentEstados = estados.slice(indexOfFirstEstado, indexOfLastEstado);

    // Cambiar de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    

    const [viewOption, setViewOption] = useState("table");

const openTableView = () => {
  setViewOption("table");
};

const openCardView = () => {
  setViewOption("card");
};


    
    return (
        <>
            <div className="package-container">
                <div className="container">
                    <div className="header-info">

                    </div>
                    <div className="content-info">
                        <div className="content-top">
                            <div className="options-left">
                                <CreateButtonestado fetchEstados={fetchEstados} />
                            </div>
                            <div className="options-right">
                <div className="option-list">
                <button className={`option-list ${viewOption === "table" ? "active" : ""}`} onClick={openTableView}>
              <i className='bx bx-menu'></i>
            </button>
                </div>
                <div className="option-card">
                <button className={`option-card ${viewOption === "card" ? "active" : ""}`} onClick={openCardView}>
              <i className='bx bx-category' ></i>
            </button>
                </div>
              </div>
                        </div>
                        <div className="content-body">
                        {viewOption === "table" && (
                            <table className="fixed-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Descripción</th>
                                        <th>Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentEstados.map((estado) => (
                                        <tr key={estado.id}>
                                            <td>{estado.id}</td>
                                            <td>{estado.nombre}</td>
                                            <td>{estado.descripcion}</td>
                                            <td>
                                                <EstadoActions
                                                    onView={() => handleView(estado.id)}
                                                    onEdit={() => handleEdit(estado.id)}
                                                    onDelete={() => handleDelete(estado.id)}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            )}

{viewOption === "card" && (
  <div className="content-cards">
    {currentEstados.map((estado) => (
      <div className="card" key={estado.id}>
        <div className="card-header">
          <h3>{estado.nombre}</h3>
        </div>
        <div className="card-body">
          <p>{estado.descripcion}</p>
        </div>
        <div className="card-footer">
          <div className="card-details">
          </div>
          <div className="card-buttons">
          <EstadoActions
                                                    onView={() => handleView(estado.id)}
                                                    onEdit={() => handleEdit(estado.id)}
                                                    onDelete={() => handleDelete(estado.id)}
                                                />
          </div>
        </div>
      </div>
    ))}
  </div>
)}
                        </div>
                        <div className="content-button">
                            {/* Paginación */}
                            <ul className="pagination">
                                {Array.from({ length: Math.ceil(estados.length / estadoPerPage) }, (_, i) => (
                                    <li key={i + 1} className={currentPage === i + 1 ? 'active' : ''}>
                                        <a onClick={() => paginate(i + 1)} href="#!">{i + 1}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <Modal onClose={handleCloseView}>
                    <h2>Detalles del Paquete</h2>
                    <p>ID: {selectedestado.id}</p>
                    <p>Nombre: {selectedestado.nombre_paquete}</p>
                    <p>Descripción: {selectedestado.descripcion}</p>
                </Modal>
            )}

            {/* Verifica si el modal de edición está abierto */}
            {isEditModalOpen && (
                <EditModalEstado
                    estadoDetails={selectedestado}
                    onSave={handleSaveEdit}
                    onClose={handleCloseEdit}
                />
            )}
        </>
    );
}

export default estado;
