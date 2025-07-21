import React from 'react';
import LabCard from './LabCard';
import { useNavigate } from 'react-router-dom';

function LabGrid({ labs }) {
    const navigate = useNavigate();

    const handleCardClick = (labName) => {
        if (window.confirm(`Deseja gerenciar o laboratório "${labName}"?`)) {
            navigate(`/gerenciamento?lab=${encodeURIComponent(labName)}`);
        }
    };

    return (
        <div className="lab-grid">
            {labs.map((lab) => (
                <LabCard key={lab.lab_id} lab={lab} onClick={handleCardClick} />
            ))}
        </div>
    );
}

export default LabGrid;