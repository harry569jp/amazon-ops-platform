'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { 
  Mail, 
  MessageCircle, 
  Github, 
  Twitter, 
  Linkedin,
  BarChart3,
  Globe,
  Heart
} from 'lucide-react';

const Footer = () => {
  const t = useTranslations();
  const locale = useLocale();

  const quickLinks = [
    { name: t('nav.home'), href: `/${locale}` },
    { name: t('nav.dashboard'), href: `/${locale}/dashboard` },
    { name: t('nav.tools'), href: `/${locale}/tools` },
    { name: t('nav.ai'), href: `/${locale}/ai` },
    { name: t('nav.resources'), href: `/${locale}/resources` },
    { name: t('nav.blog'), href: `/${locale}/blog` },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/harry569jp', label: 'GitHub' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:contact@amazonops.com', label: 'Email' },
  ];

  const toolCategories = [
    { name: t('footer.tools.keyword'), href: `/${locale}/tools/keyword` },
    { name: t('footer.tools.acos'), href: `/${locale}/tools/acos` },
    { name: t('footer.tools.ranking'), href: `/${locale}/tools/ranking` },
    { name: t('footer.tools.image'), href: `/${locale}/tools/image` },
  ];

  const resources = [
    { name: t('footer.resources.templates'), href: `/${locale}/resources/templates` },
    { name: t('footer.resources.guides'), href: `/${locale}/resources/guides` },
    { name: t('footer.resources.navigation'), href: `/${locale}/resources/navigation` },
    { name: t('footer.resources.fba'), href: `/${locale}/resources/fba` },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {/* Company Info */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center"
              >
                <BarChart3 className="w-6 h-6 text-white" />
              </motion.div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Amazon Ops
              </span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-slate-800 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 rounded-lg flex items-center justify-center transition-all duration-300 group"
                >
                  <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-6 text-white">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-1 h-1 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Tools */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-6 text-white">
              {t('footer.tools')}
            </h3>
            <ul className="space-y-3">
              {toolCategories.map((tool, index) => (
                <motion.li
                  key={tool.name}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={tool.href}
                    className="text-gray-300 hover:text-purple-400 transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-1 h-1 bg-purple-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {tool.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-6 text-white">
              {t('footer.resources')}
            </h3>
            <ul className="space-y-3">
              {resources.map((resource, index) => (
                <motion.li
                  key={resource.name}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={resource.href}
                    className="text-gray-300 hover:text-green-400 transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-1 h-1 bg-green-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {resource.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-slate-700"
        >
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {t('footer.newsletter.title')}
            </h3>
            <p className="text-gray-300 mb-6">
              {t('footer.newsletter.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder={t('footer.newsletter.placeholder')}
                className="flex-1 px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg font-medium transition-all duration-300 whitespace-nowrap"
              >
                {t('footer.newsletter.subscribe')}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-slate-700 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <div className="flex items-center space-x-2 text-gray-400">
            <span>© 2025 Amazon Ops Platform.</span>
            <span>{t('footer.copyright')}</span>
            <Heart className="w-4 h-4 text-red-400 mx-1" />
          </div>
          
          <div className="flex items-center space-x-6 text-sm">
            <Link href={`/${locale}/privacy`} className="text-gray-400 hover:text-white transition-colors">
              {t('footer.privacy')}
            </Link>
            <Link href={`/${locale}/terms`} className="text-gray-400 hover:text-white transition-colors">
              {t('footer.terms')}
            </Link>
            <div className="flex items-center space-x-2 text-gray-400">
              <Globe className="w-4 h-4" />
              <span>{t('footer.language')}: {locale.toUpperCase()}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;