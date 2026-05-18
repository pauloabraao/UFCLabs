import React, { useState, useEffect } from "react";
import "./EditTicketModal.css";

function EditTicketModal({ isOpen, ticket, onClose, onUpdate, onDelete }) {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (ticket) {
      setStatus(ticket.status);
    }
  }, [ticket]);

  if (!isOpen || !ticket) return null;

  const handleUpdate = async () => {
    if (status === ticket.status) {
      onClose();
      return;
    }

    setLoading(true);
    try {
      await onUpdate(ticket.issue_id, status);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Tem certeza que deseja deletar este chamado?")) {
      setLoading(true);
      try {
        await onDelete(ticket.issue_id);
        onClose();
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>
            Detalhes do Chamado #{ticket.issue_id.toString().padStart(3, "0")}
          </h2>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-body">
          <div className="ticket-details">
            <div className="detail-row">
              <label>Computador:</label>
              <span>PC-{ticket.computer_id}</span>
            </div>

            <div className="detail-row">
              <label>Descrição:</label>
              <span>{ticket.description}</span>
            </div>

            <div className="detail-row">
              <label>Data Reportada:</label>
              <span>
                {new Date(ticket.date_reported).toLocaleDateString("pt-BR")}
              </span>
            </div>

            <div className="detail-row">
              <label>Componente:</label>
              <span className="capitalize">{ticket.component}</span>
            </div>

            <div className="detail-row">
              <label htmlFor="status-select">Status:</label>
              <select
                id="status-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="status-select"
              >
                <option value="aberto">Aberto</option>
                <option value="em andamento">Em Andamento</option>
                <option value="resolvido">Resolvido</option>
              </select>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button
            className="btn-secondary"
            onClick={onClose}
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            className="btn-danger"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Processando..." : "Deletar Chamado"}
          </button>
          <button
            className="btn-primary"
            onClick={handleUpdate}
            disabled={loading}
          >
            {loading ? "Salvando..." : "Salvar Alterações"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditTicketModal;
