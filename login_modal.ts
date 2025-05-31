'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { X, Mail, Lock, User, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  title?: string;
  description?: string;
}

const LoginModal = ({ 
  isOpen, 
  onClose, 
  onSuccess,
  title,
  description 
}: LoginModalProps) => {
  const t = useTranslations();
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      let success = false;
      
      if (isLogin) {
        success = await login(formData.email, formData.password);
      } else {
        if (!formData.name.trim()) {
          setErrors({ name: t('auth.errors.nameRequired') });
          setLoading(false);
          return;
        }
        success = await register(formData.email, formData.password, formData.name);
      }

      if (success) {
        onClose();
        onSuccess?.();
      } else {
        setErrors({ 
          general: isLogin ? t('auth.errors.loginFailed') : t('auth.errors.registerFailed') 
        });
      }
    } catch (error) {
      setErrors({ general: t('auth.errors.networkError') });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setFormData({ email: '', password: '', name: '' });
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
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
            
            <div className="relative p-6">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>

              {/* Header */}
              <div className="text-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring" }}
                  className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4"
                >
                  <Lock className="w-8 h-8 text-white" />
                </motion.div>
                
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {title || (isLogin ? t('auth.login.title') : t('auth.register.title'))}
                </h2>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {description || (isLogin ? t('auth.login.description') : t('auth.register.description'))}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Field (Register Only) */}
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2"
                  >
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {t('auth.name')}
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500"
                        placeholder={t('auth.placeholders.name')}
                        required={!isLogin}
                      />
                    </div>
                    {errors.name && (
                      <p className="text-red-500 text-xs">{errors.name}</p>
                    )}
                  </motion.div>
                )}

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('auth.email')}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500"
                      placeholder={t('auth.placeholders.email')}
                      required
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-xs">{errors.email}</p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('auth.password')}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500"
                      placeholder={t('auth.placeholders.password')}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-xs">{errors.password}</p>
                  )}
                </div>

                {/* General Error */}
                {errors.general && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
                  >
                    <p className="text-red-600 dark:text-red-400 text-sm">{errors.general}</p>
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium rounded-lg transition-all duration-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                  <span>
                    {loading 
                      ? t('auth.loading') 
                      : (isLogin ? t('auth.login.submit') : t('auth.register.submit'))
                    }
                  </span>
                </motion.button>
              </form>

              {/* Toggle Mode */}
              <div className="mt-6 text-center">
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {isLogin ? t('auth.login.noAccount') : t('auth.register.hasAccount')}
                  <button
                    type="button"
                    onClick={toggleMode}
                    className="ml-2 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    {isLogin ? t('auth.register.link') : t('auth.login.link')}
                  </button>
                </p>
              </div>

              {/* Free Trial Info */}
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg"
                >
                  <p className="text-blue-700 dark:text-blue-300 text-xs text-center">
                    {t('auth.freeTrial')}
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;