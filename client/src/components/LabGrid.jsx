import React from 'react';
import LabCard from './LabCard';
import { useNavigate } from 'react-router-dom';

function LabGrid({ labs, onEditLab, onDeleteLab }) {
    const navigate = useNavigate();

    const handleCardClick = (labName) => {
        if (window.confirm(`Deseja gerenciar o laboratório "${labName}"?`)) {
            navigate(`/gerenciamento?lab=${encodeURIComponent(labName)}`);
        }
    };

    return (
        <div className="lab-grid">
            {labs.map((lab) => (
                <LabCard
                    key={lab.lab_id}
                    lab={lab}
                    onClick={handleCardClick}
                    onEdit={onEditLab}
                    onDelete={onDeleteLab}
                />
            ))}
        </div>
    );
}

export default LabGrid;