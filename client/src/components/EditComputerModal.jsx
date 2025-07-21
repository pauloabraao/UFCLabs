import React, { useEffect, useState } from "react";

function EditComputerModal({ isOpen, onClose, computer, onEditComputer }) {
  const [os, setOs] = useState("");
  const [cpu, setCpu] = useState("");
  const [ram, setRam] = useState("");
  const [storage, setStorage] = useState("");
  const [status, setStatus] = useState("disponivel");

  useEffect(() => {
    if (computer) {
      setOs(computer.os || "");
      setCpu(computer.cpu || "");
      setRam(computer.ram || "");
      setStorage(computer.storage || "");
      setStatus(computer.status || "disponivel");
    }
  }, [computer]);

  if (!isOpen || !computer) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditComputer({
      ...computer,
      os,
      cpu,
      ram,
      storage,
      status,
    });
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-conteudo" onClick={e => e.stopPropagation()}>
        <span className="fechar" onClick={onClose}>&times;</span>
        <h2>Editar Computador</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="os-edit">Sistema Operacional</label>
            <input
              type="text"
              id="os-edit"
              value={os}
              onChange={e => setOs(e.target.value)}
              placeholder="Ex: Windows 10"
            />
          </div>
          <div className="form-group">
            <label htmlFor="cpu-edit">CPU</label>
            <input
              type="text"
              id="cpu-edit"
              value={cpu}
              onChange={e => setCpu(e.target.value)}
              placeholder="Ex: Intel i5"
            />
          </div>
          <div className="form-group">
            <label htmlFor="ram-edit">RAM</label>
            <input
              type="text"
              id="ram-edit"
              value={ram}
              onChange={e => setRam(e.target.value)}
              placeholder="Ex: 8GB"
            />
          </div>
          <div className="form-group">
            <label htmlFor="storage-edit">Armazenamento</label>
            <input
              type="text"
              id="storage-edit"
              value={storage}
              onChange={e => setStorage(e.target.value)}
              placeholder="Ex: 256GB SSD"
            />
          </div>
          <div className="form-group">
            <label htmlFor="status-edit">Status</label>
            <select
              id="status-edit"
              value={status}
              onChange={e => setStatus(e.target.value)}
            >
              <option value="disponivel">Disponível</option>
              <option value="fora de servico">Fora de serviço</option>
              <option value="em reparo">Em reparo</option>
            </select>
          </div>
          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn-submit">Salvar Alterações</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditComputerModal;
