import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  changePassword: (newPassword: string) => void;
  loginError: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_USERNAME = 'S_D_CoMpUtEr';
const DEFAULT_PASSWORD = 'Qwertypoiu@1';
const PASSWORD_KEY = 'sdc_admin_password';
const AUTH_KEY = 'sdc_authenticated';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [currentPassword, setCurrentPassword] = useState(DEFAULT_PASSWORD);

  useEffect(() => {
    // Load saved password and auth state
    const savedPassword = localStorage.getItem(PASSWORD_KEY);
    const savedAuth = localStorage.getItem(AUTH_KEY);
    
    if (savedPassword) {
      setCurrentPassword(savedPassword);
    }
    
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
      setIsAdmin(true);
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    setLoginError('');
    
    if (username === ADMIN_USERNAME && password === currentPassword) {
      setIsAuthenticated(true);
      setIsAdmin(true);
      localStorage.setItem(AUTH_KEY, 'true');
      return true;
    } else {
      setLoginError('Invalid username or password');
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    localStorage.removeItem(AUTH_KEY);
  };

  const changePassword = (newPassword: string) => {
    setCurrentPassword(newPassword);
    localStorage.setItem(PASSWORD_KEY, newPassword);
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      isAdmin,
      login,
      logout,
      changePassword,
      loginError
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};