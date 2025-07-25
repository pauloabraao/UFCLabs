import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../pages/ProgramPage.css";

function ProgramHeader({ computerId, onOpenAddProgram }) {
  const navigate = useNavigate();

  return (
    <header className="main-header">
      <div className="header-container">
        <div className="header-left">
          <a href="#" className="icon-btn" aria-label="Perfil do usuário">
            <i className="fas fa-user-circle"></i>
          </a>
          <div className="info-display">
            Computador {computerId}
          </div>
        </div>
        <div className="header-right">
          <button className="btn-add" onClick={onOpenAddProgram}>
            Programa <i className="fas fa-plus"></i>
          </button>
          <a
            href="#"
            id="btn-logout"
            className="icon-btn"
            aria-label="Voltar"
            onClick={() => navigate(-1)}
          >
            <i className="fas fa-arrow-left"></i>
          </a>
        </div>
      </div>
    </header>
  );
}

export default ProgramHeader;
