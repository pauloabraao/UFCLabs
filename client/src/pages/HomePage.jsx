import React, { useState } from 'react';
import './Homepage.css';
import api from '../utils/api.js';
import { useNavigate } from 'react-router-dom';


const Homepage = () => {
  const [isLogin, setIsLogin] = useState(true); // Estado para controlar se é login ou sign in
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      // Lógica do login
      api.post('/auth/login', {
        email: e.target.email.value,
        password: e.target.password.value,
      })
      .then(response => {
        console.log('Login successful:', response.data);
        // Redirecionar ou atualizar o estado após o login
        
        document.cookie = `token=${response.data.token}; path=/;`;
        navigate('/labs'); // Redireciona para a página de laboratórios após o login

      })
      .catch(error => {
        console.error('Login failed:', error);
        // Exibir mensagem de erro ao usuário
      });
      
    } else {
      // Lógica de registro aqui
      console.log('Sign in submetido');
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
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
            <h1 className="form-title">{isLogin ? 'Acesse sua conta' : 'Crie sua conta'}</h1>
            <p className="form-subtitle">
              {isLogin ? 'Entre com suas credenciais para acessar o sistema' : 'Preencha os campos para se registrar'}
            </p>
            
            <form onSubmit={handleSubmit} className="login-form">
              {!isLogin && (
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Nome Completo</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="form-input" 
                    placeholder="Seu nome completo"
                    required={!isLogin}
                  />
                </div>
              )}
              
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

              {!isLogin && (
                <div className="form-group">
                  <label htmlFor="confirmPassword" className="form-label">Confirme sua Senha</label>
                  <input 
                    type="password" 
                    id="confirmPassword" 
                    className="form-input" 
                    placeholder="Confirme sua senha"
                    required={!isLogin}
                  />
                </div>
              )}
              
              {isLogin && (
                <div className="form-options">
                  <div className="remember-me">
                    <input type="checkbox" id="remember" />
                    <label htmlFor="remember">Lembrar-me</label>
                  </div>
                  <a href="/forgot-password" className="forgot-password">Esqueceu a senha?</a>
                </div>
              )}
              
              <button type="submit" className="login-button">
                {isLogin ? 'Entrar' : 'Cadastrar'}
              </button>
            </form>
            
            <div className="signup-section">
              <p>
                {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
                <button onClick={toggleForm} className="signup-link">
                  {isLogin ? ' Cadastre-se' : ' Faça login'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;