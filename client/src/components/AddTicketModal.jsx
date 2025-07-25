import React, { useState, useEffect } from 'react';
import {
  Modal, Box, Typography, TextField, Button,
  MenuItem, FormControl, InputLabel, Select
} from '@mui/material';

const style = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 380,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 3,
};

function AddTicketModal({ isOpen, onClose, onAddTicket, computers = [], components = [] }) {
  const [selectedComputer, setSelectedComputer] = useState('');
  const [selectedComponent, setSelectedComponent] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setSelectedComputer('');
      setSelectedComponent('');
      setDescription('');
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (!selectedComputer || !selectedComponent || !description.trim()) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    onAddTicket({
      computer_id: selectedComputer,
      component_id: selectedComponent,
      description: description.trim()
    });
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" mb={2} fontWeight="bold">Novo Chamado</Typography>

        <FormControl fullWidth margin="normal">
          <InputLabel id="select-computer-label">Computador</InputLabel>
          <Select
            labelId="select-computer-label"
            value={selectedComputer}
            label="Computador"
            onChange={e => setSelectedComputer(e.target.value)}
          >
            {computers.map((c) => (
              <MenuItem key={c.computer_id} value={c.computer_id}>
                {`PC ${c.computer_id} - ${c.os}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel id="select-component-label">Componente</InputLabel>
          <Select
            labelId="select-component-label"
            value={selectedComponent}
            label="Componente"
            onChange={e => setSelectedComponent(e.target.value)}
          >
            {components.map((comp) => (
              <MenuItem key={comp.id} value={comp.id}>
                {comp.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Descrição"
          placeholder="Descreva o problema em detalhes..."
          multiline
          rows={4}
          fullWidth
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Box mt={3} display="flex" justifyContent="flex-end" gap={1}>
          <Button variant="outlined" onClick={onClose}>Cancelar</Button>
          <Button variant="contained" onClick={handleSubmit}>Enviar Chamado</Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default AddTicketModal;