// PackageActions.jsx
import React from "react";
import "./PackageActions.css";

function PackageActions({ onView, onEdit, onDelete, id }) {
    return (
        <div className="package-actions">
            <button className="edit-button" onClick={onEdit}>
                <i className="bx bxs-edit-alt"></i>
            </button>
            <button className="delete-button" onClick={() => onDelete(id)}>
                <i className="bx bxs-trash"></i>
            </button>
            <button className="view-button" onClick={() => onView(id)}>
                <i className="bx bxs-show"></i>
            </button>
        </div>
        
    );
}

export default PackageActions;
