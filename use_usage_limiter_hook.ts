import { useState, useEffect, useCallback } from 'react';

interface UsageLimiterConfig {
  type: 'toolUsage' | 'aiChat' | 'downloads';
  requireAuth?: boolean;
  onAuthRequired?: () => void;
  onUsageExceeded?: () => void;
}

interface UsageLimiterReturn {
  currentUsage: number;
  maxUsage: number;
  usagePercentage: number;
  canUse: boolean;
  useFeature: (callback?: () => Promise<void>) => Promise<boolean>;
  resetUsage: () => void;
}

const USAGE_LIMITS = {
  toolUsage: { free: 5, premium: 100 },
  aiChat: { free: 3, premium: 50 },
  downloads: { free: 2, premium: 20 }
};

export const useUsageLimiter = (config: UsageLimiterConfig): UsageLimiterReturn => {
  const [currentUsage, setCurrentUsage] = useState(0);
  const [userTier, setUserTier] = useState<'free' | 'premium'>('free');

  // 从 localStorage 或 cookie 获取使用次数
  useEffect(() => {
    const storageKey = `usage_${config.type}`;
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      const data = JSON.parse(stored);
      const today = new Date().toDateString();
      
      // 如果是新的一天，重置使用次数
      if (data.date !== today) {
        setCurrentUsage(0);
        localStorage.setItem(storageKey, JSON.stringify({ count: 0, date: today }));
      } else {
        setCurrentUsage(data.count);
      }
    }

    // TODO: 从用户认证状态获取用户等级
    // const user = getCurrentUser();
    // setUserTier(user?.tier || 'free');
  }, [config.type]);

  const maxUsage = USAGE_LIMITS[config.type][userTier];
  const usagePercentage = Math.min((currentUsage / maxUsage) * 100, 100);
  const canUse = currentUsage < maxUsage;

  const useFeature = useCallback(async (callback?: () => Promise<void>): Promise<boolean> => {
    // 检查是否需要认证
    if (config.requireAuth) {
      // TODO: 检查用户是否已登录
      const isAuthenticated = false; // 替换为实际的认证检查
      
      if (!isAuthenticated) {
        config.onAuthRequired?.();
        return false;
      }
    }

    // 检查使用次数限制
    if (!canUse) {
      config.onUsageExceeded?.();
      return false;
    }

    // 执行功能回调
    if (callback) {
      try {
        await callback();
      } catch (error) {
        console.error('Feature execution failed:', error);
        return false;
      }
    }

    // 增加使用次数
    const newUsage = currentUsage + 1;
    setCurrentUsage(newUsage);

    // 保存到 localStorage
    const storageKey = `usage_${config.type}`;
    const today = new Date().toDateString();
    localStorage.setItem(storageKey, JSON.stringify({ count: newUsage, date: today }));

    return true;
  }, [currentUsage, canUse, config]);

  const resetUsage = useCallback(() => {
    setCurrentUsage(0);
    const storageKey = `usage_${config.type}`;
    const today = new Date().toDateString();
    localStorage.setItem(storageKey, JSON.stringify({ count: 0, date: today }));
  }, [config.type]);

  return {
    currentUsage,
    maxUsage,
    usagePercentage,
    canUse,
    useFeature,
    resetUsage
  };
};