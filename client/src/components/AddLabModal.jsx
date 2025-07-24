import React, { useState } from 'react';

function AddLabModal({ isOpen, onClose, onAddLab }) {
  const [name, setName] = useState('');
  const [capacity, setCapacity] = useState('');
  const [num_computers, setNumComputers] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddLab({ name, capacity, num_computers });
    setName('');
    setCapacity('');
    setNumComputers('');
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-conteudo" onClick={(e) => e.stopPropagation()}>
        <span className="fechar" onClick={onClose}>&times;</span>
        <h2>Adicionar Novo Laboratório</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nome-lab">Nome do Laboratório</label>
            <input
              type="text"
              id="nome-lab"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Laboratório de Redes"
              required
            />
          </div>
        
          <div className="form-group">
            <label htmlFor="capacidade">Capacidade</label>
            <input
              type="number"
              id="capacidade"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              placeholder="Ex: 30"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="num_computers">Número de Computadores</label>
            <input
              type="number"
              id="num_computers"
              value={num_computers}
              onChange={(e) => setNumComputers(e.target.value)}
              placeholder="Ex: 30"
              required
            />
          </div>
          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn-submit">Adicionar Laboratório</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddLabModal;