// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simulated token retrieval (replace with your actual token storage logic, e.g., localStorage)
    const token = localStorage.getItem('accessToken') || 'mock-token';
    try {
      const decoded = jwtDecode(token);
      setUser({
        roles: decoded.roles || [], // e.g., ['admin', 'editor']
        permissions: decoded.permissions || {} // e.g., { dashboard: ['view'], users: ['view', 'edit'] }
      });
    } catch (error) {
      console.error('Token decoding failed:', error);
      setUser(null);
    }
  }, []);

  // Check if user has permission for a specific resource and action
  const hasPermission = (resource, action) => {
    if (!user) return false;
    return user.permissions[resource]?.includes(action) || user.roles.includes('admin');
  };

  return (
    <AuthContext.Provider value={{ user, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
};