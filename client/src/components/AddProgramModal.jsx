import React, { useEffect, useState } from "react";
import axios from "axios";
import "../pages/ProgramPage.css";

function AddProgramModal({ isOpen, onClose, computerId, onAddProgram, installedPrograms = [] }) {
  const [availablePrograms, setAvailablePrograms] = useState([]);
  const [selectedProgramId, setSelectedProgramId] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setAvailablePrograms([]);
      setSelectedProgramId("");
      return;
    }

    setSubmitting(false);
    setSelectedProgramId("");

    axios
      .get("http://localhost:3000/api/programs")
      .then((res) => {
        const installedIds = new Set(
          (installedPrograms || []).map((p) => p.program_id)
        );
        setAvailablePrograms(
          res.data.filter((prog) => !installedIds.has(prog.program_id))
        );
      })
      .catch(() => setAvailablePrograms([]));
  }, [isOpen, installedPrograms]);

  const handleClose = () => {
    if (!submitting) onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProgramId || submitting) return;

    setSubmitting(true);
    try {
      await onAddProgram({
        computer_id: parseInt(computerId),
        program_id: parseInt(selectedProgramId),
      });
      setSelectedProgramId("");
    } catch {
      // Erro  que ja espera-se que foi tratado no ProgramPage
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal" onClick={handleClose}>
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
              <option value="" hidden>-- Selecione um Programa --</option>
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
            <button type="submit" className="btn-submit" disabled={submitting}>
              {submitting ? "Adicionando..." : "Adicionar Programa"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProgramModal;
