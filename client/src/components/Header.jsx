import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header({
    onOpenModal,
    campuses = [],
    blocks = [],
    selectedCampusId,
    selectedBlockId,
    onCampusChange,
    onBlockChange
}) {
    const navigate = useNavigate();

    const handleLogout = () => {
        if (window.confirm("Você tem certeza que deseja sair?")) {
            navigate('/');
        }
    };

    return (
        <header className="main-header">
            <div className="header-container">
                <div className="header-left">
                    <a href="#" className="icon-btn" aria-label="Perfil do usuário">
                        <i className="fas fa-user-circle"></i>
                    </a>
                    <div className="filters">
                        {/* Campus select */}
                        <select
                            className="info-display"
                            value={selectedCampusId || ''}
                            onChange={e => onCampusChange(e.target.value)}
                        >
                            <option value="">Selecione o campus</option>
                            {campuses.map(campus => (
                                <option key={campus.campus_id} value={campus.campus_id}>
                                    {campus.name}
                                </option>
                            ))}
                        </select>
                        {/* Block select */}
                        <select
                            className="info-display"
                            value={selectedBlockId || ''}
                            onChange={e => onBlockChange(e.target.value)}
                            disabled={!selectedCampusId}
                        >
                            <option value="">Selecione o bloco</option>
                            {blocks.map(block => (
                                <option key={block.block_id} value={block.block_id}>
                                    {block.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="header-right">
                    <button className="btn-add" onClick={() => {
                        console.log("Botão 'Adicionar Laboratório' foi clicado!");
                        onOpenModal();
                    }}>
                        Laboratório <i className="fas fa-plus"></i>
                    </button>
                    <a href="#" id="btn-logout" className="icon-btn" aria-label="Sair" onClick={handleLogout}>
                        <i className="fas fa-sign-out-alt"></i>
                    </a>
                </div>
            </div>
        </header>
    );
}

export default Header;