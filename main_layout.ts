'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Home, 
  BarChart3, 
  Wrench, 
  Bot, 
  BookOpen, 
  PenTool, 
  User, 
  Menu, 
  X,
  LogOut,
  Globe,
  Moon,
  Sun,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import LoginModal from '@/components/LoginModal';

interface MainLayoutProps {
  children: React.ReactNode;
  locale: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, locale }) => {
  const t = useTranslations();
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  // 导航菜单项
  const navItems = [
    {
      href: `/${locale}`,
      label: t('nav.home'),
      icon: Home,
      exact: true
    },
    {
      href: `/${locale}/dashboard`,
      label: t('nav.dashboard'),
      icon: BarChart3,
      requiresAuth: false // 页面可访问，但使用功能需要登录
    },
    {
      href: `/${locale}/tools`,
      label: t('nav.tools'),
      icon: Wrench,
      requiresAuth: false
    },
    {
      href: `/${locale}/ai-assistant`,
      label: t('nav.aiAssistant'),
      icon: Bot,
      requiresAuth: false
    },
    {
      href: `/${locale}/resources`,
      label: t('nav.resources'),
      icon: BookOpen,
      requiresAuth: false
    },
    {
      href: `/${locale}/blog`,
      label: t('nav.blog'),
      icon: PenTool,
      requiresAuth: false
    }
  ];

  // 语言选项
  const languages = [
    { code: 'zh', label: '🇨🇳 中文', flag: '🇨🇳' },
    { code: 'en', label: '🇺🇸 English', flag: '🇺🇸' },
    { code: 'ja', label: '🇯🇵 日本語', flag: '🇯🇵' }
  ];

  // 初始化主题
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldUseDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    setIsDarkMode(shouldUseDark);
    if (shouldUseDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // 切换主题
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // 切换语言
  const changeLanguage = (langCode: string) => {
    const currentPath = pathname.replace(`/${locale}`, '');
    router.push(`/${langCode}${currentPath}`);
    setIsLanguageDropdownOpen(false);
  };

  // 检查当前路径是否匹配
  const isActiveRoute = (href: string, exact = false) => {
    if (exact) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  // 处理导航点击
  const handleNavClick = (item: typeof navItems[0]) => {
    // 如果需要认证且用户未登录，打开登录模态框
    if (item.requiresAuth && !isAuthenticated) {
      setIsLoginModalOpen(true);
      return;
    }
    
    router.push(item.href);
    setIsMobileMenuOpen(false);
  };

  // 处理登出
  const handleLogout = () => {
    logout();
    setIsUserDropdownOpen(false);
    router.push(`/${locale}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors">
      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => router.push(`/${locale}`)}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  {t('site.title')}
                </span>
              </motion.div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = isActiveRoute(item.href, item.exact);
                
                return (
                  <motion.button
                    key={item.href}
                    onClick={() => handleNavClick(item)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </motion.button>
                );
              })}
            </nav>

            {/* Right Side Controls */}
            <div className="flex items-center space-x-3">
              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                  className="flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  <span>{languages.find(lang => lang.code === locale)?.flag}</span>
                  <ChevronDown className="w-3 h-3" />
                </button>

                <AnimatePresence>
                  {isLanguageDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 py-2 z-50"
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => changeLanguage(lang.code)}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors ${
                            locale === lang.code ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          {lang.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* User Menu / Login Button */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <span className="hidden sm:inline">{user?.name}</span>
                    <ChevronDown className="w-3 h-3" />
                  </button>

                  <AnimatePresence>
                    {isUserDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 py-2 z-50"
                      >
                        <div className="px-4 py-2 border-b border-gray-200 dark:border-slate-700">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
                        </div>
                        <button
                          onClick={handleLogout}
                          className="flex items-center space-x-2 w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>{t('auth.logout')}</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  {t('auth.login.title')}
                </button>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700"
            >
              <div className="px-4 py-3 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = isActiveRoute(item.href, item.exact);
                  
                  return (
                    <button
                      key={item.href}
                      onClick={() => handleNavClick(item)}
                      className={`flex items-center space-x-3 w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />

      {/* Click outside to close dropdowns */}
      {(isLanguageDropdownOpen || isUserDropdownOpen) && (
        <div 
          className="fixed inset-0 z-30" 
          onClick={() => {
            setIsLanguageDropdownOpen(false);
            setIsUserDropdownOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default MainLayout;