import React from 'react';
import { useNavigate } from 'react-router-dom';

function LabCard({ lab, onEdit, onDelete }) {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/labs/${lab.lab_id}/computers`);
    };

    return (
        <article className="lab-card" onClick={handleCardClick} style={{ position: "relative" }}>
            
            <div style={{ position: "absolute", top: 8, right: 8, display: "flex", gap: "8px", zIndex: 2 }}>
                <button
                    className="lab-edit-btn"
                    style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                        margin: 0
                    }}
                    title="Editar laboratório"
                    onClick={e => {
                        e.stopPropagation();
                        onEdit && onEdit(lab);
                    }}
                >
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                        <path d="M3 17.25V21h3.75l11.06-11.06-3.75-3.75L3 17.25zM20.71 7.04a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z" fill="#333"/>
                    </svg>
                </button>
            </div>
            <h4>{lab.name}</h4>
             <div className="lab-tags"> 
                <span className="tag">PCs: {lab.num_computers}</span>
                <span className="tag">Capacidade: {lab.capacity}</span> 
            </div>
            
        </article>
    );
}

export default LabCard;