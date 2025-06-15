import React from "react";

function LabCard({ lab, onClick }) {
  return (
    <div className="lab-card" onClick={onClick}>
      <h2>{lab.name}</h2>
      <p>Capacidade: {lab.capacity}</p>
      <p>Computadores: {lab.num_computers}</p>
    </div>
  );
}

export default LabCard;
