import React from "react";
import "../pages/ComputersPage.css"; // Certifique-se de que o caminho está correto

function getStatusClass(status) {
  if (!status) return "";
  // Normalize status for className
  if (status === "disponivel") return "status-disponivel";
  if (status === "em reparo") return "status-em-reparo";
  if (status === "fora de servico") return "status-fora-de-servico";
  return "";
}

function ComputerCard({ computer, onClick }) {
  const statusClass = getStatusClass(computer.status);
  return (
    <div
      className={`computer-card ${statusClass}`}
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : undefined }}
    >
      <h3>{computer.computer_id} - {computer.os || "Sem SO"}</h3>
      <p>Status: {computer.status}</p>
      <p>CPU: {computer.cpu}</p>
      <p>RAM: {computer.ram}</p>
      <p>Armazenamento: {computer.storage}</p>
    </div>
  );
}

export default ComputerCard;
