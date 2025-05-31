'use client';

import { useState, useEffect, createContext, useContext, useCallback } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  isPremium: boolean;
  freeTrialUsed: {
    aiAgent: number;
    tools: Record<string, number>;
  };
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  checkUsageLimit: (feature: string, subFeature?: string) => boolean;
  incrementUsage: (feature: string, subFeature?: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 模拟登录功能
  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 模拟登录验证
      if (email && password.length >= 6) {
        const mockUser: User = {
          id: `user_${Date.now()}`,
          email,
          name: email.split('@')[0],
          createdAt: new Date().toISOString(),
          isPremium: false,
          freeTrialUsed: {
            aiAgent: 0,
            tools: {}
          }
        };
        
        // 保存到 sessionStorage (注意: 在实际应用中应该使用更安全的方式)
        sessionStorage.setItem('user', JSON.stringify(mockUser));
        setUser(mockUser);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 模拟注册功能
  const register = useCallback(async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // 模拟注册
      const mockUser: User = {
        id: `user_${Date.now()}`,
        email,
        name,
        createdAt: new Date().toISOString(),
        isPremium: false,
        freeTrialUsed: {
          aiAgent: 0,
          tools: {}
        }
      };
      
      sessionStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      return true;
    } catch (error) {
      console.error('Register error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 登出功能
  const logout = useCallback(() => {
    sessionStorage.removeItem('user');
    setUser(null);
  }, []);

  // 检查使用限制
  const checkUsageLimit = useCallback((feature: string, subFeature?: string): boolean => {
    if (!user) return false;
    if (user.isPremium) return true;

    const limits = {
      aiAgent: 3, // AI Agent 免费使用3次
      tools: 5    // 每个工具免费使用5次
    };

    if (feature === 'aiAgent') {
      return user.freeTrialUsed.aiAgent < limits.aiAgent;
    }

    if (feature === 'tools' && subFeature) {
      const toolUsage = user.freeTrialUsed.tools[subFeature] || 0;
      return toolUsage < limits.tools;
    }

    return false;
  }, [user]);

  // 增加使用次数
  const incrementUsage = useCallback((feature: string, subFeature?: string) => {
    if (!user) return;

    const updatedUser = { ...user };
    
    if (feature === 'aiAgent') {
      updatedUser.freeTrialUsed.aiAgent += 1;
    } else if (feature === 'tools' && subFeature) {
      updatedUser.freeTrialUsed.tools[subFeature] = (updatedUser.freeTrialUsed.tools[subFeature] || 0) + 1;
    }

    setUser(updatedUser);
    sessionStorage.setItem('user', JSON.stringify(updatedUser));
  }, [user]);

  // 初始化时检查是否有已保存的用户信息
  useEffect(() => {
    const savedUser = sessionStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse saved user data:', error);
        sessionStorage.removeItem('user');
      }
    }
  }, []);

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    checkUsageLimit,
    incrementUsage
  };

  return (
    <AuthContext.Provider value={value}>
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