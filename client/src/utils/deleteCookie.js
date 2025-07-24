export default function deleteCookie(name) {
  // Define a data de expiração do cookie para o passado, o que faz com que o navegador o remova.
  // O Path=/ garante que o cookie seja removido para todo o site.
  document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}