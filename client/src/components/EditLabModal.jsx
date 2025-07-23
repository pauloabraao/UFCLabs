import React, { useEffect, useState } from "react";

function EditLabModal({ isOpen, onClose, lab, onEditLab, onDeleteLab }) {
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [numComputers, setNumComputers] = useState("");

  useEffect(() => {
    if (lab) {
      setName(lab.name || "");
      setCapacity(lab.capacity || "");
      setNumComputers(lab.num_computers || "");
    }
  }, [lab]);

  if (!isOpen || !lab) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditLab({
      ...lab,
      name,
      capacity: parseInt(capacity),
      num_computers: parseInt(numComputers)
    });
  };

  const handleDelete = () => {
    if (window.confirm("Tem certeza que deseja excluir este laboratório? Esta ação não pode ser desfeita.")) {
      onDeleteLab && onDeleteLab(lab);
    }
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-conteudo" onClick={e => e.stopPropagation()}>
        <span className="fechar" onClick={onClose}>&times;</span>
        <h2>Editar Laboratório</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="lab-name-edit">Nome do Laboratório</label>
            <input
              type="text"
              id="lab-name-edit"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lab-capacity-edit">Capacidade</label>
            <input
              type="number"
              id="lab-capacity-edit"
              value={capacity}
              onChange={e => setCapacity(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lab-num-computers-edit">Número de Computadores</label>
            <input
              type="number"
              id="lab-num-computers-edit"
              value={numComputers}
              onChange={e => setNumComputers(e.target.value)}
              required
            />
          </div>
          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn-submit">Salvar Alterações</button>
            <button
              type="button"
              className="btn-delete"
              style={{ backgroundColor: "#e53935", color: "#fff", marginLeft: "auto", display: "flex", alignItems: "center", gap: "4px" }}
              onClick={handleDelete}
              title="Excluir laboratório"
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

export default EditLabModal;
