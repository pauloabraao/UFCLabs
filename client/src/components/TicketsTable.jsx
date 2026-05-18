import React, { useState, useMemo } from "react";
import EditTicketModal from "./EditTicketModal";

function TicketsTable({ tickets, computers, laboratories, onEdit, onDelete }) {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Criar mapa de computadores para acesso rápido
  const computerMap = useMemo(() => {
    return computers.reduce((map, computer) => {
      map[computer.computer_id] = computer;
      return map;
    }, {});
  }, [computers]);

  // Criar mapa de laboratórios para acesso rápido
  const labMap = useMemo(() => {
    return laboratories.reduce((map, lab) => {
      map[lab.lab_id] = lab;
      return map;
    }, {});
  }, [laboratories]);

  // Agrupar tickets por laboratório
  const groupedTickets = useMemo(() => {
    const groups = {};

    tickets.forEach((ticket) => {
      const computer = computerMap[ticket.computer_id];
      const labId = computer ? computer.lab_id : null;
      const labName =
        labId && labMap[labId]
          ? labMap[labId].name
          : "Laboratório Desconhecido";

      if (!groups[labName]) {
        groups[labName] = [];
      }
      groups[labName].push(ticket);
    });

    return Object.keys(groups)
      .sort()
      .reduce((result, key) => {
        result[key] = groups[key];
        return result;
      }, {});
  }, [tickets, computerMap, labMap]);

  const handleOpenModal = (ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTicket(null);
  };

  const statusClass = (status) => {
    return status.toLowerCase().replace(/\s+/g, "");
  };

  return (
    <>
      <div className="tickets-table-container">
        {Object.keys(groupedTickets).length === 0 ? (
          <div className="empty-state">
            <p>Nenhum chamado encontrado</p>
          </div>
        ) : (
          Object.entries(groupedTickets).map(([labName, labTickets]) => (
            <div key={labName} className="lab-group">
              <h3 className="lab-name">{labName}</h3>
              <div className="tabela-scroll">
                <table className="tickets-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>COMPUTADOR</th>
                      <th>DESCRIÇÃO</th>
                      <th>DATA</th>
                      <th>STATUS</th>
                      <th>AÇÕES</th>
                    </tr>
                  </thead>
                  <tbody>
                    {labTickets.map((ticket) => (
                      <tr key={ticket.issue_id}>
                        <td>{ticket.issue_id.toString().padStart(3, "0")}</td>
                        <td>{`PC-${ticket.computer_id}`}</td>
                        <td className="description-cell">
                          {ticket.description}
                        </td>
                        <td>
                          {new Date(ticket.date_reported).toLocaleDateString(
                            "pt-BR",
                          )}
                        </td>
                        <td>
                          <span
                            className={`status-badge ${statusClass(ticket.status)}`}
                          >
                            {ticket.status}
                          </span>
                        </td>
                        <td>
                          <button
                            className="action-button"
                            onClick={() => handleOpenModal(ticket)}
                          >
                            Ver
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        )}
      </div>

      <EditTicketModal
        isOpen={isModalOpen}
        ticket={selectedTicket}
        onClose={handleCloseModal}
        onUpdate={onEdit}
        onDelete={onDelete}
      />
    </>
  );
}

export default TicketsTable;
