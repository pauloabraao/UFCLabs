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

function ComputerCard({ computer, onEdit }) {
  const statusClass = getStatusClass(computer.status);
  return (
    <div
      className={`computer-card ${statusClass}`}
      style={{ cursor: "default", position: "relative" }}
    >
      {/* Edit button in the top right */}
      <div style={{ position: "absolute", top: 8, right: 8, zIndex: 2 }}>
        <button
          className="lab-edit-btn"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            margin: 0
          }}
          title="Editar computador"
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
