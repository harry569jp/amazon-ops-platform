'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { 
  X, 
  Crown, 
  Check, 
  Zap, 
  Shield, 
  Infinity,
  Star,
  Sparkles
} from 'lucide-react';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature?: string;
  usageType?: 'aiQueries' | 'toolUsage' | 'downloads';
}

const UpgradeModal = ({ 
  isOpen, 
  onClose, 
  feature,
  usageType 
}: UpgradeModalProps) => {
  const t = useTranslations();

  const plans = [
    {
      name: 'Pro',
      price: '$9.99',
      period: 'month',
      icon: Zap,
      gradient: 'from-blue-500 to-cyan-500',
      features: [
        t('upgrade.features.unlimitedAI'),
        t('upgrade.features.advancedTools'),
        t('upgrade.features.prioritySupport'),
        t('upgrade.features.exportData'),
        t('upgrade.features.apiAccess')
      ],
      limits: {
        aiQueries: 'Unlimited',
        toolUsage: 'Unlimited',
        downloads: '50/month'
      },
      popular: true
    },
    {
      name: 'Premium',
      price: '$19.99',
      period: 'month',
      icon: Crown,
      gradient: 'from-purple-500 to-pink-500',
      features: [
        t('upgrade.features.everythingPro'),
        t('upgrade.features.customBranding'),
        t('upgrade.features.teamCollaboration'),
        t('upgrade.features.advancedAnalytics'),
        t('upgrade.features.dedicatedManager')
      ],
      limits: {
        aiQueries: 'Unlimited',
        toolUsage: 'Unlimited',
        downloads: 'Unlimited'
      },
      popular: false
    }
  ];

  const handleUpgrade = (planName: string) => {
    // 这里应该集成真实的支付系统 (Stripe, PayPal 等)
    console.log(`Upgrading to ${planName} plan`);
    // 临时关闭模态框
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
            
            <div className="relative">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 z-10 p-2 rounded-full hover:bg-white/20 dark:hover:bg-slate-800/50 transition-colors"
              >
                <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              </button>

              {/* Header */}
              <div className="text-center py-12 px-6">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-6"
                >
                  <Crown className="w-10 h-10 text-white" />
                </motion.div>
                
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4"
                >
                  {t('upgrade.title')}
                </motion.h2>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
                >
                  {feature 
                    ? t('upgrade.featureDescription', { feature })
                    : t('upgrade.description')
                  }
                </motion.p>

                {usageType && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-6 inline-flex items-center space-x-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-sm font-medium"
                  >
                    <Infinity className="w-4 h-4" />
                    <span>{t('upgrade.limitReached', { type: t(`usage.types.${usageType}`) })}</span>
                  </motion.div>
                )}
              </div>

              {/* Plans */}
              <div className="px-6 pb-12">
                <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  {plans.map((plan, index) => (
                    <motion.div
                      key={plan.name}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className={`relative bg-white dark:bg-slate-800 rounded-2xl shadow-xl border-2 overflow-hidden ${
                        plan.popular 
                          ? 'border-blue-500 ring-4 ring-blue-100 dark:ring-blue-900/50' 
                          : 'border-gray-200 dark:border-slate-600'
                      }`}
                    >
                      {/* Popular Badge */}
                      {plan.popular && (
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
                            <Star className="w-4 h-4" />
                            <span>{t('upgrade.popular')}</span>
                          </div>
                        </div>
                      )}

                      <div className="p-8">
                        {/* Plan Header */}
                        <div className="text-center mb-8">
                          <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${plan.gradient} rounded-2xl mb-4`}>
                            <plan.icon className="w-8 h-8 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            {plan.name}
                          </h3>
                          <div className="flex items-baseline justify-center space-x-1">
                            <span className="text-4xl font-bold text-gray-900 dark:text-white">
                              {plan.price}
                            </span>
                            <span className="text-gray-500 dark:text-gray-400">
                              /{t(`upgrade.${plan.period}`)}
                            </span>
                          </div>
                        </div>

                        {/* Features */}
                        <div className="space-y-4 mb-8">
                          {plan.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-start space-x-3">
                              <div className={`flex-shrink-0 w-5 h-5 bg-gradient-to-r ${plan.gradient} rounded-full flex items-center justify-center mt-0.5`}>
                                <Check className="w-3 h-3 text-white" />
                              </div>
                              <span className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Usage Limits */}
                        <div className="mb-8 p-4 bg-gray-50 dark:bg-slate-700/50 rounded-xl">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm">
                            {t('upgrade.usageLimits')}
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">AI {t('upgrade.queries')}</span>
                              <span className="font-medium text-gray-900 dark:text-white">{plan.limits.aiQueries}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">{t('upgrade.toolUsage')}</span>
                              <span className="font-medium text-gray-900 dark:text-white">{plan.limits.toolUsage}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">{t('upgrade.downloads')}</span>
                              <span className="font-medium text-gray-900 dark:text-white">{plan.limits.downloads}</span>
                            </div>
                          </div>
                        </div>

                        {/* CTA Button */}
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleUpgrade(plan.name)}
                          className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center space-x-2 ${
                            plan.popular
                              ? `bg-gradient-to-r ${plan.gradient} hover:shadow-lg hover:shadow-blue-500/25`
                              : `bg-gradient-to-r ${plan.gradient} hover:shadow-lg hover:shadow-purple-500/25`
                          }`}
                        >
                          <Sparkles className="w-5 h-5" />
                          <span>{t('upgrade.choosePlan', { plan: plan.name })}</span>
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Money Back Guarantee */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="text-center mt-8"
                >
                  <div className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 text-sm">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span>{t('upgrade.moneyBack')}</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default UpgradeModal;