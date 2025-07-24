import { jwtDecode } from 'jwt-decode';
import getCookie from './getCookies';

/**
 * Decodifica o token JWT do cookie para obter as informações do usuário.
 * @returns {object|null} O payload do token decodificado (incluindo a role) ou null se o token não existir ou for inválido.
 */
export default function getUserInfo() {
  const token = getCookie('token');
  if (!token) {
    return null;
  }
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Falha ao decodificar o token:", error);
    return null;
  }
}