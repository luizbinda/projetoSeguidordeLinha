export const TOKEN_KEY = 'palavrachave';
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => JSON.parse(localStorage.getItem(TOKEN_KEY));
export const getLogado = () => localStorage.getItem('logado');
export const login = token => {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
};
export const setLogado = logado => {
  localStorage.setItem('logado', logado);
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem('logado');
};
