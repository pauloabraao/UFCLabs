import React, { useEffect, useState } from "react";
import axios from "axios";
import "../pages/ProgramPage.css";

function AddProgramModal({ isOpen, onClose, computerId, onAddProgram }) {
  const [availablePrograms, setAvailablePrograms] = useState([]);
  const [selectedProgramId, setSelectedProgramId] = useState("");

  useEffect(() => {
    if (isOpen) {
      axios
        .get("http://localhost:3000/api/programs")
        .then((res) => setAvailablePrograms(res.data))
        .catch(() => setAvailablePrograms([]));
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedProgramId) return;

    onAddProgram({
      computer_id: parseInt(computerId),
      program_id: parseInt(selectedProgramId),
    });

    setSelectedProgramId("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-conteudo" onClick={(e) => e.stopPropagation()}>
        <span className="fechar" onClick={onClose}>
          &times;
        </span>
        <h2>Adicionar Programa ao Computador {computerId}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="program-select">Selecionar Programa</label>
            <select
              id="program-select"
              value={selectedProgramId}
              onChange={(e) => setSelectedProgramId(e.target.value)}
              required
            >
              <option value="">-- Selecione um Programa --</option>
              {availablePrograms.map((prog) => (
                <option key={prog.program_id} value={prog.program_id}>
                  {prog.name} - {prog.version}
                </option>
              ))}
            </select>
          </div>
          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-submit">
              Adicionar Programa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProgramModal;
