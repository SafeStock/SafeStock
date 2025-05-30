// src/utils/auth.js
export const getToken = () => {
  return sessionStorage.getItem('authToken');
};

export const setToken = (token) => {
  sessionStorage.setItem('authToken', token);
};

export const removeToken = () => {
  sessionStorage.removeItem('authToken');
};