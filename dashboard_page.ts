'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { 
  BarChart3, 
  Search, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  Play,
  Download,
  Settings,
  Info,
  Lock,
  Zap
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useUsageLimiter } from '@/hooks/useUsageLimiter';
import LoginModal from '@/components/LoginModal';
import UpgradeModal from '@/components/UpgradeModal';

const DashboardPage = () => {
  const t = useTranslations();
  const { user } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [activeTab, setActiveTab] = useState('ranking');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any>(null);

  const toolUsage = useUsageLimiter({
    type: 'toolUsage',
    requireAuth: true,
    onAuthRequired: () => setShowLoginModal(true),
    onUsageExceeded: () => setShowUpgradeModal(true)
  });

  const tools = [
    {
      id: 'ranking',
      name: t('dashboard.tools.ranking.name'),
      description: t('dashboard.tools.ranking.description'),
      icon: Search,
      gradient: 'from-blue-500 to-cyan-500',
      features: [
        t('dashboard.tools.ranking.features.realTime'),
        t('dashboard.tools.ranking.features.multiKeyword'),
        t('dashboard.tools.ranking.features.competition'),
        t('dashboard.tools.ranking.features.export')
      ]
    },
    {
      id: 'acos',
      name: t('dashboard.tools.acos.name'),
      description: t('dashboard.tools.acos.description'),
      icon: DollarSign,
      gradient: 'from-green-500 to-emerald-500',
      features: [
        t('dashboard.tools.acos.features.highAcos'),
        t('dashboard.tools.acos.features.optimization'),
        t('dashboard.tools.acos.features.trends'),
        t('dashboard.tools.acos.features.recommendations')
      ]
    },
    {
      id: 'optimizer',
      name: t('dashboard.tools.optimizer.name'),
      description: t('dashboard.tools.optimizer.description'),
      icon: TrendingUp,
      gradient: 'from-purple-500 to-pink-500',
      features: [
        t('dashboard.tools.optimizer.features.bidOptimization'),
        t('dashboard.tools.optimizer.features.budgetAllocation'),
        t('dashboard.tools.optimizer.features.performanceTracking'),
        t('dashboard.tools.optimizer.features.automation')
      ]
    }
  ];

  const handleRunTool = async (toolId: string) => {
    const success = await toolUsage.useFeature(async () => {
      setIsLoading(true);
      
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 模拟结果数据
      const mockResults = {
        ranking: {
          keywords: [
            { keyword: 'bluetooth headphones', position: 15, volume: 50000, competition: 'High' },
            { keyword: 'wireless earbuds', position: 8, volume: 35000, competition: 'Medium' },
            { keyword: 'noise canceling', position: 23, volume: 28000, competition: 'High' }
          ],
          totalKeywords: 125,
          averagePosition: 18.5,
          improvements: 12
        },
        acos: {
          campaigns: [
            { name: 'Campaign 1', acos: 45.2, spend: 1250, sales: 2769, status: 'High' },
            { name: 'Campaign 2', acos: 28.5, spend: 890, sales: 3123, status: 'Good' },
            { name: 'Campaign 3', acos: 67.8, spend: 2150, sales: 3170, status: 'High' }
          ],
          totalSpend: 4290,
          totalSales: 9062,
          averageAcos: 47.2
        },
        optimizer: {
          recommendations: [
            { type: 'Increase Bid', keyword: 'bluetooth headphones', impact: '+15% CTR' },
            { type: 'Decrease Budget', campaign: 'Campaign 3', impact: '-25% Waste' },
            { type: 'Add Negative', keyword: 'cheap bluetooth', impact: '+8% Relevance' }
          ],
          potentialSavings: 850,
          expectedIncrease: 1250
        }
      };

      setResults(mockResults[toolId as keyof typeof mockResults]);
      setIsLoading(false);
    });

    if (!success) {
      setIsLoading(false);
    }
  };

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
    hidden: { opacity: 0, y: 30 },
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
      
      <div className="relative container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center"
            >
              <BarChart3 className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              {t('dashboard.title')}
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('dashboard.description')}
          </p>

          {/* Usage Status */}
          {user && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 inline-flex items-center space-x-4 px-6 py-3 bg-white dark:bg-slate-800 rounded-full shadow-lg border border-gray-200 dark:border-slate-700"
            >
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('dashboard.usage')}: {toolUsage.currentUsage}/{toolUsage.maxUsage}
                </span>
              </div>
              <div className="w-20 h-2 bg-gray-200 dark:bg-slate-600 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300"
                  style={{ width: `${toolUsage.usagePercentage}%` }}
                />
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Tools Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-3 gap-8 mb-12"
        >
          {tools.map((tool) => (
            <motion.div
              key={tool.id}
              variants={itemVariants}
              className={`relative bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-gray-200 dark:border-slate-700 overflow-hidden group ${
                activeTab === tool.id ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-5 group-hover:opacity-10 transition-opacity`} />
              
              <div className="relative p-8">
                {/* Tool Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-14 h-14 bg-gradient-to-r ${tool.gradient} rounded-2xl flex items-center justify-center`}>
                      <tool.icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {tool.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab(tool.id)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                  >
                    <Info className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {tool.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className={`w-2 h-2 bg-gradient-to-r ${tool.gradient} rounded-full`} />
                      <span className="text-gray-700