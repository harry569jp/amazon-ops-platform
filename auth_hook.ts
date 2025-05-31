'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

interface User {
  id: string;
  email: string;
  name: string;
  subscription: 'free' | 'pro' | 'premium';
  usageCount: {
    aiQueries: number;
    toolUsage: number;
    downloads: number;
  };
  maxUsage: {
    aiQueries: number;
    toolUsage: number;
    downloads: number;
  };
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  checkUsageLimit: (type: 'aiQueries' | 'toolUsage' | 'downloads') => boolean;
  incrementUsage: (type: 'aiQueries' | 'toolUsage' | 'downloads') => void;
  requireAuth: (callback: () => void) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    // 检查本地存储中的用户信息
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem('amazonOps_user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error loading user from storage:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // 这里应该调用真实的API
      // 现在使用模拟登录
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0],
        subscription: 'free',
        usageCount: {
          aiQueries: 0,
          toolUsage: 0,
          downloads: 0
        },
        maxUsage: {
          aiQueries: 3,
          toolUsage: 5,
          downloads: 2
        }
      };

      setUser(mockUser);
      localStorage.setItem('amazonOps_user', JSON.stringify(mockUser));
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      // 这里应该调用真实的API
      // 现在使用模拟注册
      const mockUser: User = {
        id: Date.now().toString(),
        email,
        name,
        subscription: 'free',
        usageCount: {
          aiQueries: 0,
          toolUsage: 0,
          downloads: 0
        },
        maxUsage: {
          aiQueries: 3,
          toolUsage: 5,
          downloads: 2
        }
      };

      setUser(mockUser);
      localStorage.setItem('amazonOps_user', JSON.stringify(mockUser));
      return true;
    } catch (error) {
      console.error('Register error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('amazonOps_user');
    router.push(`/${locale}`);
  };

  const checkUsageLimit = (type: 'aiQueries' | 'toolUsage' | 'downloads'): boolean => {
    if (!user) return false;
    return user.usageCount[type] < user.maxUsage[type];
  };

  const incrementUsage = (type: 'aiQueries' | 'toolUsage' | 'downloads') => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      usageCount: {
        ...user.usageCount,
        [type]: user.usageCount[type] + 1
      }
    };
    
    setUser(updatedUser);
    localStorage.setItem('amazonOps_user', JSON.stringify(updatedUser));
  };

  const requireAuth = (callback: () => void) => {
    if (user) {
      callback();
    } else {
      router.push(`/${locale}/auth/login`);
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    checkUsageLimit,
    incrementUsage,
    requireAuth
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