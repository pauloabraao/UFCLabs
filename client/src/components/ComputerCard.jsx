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

function getStatusLabel(status) {
  if (status === "disponivel") return "Disponível";
  if (status === "em reparo") return "Em Reparo";
  if (status === "fora de servico") return "Fora de Serviço";
  return status;
}

function ComputerCard({ computer, onClick }) {
  const statusClass = getStatusClass(computer.status);
  return (
    <div
      className={`computer-card ${statusClass}`}
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : undefined }}
    >
      <h3>PC {computer.number_id}</h3>
      <p>SO: {computer.os || "Sem SO"}</p>
      <p>CPU: {computer.cpu}</p>
      <p>RAM: {computer.ram}</p>
      <p>Armazenamento: {computer.storage}</p>
      <p>Status: {getStatusLabel(computer.status)}</p>
    </div>
  );
}

export default ComputerCard;
