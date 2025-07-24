import React from 'react';
import './DownloadReportPage.css'; // Importando o arquivo CSS

const ReportPage = () => {
  const handleDownload = () => {
    // Substitua pela URL da sua API Python
    const apiUrl = 'http://localhost:5000/report';

    // Cria um link invisível
    const link = document.createElement('a');
    link.href = apiUrl;
    link.download = 'LabsSystem_EDA_Report.pdf'; // Nome padrão do arquivo

    // Adiciona o link ao DOM, simula o clique e remove o link
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="download-page-container">
      <div className="download-card">
        <h1 className="download-title">Relatório de Análise Exploratória</h1>
        <p className="download-description">
          Clique no botão abaixo para baixar o relatório completo em formato PDF.
          O relatório contém análises estatísticas, visualizações e insights sobre os dados do sistema.
        </p>
        
        <button className="download-button" onClick={handleDownload}>
          Baixar Relatório
          <svg className="download-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
        </button>
        
        <div className="download-info">
          <p><strong>Tamanho aproximado:</strong> 1.2 MB</p>
          <p><strong>Formato:</strong> PDF (Portable Document Format)</p>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;