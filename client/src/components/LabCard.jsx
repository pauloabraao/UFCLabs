import React from 'react';
import { useNavigate } from 'react-router-dom';

function LabCard({ lab }) {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/labs/${lab.lab_id}/computers`);
    };

    return (
        <article className="lab-card" onClick={handleCardClick}>
            <h4>{lab.name}</h4>
            <p>Capacidade: {lab.capacity}</p>
            <p>Computadores: {lab.num_computers}</p>
        </article>
    );
}

export default LabCard;