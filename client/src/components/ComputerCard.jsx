import React from "react";

function ComputerCard({ computer }) {
  return (
    <div className="computer-card">
      <h3>{computer.computer_id} - {computer.os || "Sem SO"}</h3>
      <p>Status: {computer.status}</p>
      <p>CPU: {computer.cpu}</p>
      <p>RAM: {computer.ram}</p>
      <p>Armazenamento: {computer.storage}</p>
    </div>
  );
}

export default ComputerCard;
