import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../pages/ComputersPage.css";

// Header for ComputersPage
function ComputersHeader({ labName, onOpenModal, onLogout, onOpenSchedule }) {
  return (
    <header className="main-header">
      <div className="header-container">
        <div className="header-left">
          <a href="#" className="icon-btn" aria-label="Perfil do usuário">
            <i className="fas fa-user-circle"></i>
          </a>
          <div className="info-display">
            {labName ? labName : "Laboratório"}
          </div>
          <button className="btn-add" onClick={onOpenSchedule}>
            Horário <i className="fas fa-calendar-alt"></i>
          </button>
        </div>
        <div className="header-right">
          <button className="btn-add" onClick={() => window.location.href = '/tickets'}>
            Chamado <i className="fas fa-plus"></i>
          </button>
          <button className="btn-add" onClick={onOpenModal}>
            Computador <i className="fas fa-plus"></i>
          </button>
          <a
            href="#"
            id="btn-logout"
            className="icon-btn"
            aria-label="Sair"
            onClick={onLogout}
          >
            <i className="fas fa-sign-out-alt"></i>
          </a>
        </div>
      </div>
    </header>
  );
}

export default ComputersHeader;