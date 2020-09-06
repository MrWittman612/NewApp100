import axios from 'axios';

const checkAuth = () => {
  let isAuthenticated = false;
  if (localStorage.getItem('token')) {
    setAuthToken();
    isAuthenticated = true;
  }
  return isAuthenticated;
};

const setAuthToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

const saveAuthToken = (token) => {
  localStorage.setItem('token', token);
  setAuthToken();
};

export { checkAuth, saveAuthToken, setAuthToken };
