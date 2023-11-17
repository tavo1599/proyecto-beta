
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import './FormaPago.css'
import CreateButtonFormaPago from "./buttons/CreateButtonFormaPago";
import FormapagoActions from "./buttons/FormapagoActions";
import Modal from "./views/Modalviewformapago.jsx";
import EditModalFormaPago from "./views/EditModalformaPago";

function FormaPago() {
  
    const [formasPago, setFormasPago] = useState([]);
    const [selectedFormapago, setSelectedFormapago] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [formaspagoPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    
    const apiUrl = "http://localhost:5000/Formapago";

    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/Formapago");
        setFormasPago(response.data);
      } catch (error) {
        console.error("Error al obtener las formas de pago:", error);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  

    const handleView = (id) => {
      const selected = formasPago.find((formapago) => formapago.id === id);
      setSelectedFormapago(selected);
      setIsModalOpen(true);
  };

  const handleCloseView = () => {
    setSelectedFormapago(null);
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
              await axios.delete(`http://localhost:5000/Formapago/${id}`);
              fetchData();
              Swal.fire("Eliminado", "Se ha sido eliminado.", "success");
          }
      } catch (error) {
          console.error("Error al eliminar :", error);
      }
  };


  const handleEdit = (id) => {
    const selected = formasPago.find((formaPago) => formaPago.id === id);
    setSelectedFormapago(selected);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async (editedFormapago) => {
    try {
      await axios.put(`${apiUrl}/${editedFormapago.get("id")}`, editedFormapago, {
        headers: {
          "Content-Type": "multipart/form-data", // Asegúrate de establecer el tipo de contenido correcto
        },
      });
      fetchData();
    } catch (error) {
      console.error("Error al editar el pago", error);
    }
  };
    

  const handleCloseEdit = () => {
    setIsEditModalOpen(false);
};

  const indexOfLastFormapago = currentPage * formaspagoPerPage;
  const indexOfFirstFormapago = indexOfLastFormapago - formaspagoPerPage;
  const currentFormaspago = formasPago.slice(indexOfFirstFormapago, indexOfLastFormapago);

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
          <div className="header-info"></div>
          <div className="content-info">
            <div className="content-top">
            <div className="options-left">
            <div className="options-left">
          <CreateButtonFormaPago fetchFormasPago={fetchData} />
        </div>

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
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Estado</th>
                    <th>Numero</th>
                    <th>CCI</th>
                    <th>Imagen</th>
                    <th>Descripción</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
  {currentFormaspago.map((formaPago) => (
    <tr key={formaPago.id}>
      <td>{formaPago.id}</td>
      <td>{formaPago.nombre}</td>
      <td>{formaPago.estado ? "Activo" : "Inactivo"}</td>
      <td>{formaPago.numero}</td>
      <td>{formaPago.cci}</td>
      <td>
  {formaPago.imagen && (
    <div>
      <img src={formaPago.urlImagen} alt={formaPago.nombre} style={{ maxWidth: '100px', maxHeight: '50px' }} />
      <button onClick={() => window.open(formaPago.urlImagen, '_blank')}></button>
    </div>
  )}
</td>
   
      <td>{formaPago.descripcion}</td> 
      
      
      <td>
      <FormapagoActions
                    onView={() => handleView(formaPago.id)}
                    onEdit={() => handleEdit(formaPago.id)}
                    onDelete={() => handleDelete(formaPago.id)}
      />
      </td>
    </tr>
  ))}
</tbody>
              </table>
              )}

{viewOption === "card" && (
  <div className="content-cards">
    {currentFormaspago.map((paquete) => (
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
          <FormapagoActions
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
                                {Array.from({ length: Math.ceil(formasPago.length / formaspagoPerPage) }, (_, i) => (
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
                    <h2>Detalles de Forma Pago</h2>
                    <p>ID: {selectedFormapago.id}</p>
                    <p>Nombre: {selectedFormapago.nombre}</p>
                    <p>Descripción: {selectedFormapago.descripcion}</p>
                    <p>Numero: {selectedFormapago.numero} minutos</p>
                    <p>CCI: ${selectedFormapago.cci}</p>
                    <p>Estado: {selectedFormapago.estado ? 'Activo' : 'Inactivo'}</p>
                    {/* Mostrar la imagen dentro del modal */}
                    <img src={selectedFormapago.urlImagen} alt={selectedFormapago.nombre} />
                    {/* Agrega más detalles según sea necesario */}
                </Modal>
            )}

      {isEditModalOpen && (
        <EditModalFormaPago
          formaPagoDetails={selectedFormapago}
          onSave={handleSaveEdit}
          onClose={handleCloseEdit}
        />
      )}


    </>
  );
}

export default FormaPago;
