import React from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/labs");
  };

  const handleLogout = () => {
    if (window.confirm("Você tem certeza que deseja sair?")) {
      navigate("/");
    }
  };

  return (
    <header className="main-header">
      <div className="header-container">
        <div className="header-left">
          <button
            className="icon-btn"
            aria-label="Voltar"
            onClick={handleBack}
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <i className="fas fa-arrow-left"></i>
          </button>
          <a href="#" className="icon-btn" aria-label="Perfil do usuário">
            <i className="fas fa-user-circle"></i>
          </a>
          <span className="info-display">Chamados Técnicos</span>
        </div>
        <div className="header-right">
          <a
            href="#"
            id="btn-logout"
            className="icon-btn"
            aria-label="Sair"
            onClick={handleLogout}
          >
            <i className="fas fa-sign-out-alt"></i>
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
