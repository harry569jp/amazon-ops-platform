'use client';

import { useState, useCallback } from 'react';
import { useAuth } from './useAuth';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

export type UsageType = 'aiQueries' | 'toolUsage' | 'downloads';

interface UsageLimiterProps {
  type: UsageType;
  requireAuth?: boolean;
  onUsageExceeded?: () => void;
  onAuthRequired?: () => void;
}

export const useUsageLimiter = ({ 
  type, 
  requireAuth = true,
  onUsageExceeded,
  onAuthRequired 
}: UsageLimiterProps) => {
  const { user, checkUsageLimit, incrementUsage } = useAuth();
  const t = useTranslations();
  const [isLimitModalOpen, setIsLimitModalOpen] = useState(false);

  const canUse = useCallback(() => {
    if (requireAuth && !user) {
      return false;
    }
    
    if (user && !checkUsageLimit(type)) {
      return false;
    }
    
    return true;
  }, [user, type, requireAuth, checkUsageLimit]);

  const useFeature = useCallback(async (callback: () => void | Promise<void>) => {
    // 如果需要认证但用户未登录
    if (requireAuth && !user) {
      onAuthRequired?.();
      return false;
    }

    // 如果用户已登录但使用次数已达上限
    if (user && !checkUsageLimit(type)) {
      setIsLimitModalOpen(true);
      onUsageExceeded?.();
      
      // 显示升级提示
      toast.error(t('usage.limitExceeded'), {
        description: t('usage.upgradePrompt'),
        action: {
          label: t('usage.upgrade'),
          onClick: () => {
            // 这里可以跳转到升级页面
            console.log('Redirect to upgrade page');
          }
        },
        duration: 5000
      });
      
      return false;
    }

    // 执行功能并增加使用次数
    try {
      await callback();
      if (user) {
        incrementUsage(type);
      }
      return true;
    } catch (error) {
      console.error('Feature execution error:', error);
      toast.error(t('usage.executionError'));
      return false;
    }
  }, [user, type, requireAuth, checkUsageLimit, incrementUsage, onAuthRequired, onUsageExceeded, t]);

  const getRemainingUsage = useCallback(() => {
    if (!user) return 0;
    return user.maxUsage[type] - user.usageCount[type];
  }, [user, type]);

  const getUsagePercentage = useCallback(() => {
    if (!user) return 0;
    return (user.usageCount[type] / user.maxUsage[type]) * 100;
  }, [user, type]);

  const getUsageStatus = useCallback(() => {
    if (!user) return 'no_auth';
    if (!checkUsageLimit(type)) return 'exceeded';
    if (getRemainingUsage() <= 1) return 'warning';
    return 'normal';
  }, [user, type, checkUsageLimit, getRemainingUsage]);

  return {
    canUse: canUse(),
    useFeature,
    remainingUsage: getRemainingUsage(),
    usagePercentage: getUsagePercentage(),
    usageStatus: getUsageStatus(),
    isLimitModalOpen,
    setIsLimitModalOpen,
    currentUsage: user?.usageCount[type] || 0,
    maxUsage: user?.maxUsage[type] || 0
  };
};