import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types/index.js';

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: any) => Promise<boolean>;
  logout: () => void;
  isAdmin: boolean;
  loginAsDemoAdmin: () => Promise<boolean>;
  loginAsDemoCustomer: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('lsm_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          localStorage.removeItem('lsm_token');
          setToken(null);
          setUser(null);
        }
      } catch (err) {
        console.error('Failed to verify token:', err);
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, [token]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!res.ok) {
        const errData = await res.json();
        alert(errData.error || 'Login failed');
        return false;
      }
      const data = await res.json();
      localStorage.setItem('lsm_token', data.token);
      setToken(data.token);
      setUser(data.user);
      return true;
    } catch (err) {
      alert('Network error during login');
      return false;
    }
  };

  const register = async (userData: any): Promise<boolean> => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      if (!res.ok) {
        const errData = await res.json();
        alert(errData.error || 'Registration failed');
        return false;
      }
      const data = await res.json();
      localStorage.setItem('lsm_token', data.token);
      setToken(data.token);
      setUser(data.user);
      return true;
    } catch (err) {
      alert('Network error during registration');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('lsm_token');
    setToken(null);
    setUser(null);
  };

  const loginAsDemoAdmin = async () => {
    return login('admin@lahorestationers.com', 'AdminLahore2026!');
  };

  const loginAsDemoCustomer = async () => {
    // Quick demo login or fallback register
    const success = await login('customer@lahorestationers.com', 'Customer2026!');
    if (!success) {
      return register({
        name: 'Tariq Mehmood',
        email: 'customer@lahorestationers.com',
        password: 'Customer2026!',
        phone: '+92 300 4567890',
        city: 'Lahore',
        address: 'Main Market, Gulberg III'
      });
    }
    return success;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        isAdmin: user?.role === 'admin',
        loginAsDemoAdmin,
        loginAsDemoCustomer
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
