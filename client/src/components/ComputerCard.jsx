import React, { useState } from 'react';
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

function ComputerCard({ computer, onClick }) {
    const [isHovered, setIsHovered] = useState(false); 

    
    const statusColor = getStatusColor(computer.status);

    return (
        <article
            className="computer-card"
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)} 
            onClick={onClick} 
            style={{ cursor: onClick ? "pointer" : "default" }} 
        >
            <div className="card-header">
                
                <h3>{computer.name || `PC ${computer.computer_id}`}</h3>
            </div>

            <div className="card-icon" style={{ color: statusColor }}>
               
                <ComputerIcon sx={{ fontSize: 80 }} />
            </div>

            {isHovered && (
                <div className="card-details">
                    <p><strong>SO:</strong> {computer.operating_system || "N/A"}</p>
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