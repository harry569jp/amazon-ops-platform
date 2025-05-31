'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { 
  ArrowRight, 
  BarChart3, 
  Zap, 
  Bot, 
  Download,
  Star,
  Users,
  TrendingUp,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Calendar
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface HomePageProps {
  locale: string;
}

const HomePage: React.FC<HomePageProps> = ({ locale }) => {
  const t = useTranslations();
  const router = useRouter();

  // 技能数据
  const skills = [
    {
      category: t('home.skills.amazon.title'),
      items: [
        t('home.skills.amazon.ppc'),
        t('home.skills.amazon.seo'),
        t('home.skills.amazon.analytics'),
        t('home.skills.amazon.automation')
      ],
      color: 'from-orange-500 to-red-500'
    },
    {
      category: t('home.skills.programming.title'),
      items: [
        'Python',
        'JavaScript/TypeScript',
        'React/Next.js',
        'Data Analysis'
      ],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      category: t('home.skills.ai.title'),
      items: [
        'ChatGPT API',
        'LangChain',
        'RAG Systems',
        'Automation Bots'
      ],
      color: 'from-purple-500 to-pink-500'
    }
  ];

  // 项目展示数据
  const projects = [
    {
      title: t('home.projects.dashboard.title'),
      description: t('home.projects.dashboard.description'),
      icon: BarChart3,
      color: 'from-blue-500 to-purple-600',
      href: `/${locale}/dashboard`
    },
    {
      title: t('home.projects.tools.title'),
      description: t('home.projects.tools.description'),
      icon: Zap,
      color: 'from-green-500 to-teal-600',
      href: `/${locale}/tools`
    },
    {
      title: t('home.projects.ai.title'),
      description: t('home.projects.ai.description'),
      icon: Bot,
      color: 'from-purple-500 to-pink-600',
      href: `/${locale}/ai-assistant`
    }
  ];

  // 统计数据
  const stats = [
    { label: t('home.stats.experience'), value: '5+', suffix: t('home.stats.years') },
    { label: t('home.stats.tools'), value: '20+', suffix: '' },
    { label: t('home.stats.automation'), value: '100+', suffix: t('home.stats.hours') },
    { label: t('home.stats.projects'), value: '50+', suffix: '' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900" />
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        
        {/* Floating Elements */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 blur-xl"
        />
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full opacity-20 blur-xl"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              {/* Greeting */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-6"
              >
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium">
                  <span className="mr-2">👋</span>
                  {t('home.hero.greeting')}
                </span>
              </motion.div>

              {/* Main Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6"
              >
                {t('home.hero.title')}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  {t('home.hero.subtitle')}
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
              >
                {t('home.hero.description')}
              </motion.p>

              {/* Personal Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-6 mb-8 text-gray-600 dark:text-gray-400"
              >
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>{t('home.personal.location')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{t('home.personal.experience')}</span>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push(`/${locale}/dashboard`)}
                  className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
                >
                  {t('home.hero.cta.explore')}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push(`/${locale}/resources`)}
                  className="inline-flex items-center px-8 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
                >
                  <Download className="mr-2 w-5 h-5" />
                  {t('home.hero.cta.resources')}
                </motion.button>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="flex items-center justify-center lg:justify-start space-x-4 mt-8"
              >
                <a
                  href="https://github.com/harry569jp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="p-3 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 hover:text-blue-600 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="mailto:contact@example.com"
                  className="p-3 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 hover:text-red-600 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </motion.div>
            </motion.div>

            {/* Right Content - Avatar/Visual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="relative mx-auto w-80 h-80 lg:w-96 lg:h-96">
                {/* Avatar Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-full opacity-20 animate-pulse" />
                <div className="absolute inset-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full opacity-30" />
                
                {/* Avatar Image Placeholder */}
                <div className="absolute inset-8 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-2xl">
                  <div className="text-6xl lg:text-7xl">🚀</div>
                </div>

                {/* Floating Skills */}
                {['Amazon', 'Python', 'AI', 'React'].map((skill, index) => (
                  <motion.div
                    key={skill}
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 5, 0]
                    }}
                    transition={{
                      duration: 4 + index,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.5
                    }}
                    className={`absolute w-16 h-16 bg-white dark:bg-slate-800 rounded-xl shadow-lg flex items-center justify-center text-sm font-semibold text-gray-700 dark:text-gray-300 ${
                      index === 0 ? 'top-8 -right-8' :
                      index === 1 ? 'bottom-8 -left-8' :
                      index === 2 ? 'top-1/2 -left-12' :
                      'bottom-1/2 -right-12'
                    }`}
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-slate-800 border-y border-gray-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.value}<span className="text-blue-600">{stat.suffix}</span>
                </div>
                <div className="text-gray-600 dark:text-gray-400 text-sm lg:text-base">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('home.skills.title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('home.skills.description')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skills.map((skillGroup, index) => (
              <motion.div
                key={skillGroup.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${skillGroup.color} rounded-xl mb-6 flex items-center justify-center`}>
                  <Star className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {skillGroup.category}
                </h3>
                <ul className="space-y-2">
                  {skillGroup.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center text-gray-600 dark:text-gray-300">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Showcase */}
      <section className="py-20 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('home.projects.title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('home.projects.description')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project, index) => {
              const Icon = project.icon;
              return (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className="group cursor-pointer"
                  onClick={() => router.push(project.href)}
                >
                  <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all group-hover:border-blue-500 group-hover:border-2">
                    <div className={`w-16 h-16 bg-gradient-to-r ${project.color} rounded-xl mb-6 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      {project.description}
                    </p>
                    <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:translate-x-2 transition-transform">
                      {t('home.projects.explore')}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              {t('home.cta.title')}
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              {t('home.cta.description')}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push(`/${locale}/dashboard`)}
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
            >
              {t('home.cta.button')}
              <TrendingUp className="ml-2 w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;