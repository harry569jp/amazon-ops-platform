'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkLoginRequired: () => boolean;
  getAITrialsRemaining: () => number;
  useAITrial: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 检查是否有保存的用户信息
    const savedUser = Cookies.get('user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        Cookies.remove('user');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // 模拟登录API调用
      // 在实际项目中，这里应该调用真实的API
      if (email && password) {
        const userData: User = {
          id: '1',
          name: email.split('@')[0],
          email: email,
        };
        
        setUser(userData);
        setIsLoggedIn(true);
        Cookies.set('user', JSON.stringify(userData), { expires: 7 });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // 模拟注册API调用
      if (name && email && password) {
        const userData: User = {
          id: Date.now().toString(),
          name: name,
          email: email,
        };
        
        setUser(userData);
        setIsLoggedIn(true);
        Cookies.set('user', JSON.stringify(userData), { expires: 7 });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Register error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    Cookies.remove('user');
    Cookies.remove('aiTrials');
  };

  const checkLoginRequired = (): boolean => {
    return !isLoggedIn;
  };

  const getAITrialsRemaining = (): number => {
    if (isLoggedIn) return -1; // 已登录用户无限制
    
    const trials = Cookies.get('aiTrials');
    if (!trials) return 3; // 默认3次免费试用
    
    try {
      const trialsData = JSON.parse(trials);
      return Math.max(0, 3 - trialsData.used);
    } catch {
      return 3;
    }
  };

  const useAITrial = () => {
    if (isLoggedIn) return;
    
    const trials = Cookies.get('aiTrials');
    let used = 0;
    
    if (trials) {
      try {
        const trialsData = JSON.parse(trials);
        used = trialsData.used || 0;
      } catch {
        used = 0;
      }
    }
    
    const newTrialsData = {
      used: used + 1,
      lastUsed: Date.now()
    };
    
    Cookies.set('aiTrials', JSON.stringify(newTrialsData), { expires: 30 });
  };

  const value: AuthContextType = {
    user,
    isLoggedIn,
    login,
    register,
    logout,
    checkLoginRequired,
    getAITrialsRemaining,
    useAITrial,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}