import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, createSession } from '../services/api';
import jwt_decode from 'jwt-decode';

export const TokenContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const recoveredUser = decode(token);

    if (recoveredUser && token) {
      setUser(recoveredUser);
      api.defaults.headers.authorization = `Bearer ${token}`;
    }

    setLoading(false);
  }, []);

  const decode = token => {
    try {
      const data = jwt_decode(token);

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async (email, password) => {
    try {
      setLoading(true);
      const response = await createSession(email, password);
      // console.log('response', response);

      const token = response.data.token;

      const loggedUser = decode(response.data.token);
      setUser(loggedUser);

      localStorage.setItem('token', token);

      api.defaults.headers.authorization = `Bearer ${token}`;

      navigate('/');
      setLoading(false);
    } catch (error) {
      console.log(error);
    }

    /* setLoading(true);
    api
      .post('/login', { email, password })
      .then(res => {
        localStorage.setItem('token', res.data.token);
        api.defaults.headers.authorization = `Bearer ${res.data.token}`;
        console.log('res.data', res);
      })
      .catch(err => {
        // TODO: Fazer tratamento dos retornos com erro
        console.debug('ERRO', err);
        // eslint-disable-next-line no-alert
        alert('Erro ao fazer login.');
      })
      .finally(() => {
        setLoading(false);
        navigate('/');
      }); */
  };

  const handleLogout = () => {
    console.log('logout');

    localStorage.removeItem('token');
    api.defaults.headers.authorization = null;

    setUser(null);
    navigate('/login');
  };

  return (
    <TokenContext.Provider
      value={{
        authenticated: !!user,
        user,
        loading,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </TokenContext.Provider>
  );
}

export function useToken() {
  const context = useContext(TokenContext);
  return context;
}
