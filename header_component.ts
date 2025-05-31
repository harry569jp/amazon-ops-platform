'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Menu, 
  X, 
  Home, 
  BarChart3, 
  Wrench, 
  Bot, 
  BookOpen, 
  PenTool, 
  User,
  Globe,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import LoginDialog from '@/components/auth/LoginDialog';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn, user, logout } = useAuth();

  const navigation = [
    { name: t('nav.home'), href: `/${locale}`, icon: Home },
    { name: t('nav.dashboard'), href: `/${locale}/dashboard`, icon: BarChart3 },
    { name: t('nav.tools'), href: `/${locale}/tools`, icon: Wrench },
    { name: t('nav.ai'), href: `/${locale}/ai`, icon: Bot },
    { name: t('nav.resources'), href: `/${locale}/resources`, icon: BookOpen },
    { name: t('nav.blog'), href: `/${locale}/blog`, icon: PenTool },
  ];

  const languages = [
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
  ];

  const handleLanguageChange = (newLocale: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
    setIsLanguageOpen(false);
  };

  const currentLanguage = languages.find(lang => lang.code === locale);

  return (
    <>
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 w-full z-50 glass-morphism border-b border-white/10"
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <Link href={`/${locale}`} className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl gradient-text">
                  Amazon Pro
                </span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                
                return (
                  <motion.div key={item.name} whileHover={{ y: -2 }}>
                    <Link
                      href={item.href}
                      className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-300 ${
                        isActive 
                          ? 'bg-blue-500/20 text-blue-400 glow-effect' 
                          : 'text-gray-300 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <div className="relative">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300"
                >
                  <Globe className="w-4 h-4" />
                  <span className="hidden sm:inline">{currentLanguage?.flag} {currentLanguage?.name}</span>
                  <span className="sm:hidden">{currentLanguage?.flag}</span>
                  <ChevronDown className="w-3 h-3" />
                </motion.button>

                <AnimatePresence>
                  {isLanguageOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-40 glass-morphism rounded-lg shadow-lg overflow-hidden"
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => handleLanguageChange(lang.code)}
                          className={`w-full flex items-center space-x-2 px-4 py-2 text-left hover:bg-white/10 transition-colors duration-200 ${
                            lang.code === locale ? 'bg-blue-500/20 text-blue-400' : 'text-gray-300'
                          }`}
                        >
                          <span>{lang.flag}</span>
                          <span>{lang.name}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Auth Section */}
              {isLoggedIn ? (
                <div className="relative group">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                  >
                    <User className="w-4 h-4" />
                    <span className="hidden sm:inline">{user?.name}</span>
                  </motion.button>
                  
                  <div className="absolute right-0 mt-2 w-48 glass-morphism rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="p-4">
                      <p className="text-sm text-gray-300 mb-2">{user?.email}</p>
                      <button
                        onClick={logout}
                        className="w-full text-left px-3 py-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors duration-200"
                      >
                        退出登录
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowLoginDialog(true)}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg transition-all duration-300"
                >
                  {t('nav.auth')}
                </motion.button>
              )}

              {/* Mobile Menu Button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden border-t border-white/10 mt-4 pt-4"
              >
                <div className="space-y-2">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                          isActive 
                            ? 'bg-blue-500/20 text-blue-400' 
                            : 'text-gray-300 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </motion.header>

      {/* Login Dialog */}
      <LoginDialog 
        isOpen={showLoginDialog} 
        onClose={() => setShowLoginDialog(false)} 
      />
    </>
  );
};

export default Header;