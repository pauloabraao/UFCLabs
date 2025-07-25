import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Computer as ComputerIcon } from '@mui/icons-material'; 
import "../pages/ComputersPage.css"; 

function getStatusColor(status) {
    if (!status) return '#6c757d'; 
    switch (status.toLowerCase()) { 
        case 'disponivel':
            return '#28a745'; 
        case 'em uso':
            return '#ffc107'; 
        case 'manutencao':
            return '#dc3545';
        case 'fora de servico':
            return '#6c757d';
        case 'em reparo': 
            return '#e4c332ff'; 
        default:
            return '#007bff'; 
    }
}

function ComputerCard({ computer, onEdit}) {
    const [isHovered, setIsHovered] = useState(false); 

    const navigate = useNavigate();
    const handleClick = () => {
    navigate(`/computers/${computer.computer_id}/programs`);
    };
    const statusColor = getStatusColor(computer.status);

    return (
        <article
            className="computer-card"
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)} 
            onClick={handleClick} 
            style={{ cursor: handleClick ? "pointer" : "default" }} 
        >
            {/* Edit and Delete buttons */}
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
                    title="Editar Computador"
                    onClick={e => {
                        e.stopPropagation();
                        onEdit && onEdit(computer);
                    }}
                >
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                        <path d="M3 17.25V21h3.75l11.06-11.06-3.75-3.75L3 17.25zM20.71 7.04a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z" fill="#333"/>
                    </svg>
                </button>
            </div>
            <div className="card-header">
                
                <h3>{computer.name || `PC ${computer.computer_id}`}</h3>
            </div>

            <div className="card-icon" style={{ color: statusColor }}>
               
                <ComputerIcon sx={{ fontSize: 80 }} />
            </div>

            {isHovered && (
                <div className="card-details">
                    <p><strong>Patrimônio:</strong> {computer.property_id || "N/A"}</p>
                    <p><strong>SO:</strong> {computer.os || "N/A"}</p>
                    <p><strong>Status:</strong> {computer.status || "N/A"}</p>
                    <p><strong>CPU:</strong> {computer.cpu || "N/A"}</p>
                    <p><strong>RAM:</strong> {computer.ram || "N/A"}</p>
                    <p><strong>Armazenamento:</strong> {computer.storage || "N/A"}</p>
                </div>
            )}
        </article>
    );
}

export default ComputerCard;