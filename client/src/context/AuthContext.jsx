import React, { createContext, useState, useEffect } from 'react';
import { loginAdminApi, getAdminProfileApi } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('adminToken') || null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      if (token) {
        try {
          const res = await getAdminProfileApi();
          setAdmin(res.data.admin);
        } catch (error) {
          console.error('Session expired or invalid token');
          logout();
        }
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, [token]);

  const login = async (email, password) => {
    setAuthError(null);
    try {
      const res = await loginAdminApi({ email, password });
      const { token: newToken, admin: adminData } = res.data;

      localStorage.setItem('adminToken', newToken);
      setToken(newToken);
      setAdmin(adminData);
      return { success: true };
    } catch (error) {
      const msg = error.response?.data?.message || 'Login failed. Invalid credentials.';
      setAuthError(msg);
      return { success: false, message: msg };
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setToken(null);
    setAdmin(null);
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        token,
        isAuthenticated: !!token && !!admin,
        loading,
        authError,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
