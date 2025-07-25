import React, { useState, useEffect } from 'react';
import TicketsHeader from '../components/TicketsHeader';
import TicketsGrid from '../components/TicketsGrid';
import AddTicketModal from '../components/AddTicketModal';
import './TicketsPage.css';
import axios from 'axios';
import { Typography } from "@mui/material";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

function TicketsPage() {
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('todos');
  const [computers, setComputers] = useState([]);

  const components = [
    { id: 1, name: 'Computador' },
    { id: 2, name: 'Teclado' },
    { id: 3, name: 'Mouse' },
    { id: 4, name: 'Monitor' },
    { id: 5, name: 'Gabinete' },
    { id: 6, name: 'Outros' }
  ];

  useEffect(() => {
    axios.get('http://localhost:3000/api/computer-issues')
      .then(res => setTickets(res.data))
      .catch(() => setTickets([]))
      .finally(() => setLoading(false));

    axios.get('http://localhost:3000/api/computers')
      .then(res => setComputers(res.data))
      .catch(() => setComputers([]));
  }, []);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleAddTicket = (newTicket) => {
    const componentName = components.find(c => c.id === newTicket.component_id)?.name.toLowerCase();

    const payload = {
      computer_id: newTicket.computer_id,
      reported_by: 1,
      description: newTicket.description,
      date_reported: new Date().toISOString().split('T')[0],
      status: 'aberto',
      component: componentName || 'outros'
    };

    axios.post('http://localhost:3000/api/computer-issues', payload)
      .then(res => {
        setTickets([...tickets, res.data]);
        setIsModalOpen(false);
      })
      .catch(() => alert('Erro ao abrir chamado.'));
  };

  const filteredTickets = statusFilter === 'todos'
    ? tickets
    : tickets.filter(ticket => ticket.status.toLowerCase() === statusFilter);

  return (
    <>
      <TicketsHeader />
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          className="fab-inferior-direito"
          onClick={handleOpenModal}
        >
          Abrir chamado
        </Button>

      <main className="main-content">
        <div className="filtro-status">
          {['todos', 'aberto', 'em andamento', 'resolvido'].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`filtro-botao ${statusFilter === status ? 'ativo' : ''}`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
        {loading ? (
          <Typography>Carregando...</Typography>
        ) : (
          <TicketsGrid tickets={filteredTickets} />
        )}
      </main>

      <AddTicketModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddTicket={handleAddTicket}
        computers={computers}
        components={components}
      />
    </>
  );
}

export default TicketsPage;
