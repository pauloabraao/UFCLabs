import React, { useState } from 'react';
import './Homepage.css';
import api from '../utils/api.js';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const [isLogin, setIsLogin] = useState(true); // Estado para controlar se é login ou sign in
  const [error, setError] = useState(''); // Estado para a mensagem de erro
  const [success, setSuccess] = useState(''); // Estado para a mensagem de sucesso
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (isLogin) {
      // Login
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
        // Verifica se o erro é de credenciais inválidas
        if (error.response && error.response.status === 401) {
          setError('E-mail ou senha inválidos. Tente novamente.');
        } else {
          setError('Ocorreu um erro inesperado. Por favor, tente mais tarde.');
          console.error('Login failed:', error);
        }
      });
    
    } else {
      // Lógica de registro
      const name = e.target.name.value;
      const email = e.target.email.value;
      const password = e.target.password.value;
      const confirmPassword = e.target.confirmPassword.value;

      if (password !== confirmPassword) {
        setError('As senhas não coincidem.');
        return;
      }

      api.post('/users', {
        name,
        email,
        password,
        role: 'estudante', // Role é sempre 'estudante' no cadastro via frontend
        campus_id: 1
      })
      .then(response => {
        console.log('Registration successful:', response.data);
        setSuccess('Conta criada com sucesso! Por favor, faça o login.');
        setIsLogin(true); // Volta para a tela de login
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.error) {
          if (error.response.data.error.includes('email')) {
            setError('Este e-mail já está cadastrado. Tente fazer login.');
          } else {
            setError('Erro ao criar a conta: ' + error.response.data.error);
          }
        } else {
          setError('Ocorreu um erro inesperado ao criar a conta. Tente novamente.');
        }
        console.error('Registration failed:', error);
      });
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError('');
    setSuccess('');
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
            
            {success && <p className="success-message">{success}</p>}
            
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
              
              {error && <p className="error-message">{error}</p>}

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