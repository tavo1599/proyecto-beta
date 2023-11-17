// Package.jsx
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import "./Package.css";
import PackageActions from "./buttonspackage/PackageActions.jsx";
import CreateButton from "./buttonspackage/CreateButton.jsx";
import Modal from "./views/Modalviewpackage.jsx";
import EditModal from "./views/EditModal.jsx";


function Package() {
    
    const [paquetes, setPaquetes] = useState([]);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [packagesPerPage] = useState(10);

    const apiUrl = "http://localhost:5000/paquetes";

    const fetchPaquetes = async () => {
        try {
            const response = await axios.get(apiUrl);
            setPaquetes(response.data);
        } catch (error) {
            console.error("Error al obtener datos del paquete:", error);
        }
    };

    useEffect(() => {
        fetchPaquetes();
    }, []);

    const handleView = (id) => {
        const selected = paquetes.find((paquete) => paquete.id === id);
        setSelectedPackage(selected);
        setIsModalOpen(true);
    };

    const handleCloseView = () => {
        setSelectedPackage(null);
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
                await axios.delete(`http://localhost:5000/paquetes/${id}`);
                fetchPaquetes();
                Swal.fire("Eliminado", "El paquete ha sido eliminado.", "success");
            }
        } catch (error) {
            console.error("Error al eliminar el paquete:", error);
        }
    };

    const handleEdit = (id) => {
        const selected = paquetes.find((paquete) => paquete.id === id);
        setSelectedPackage(selected);
        setIsEditModalOpen(true);
      };

      const handleSaveEdit = async (editedPackage) => {
        try {
          await axios.put(`${apiUrl}/${editedPackage.get("id")}`, editedPackage, {
            headers: {
              "Content-Type": "multipart/form-data", // Asegúrate de establecer el tipo de contenido correcto
            },
          });
          fetchPaquetes();
        } catch (error) {
          console.error("Error al editar el paquete:", error);
        }
      };

    const handleCloseEdit = () => {
        setIsEditModalOpen(false);
    };

    // Calcular índices de la primera y última página
    const indexOfLastPackage = currentPage * packagesPerPage;
    const indexOfFirstPackage = indexOfLastPackage - packagesPerPage;
    const currentPackages = paquetes.slice(indexOfFirstPackage, indexOfLastPackage);

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
                                <CreateButton fetchPaquetes={fetchPaquetes} />
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
                                        <th>Imagen</th>
                                        <th>Nombre</th>
                                        <th>Descripción</th>
                                        <th>Duración</th>
                                        <th>Estado</th>
                                        <th>Precio</th>
                                        <th>Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentPackages.map((paquete) => (
                                        <tr key={paquete.id}>
                                            <td>{paquete.id}</td>
                                            <td><img src={paquete.urlImagen} alt={paquete.nombre_paquete} /></td>
                                            <td>{paquete.nombre_paquete}</td>
                                            <td>{paquete.descripcion}</td>
                                            <td>{paquete.duracion} minutos</td>
                                            <td>{paquete.estado ? 'Activo' : 'Inactivo'}</td>
                                            <td>${paquete.precio}</td>
                                            <td>
                                                <PackageActions
                                                    onView={() => handleView(paquete.id)}
                                                    onEdit={() => handleEdit(paquete.id)}
                                                    onDelete={() => handleDelete(paquete.id)}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            )}

{viewOption === "card" && (
  <div className="content-cards">
    {currentPackages.map((paquete) => (
      <div className="card" key={paquete.id}>
        <div className="card-header">
          <img src={paquete.urlImagen} alt={paquete.nombre_paquete} />
          <h3>{paquete.nombre_paquete}</h3>
        </div>
        <div className="card-body">
          <p>{paquete.descripcion}</p>
        </div>
        <div className="card-footer">
          <div className="card-details">
            <div className="detail">
              <i className='bx bx-time'></i>
              <span>{paquete.duracion} horas</span>
            </div>
            <div className="detail">
              <i className='bx bx-dollar-circle'></i>
              <span>${paquete.precio}</span>
            </div>
          </div>
          <div className="card-buttons">
          <PackageActions
                                                    onView={() => handleView(paquete.id)}
                                                    onEdit={() => handleEdit(paquete.id)}
                                                    onDelete={() => handleDelete(paquete.id)}
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
                                {Array.from({ length: Math.ceil(paquetes.length / packagesPerPage) }, (_, i) => (
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
                    <p>ID: {selectedPackage.id}</p>
                    <p>Nombre: {selectedPackage.nombre_paquete}</p>
                    <p>Descripción: {selectedPackage.descripcion}</p>
                    <p>Duración: {selectedPackage.duracion} minutos</p>
                    <p>Estado: {selectedPackage.estado ? 'Activo' : 'Inactivo'}</p>
                    <p>Precio: ${selectedPackage.precio}</p>
                    {/* Mostrar la imagen dentro del modal */}
                    <img src={selectedPackage.urlImagen} alt={selectedPackage.nombre_paquete} />
                    {/* Agrega más detalles según sea necesario */}
                </Modal>
            )}

            {/* Verifica si el modal de edición está abierto */}
            {isEditModalOpen && (
                <EditModal
                    packageDetails={selectedPackage}
                    onSave={handleSaveEdit}
                    onClose={handleCloseEdit}
                />
            )}
        </>
    );
}

export default Package;
