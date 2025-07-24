import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ComputerCard from "../components/ComputerCard";
import ComputersHeader from "../components/ComputersHeader";
import { Container, Typography } from "@mui/material";
import "../pages/ComputersPage.css";

// Modal for adding a computer
function AddComputerModal({ isOpen, onClose, onAddComputer }) {
  const [os, setOs] = useState("");
  const [cpu, setCpu] = useState("");
  const [ram, setRam] = useState("");
  const [storage, setStorage] = useState("");
  const [status, setStatus] = useState("disponivel");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddComputer({ os, cpu, ram, storage, status });
    setOs("");
    setCpu("");
    setRam("");
    setStorage("");
    setStatus("disponivel");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal" onClick={onClose}>
      <div
        className="modal-conteudo"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="fechar" onClick={onClose}>
          &times;
        </span>
        <h2>Adicionar Novo Computador</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="os">Sistema Operacional</label>
            <input
              type="text"
              id="os"
              value={os}
              onChange={(e) => setOs(e.target.value)}
              placeholder="Ex: Windows 10"
            />
          </div>
          <div className="form-group">
            <label htmlFor="cpu">CPU</label>
            <input
              type="text"
              id="cpu"
              value={cpu}
              onChange={(e) => setCpu(e.target.value)}
              placeholder="Ex: Intel i5"
            />
          </div>
          <div className="form-group">
            <label htmlFor="ram">RAM</label>
            <input
              type="text"
              id="ram"
              value={ram}
              onChange={(e) => setRam(e.target.value)}
              placeholder="Ex: 8GB"
            />
          </div>
          <div className="form-group">
            <label htmlFor="storage">Armazenamento</label>
            <input
              type="text"
              id="storage"
              value={storage}
              onChange={(e) => setStorage(e.target.value)}
              placeholder="Ex: 256GB SSD"
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="disponivel">Disponível</option>
              <option value="fora de servico">Fora de serviço</option>
              <option value="em reparo">Em reparo</option>
            </select>
          </div>
          <div className="form-actions">
            <button
              type="button"
              className="btn-cancel"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button type="submit" className="btn-submit">
              Adicionar Computador
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddComputerModal;