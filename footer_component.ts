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
  BarChart3
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
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Twitter, href: 'https