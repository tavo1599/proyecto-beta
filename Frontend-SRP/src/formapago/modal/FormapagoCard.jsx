// PackageCard.jsx
import React from 'react';

const FormapagoCard = ({ formapago }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img className="w-full" src={formapago.urlImagen} alt={formapago.nombre} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{formapago.nombre}</div>
        <p className="text-gray-700 text-base">{paquete.descripcion}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {paquete.tag1}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {paquete.tag2}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {paquete.tag3}
        </span>
      </div>
    </div>
  );
};

export default FormapagoCard;
