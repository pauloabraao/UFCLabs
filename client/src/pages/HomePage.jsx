import React from 'react';
import './Homepage.css';

const Homepage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de login aqui
    console.log('Formulário submetido');
  };

  return (
    <div className="homepage-container">
      {/* Logo no canto superior esquerdo */}
      <div className="logo-container">
        <img 
          src="../../assets/logo01.png" 
          alt="Logo da Instituição" 
          className="institutional-logo"
        />
      </div>

      {/* Layout dividido */}
      <div className="split-layout">
        {/* Metade com imagem */}
        <div className="image-half">
          <div className="image-overlay"></div>
          <img 
            src="../../assets/background.jpg" 
            alt="Alunos utilizando computadores" 
            className="institutional-image"
          />
          <div className="image-caption">
            <h2>Bem-vindo ao UFCLabs</h2>
            <p>Sistema de Gerenciamento de Laboratórios de Computação</p>
          </div>
        </div>

        {/* Metade com formulário */}
        <div className="form-half">
          <div className="form-container">
            <h1 className="form-title">Acesse sua conta</h1>
            <p className="form-subtitle">Entre com suas credenciais para acessar o sistema</p>
            
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="email" className="form-label">E-mail</label>
                <input 
                  type="email" 
                  id="email" 
                  className="form-input" 
                  placeholder="example@email.com"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password" className="form-label">Senha</label>
                <input 
                  type="password" 
                  id="password" 
                  className="form-input" 
                  placeholder="Digite sua senha"
                  required
                />
              </div>
              
              <div className="form-options">
                <div className="remember-me">
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember">Lembrar-me</label>
                </div>
                <a href="/forgot-password" className="forgot-password">Esqueceu a senha?</a>
              </div>
              
              <button type="submit" className="login-button">Entrar</button>
            </form>
            
            <div className="signup-section">
              <p>Não tem uma conta? <a href="/signup" className="signup-link">Cadastre-se</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;