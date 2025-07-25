import React, { useEffect, useState } from "react";

function EditComputerModal({ isOpen, onClose, computer, onEditComputer, onDeleteComputer }) {
  const [os, setOs] = useState("");
  const [property_id, setPropertyId] = useState("");
  const [cpu, setCpu] = useState("");
  const [ram, setRam] = useState("");
  const [storage, setStorage] = useState("");
  const [status, setStatus] = useState("disponivel");

  useEffect(() => {
    if (computer) {
      setOs(computer.os || "");
      setPropertyId(computer.property_id || "");
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
      property_id
    });
  };

  const handleDelete = () => {
    if (window.confirm("Tem certeza que deseja excluir este computador? Esta ação não pode ser desfeita.")) {
      onDeleteComputer(computer);
    }
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-conteudo" onClick={e => e.stopPropagation()}>
        <span className="fechar" onClick={onClose}>&times;</span>
        <h2>Editar Computador</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="property_id-edit">Partimônio</label>
            <input
              type="text"
              id="property_id-edit"
              value={property_id}
              onChange={e => setPropertyId(e.target.value)}
              placeholder="Ex: 1234567"
            />
          </div>
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
            <button
              type="button"
              className="btn-delete"
              style={{ backgroundColor: "#e53935", color: "#fff", marginLeft: "auto", display: "flex", alignItems: "center", gap: "4px" }}
              onClick={handleDelete}
              title="Excluir computador"
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 24 24" width="18" fill="#fff" style={{ marginRight: 4 }}>
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-4.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/>
              </svg>
              Excluir
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditComputerModal;
