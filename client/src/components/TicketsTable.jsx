import React from 'react';

function TicketsTable({ tickets, onEdit, onDelete }) {
    return (
        <div className="tickets-table-container">
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
                        {tickets.map((ticket) => (
                            <tr key={ticket.issue_id}>
                                <td>{ticket.issue_id.toString().padStart(3, '0')}</td>
                                <td>{`PC-${ticket.computer_id}`}</td>
                                <td>{ticket.description}</td>
                                <td>{new Date(ticket.date_reported).toLocaleDateString('pt-BR')}</td>
                                <td>
                                    <span className={`status-badge ${ticket.status.toLowerCase()}`}>
                                        {ticket.status}
                                    </span>
                                </td>
                                <td>
                                    <a href="#" onClick={() => onEdit(ticket)}>Ver</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TicketsTable;