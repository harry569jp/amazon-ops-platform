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
  Zap,
  CheckCircle,
  XCircle,
  ArrowUp,
  ArrowDown,
  Target,
  Lightbulb,
  FileText,
  Calendar
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
                      <span className="text-gray-700 dark:text-gray-300 text-sm">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleRunTool(tool.id)}
                    disabled={isLoading}
                    className={`flex-1 bg-gradient-to-r ${tool.gradient} text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isLoading && activeTab === tool.id ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Play className="w-5 h-5" />
                    )}
                    <span>{isLoading && activeTab === tool.id ? t('dashboard.running') : t('dashboard.runTool')}</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-3 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    <Settings className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Results Display */}
        {results && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-gray-200 dark:border-slate-700 overflow-hidden"
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {t('dashboard.results.title')}
                </h2>
                <div className="flex space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>{t('dashboard.export')}</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setResults(null)}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>{t('dashboard.close')}</span>
                  </motion.button>
                </div>
              </div>

              {/* Ranking Results */}
              {activeTab === 'ranking' && results.keywords && (
                <div className="space-y-6">
                  {/* Summary Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-6 rounded-2xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                          <Target className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                            {t('dashboard.results.expectedIncrease')}
                          </p>
                          <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                            ${results.expectedIncrease.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      {t('dashboard.results.recommendations')}
                    </h3>
                    {results.recommendations.map((item: any, index: number) => (
                      <div key={index} className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-2xl">
                        <div className="flex items-start space-x-4">
                          <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Lightbulb className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="text-base font-semibold text-purple-900 dark:text-purple-100">
                                {item.type}
                              </h4>
                              <span className="text-sm font-medium text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30 px-3 py-1 rounded-full">
                                {item.impact}
                              </span>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300">
                              {item.keyword ? `Keyword: ${item.keyword}` : `Campaign: ${item.campaign}`}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12"
        >
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-200 dark:border-slate-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('dashboard.stats.lastUpdate')}
                </p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  2 hours ago
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-200 dark:border-slate-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('dashboard.stats.activeTools')}
                </p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  3/3
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-200 dark:border-slate-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('dashboard.stats.reportsGenerated')}
                </p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  127
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-200 dark:border-slate-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('dashboard.stats.avgImprovement')}
                </p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  +23%
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modals */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
      <UpgradeModal 
        isOpen={showUpgradeModal} 
        onClose={() => setShowUpgradeModal(false)} 
      />
    </div>
  );
};

export default DashboardPage;sm font-medium">
                            {t('dashboard.results.totalKeywords')}
                          </p>
                          <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                            {results.totalKeywords}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-2xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                          <ArrowUp className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-green-600 dark:text-green-400 text-sm font-medium">
                            {t('dashboard.results.improvements')}
                          </p>
                          <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                            {results.improvements}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-2xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
                          <BarChart3 className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-purple-600 dark:text-purple-400 text-sm font-medium">
                            {t('dashboard.results.avgPosition')}
                          </p>
                          <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                            {results.averagePosition}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Keywords Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-slate-700">
                          <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">
                            {t('dashboard.results.keyword')}
                          </th>
                          <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">
                            {t('dashboard.results.position')}
                          </th>
                          <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">
                            {t('dashboard.results.volume')}
                          </th>
                          <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">
                            {t('dashboard.results.competition')}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.keywords.map((item: any, index: number) => (
                          <tr key={index} className="border-b border-gray-100 dark:border-slate-700/50 hover:bg-gray-50 dark:hover:bg-slate-700/50">
                            <td className="py-4 px-4 font-medium text-gray-900 dark:text-white">
                              {item.keyword}
                            </td>
                            <td className="py-4 px-4">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                item.position <= 10 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                                  : item.position <= 20
                                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
                                  : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                              }`}>
                                #{item.position}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-gray-600 dark:text-gray-300">
                              {item.volume.toLocaleString()}
                            </td>
                            <td className="py-4 px-4">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                item.competition === 'High'
                                  ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                                  : item.competition === 'Medium'
                                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
                                  : 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                              }`}>
                                {item.competition}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ACOS Results */}
              {activeTab === 'acos' && results.campaigns && (
                <div className="space-y-6">
                  {/* Summary Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-2xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                          <DollarSign className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-green-600 dark:text-green-400 text-sm font-medium">
                            {t('dashboard.results.totalSpend')}
                          </p>
                          <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                            ${results.totalSpend.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-6 rounded-2xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                          <TrendingUp className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                            {t('dashboard.results.totalSales')}
                          </p>
                          <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                            ${results.totalSales.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-6 rounded-2xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
                          <AlertTriangle className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-orange-600 dark:text-orange-400 text-sm font-medium">
                            {t('dashboard.results.avgAcos')}
                          </p>
                          <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">
                            {results.averageAcos}%
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Campaigns Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-slate-700">
                          <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">
                            {t('dashboard.results.campaign')}
                          </th>
                          <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">
                            ACOS
                          </th>
                          <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">
                            {t('dashboard.results.spend')}
                          </th>
                          <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">
                            {t('dashboard.results.sales')}
                          </th>
                          <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">
                            {t('dashboard.results.status')}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.campaigns.map((item: any, index: number) => (
                          <tr key={index} className="border-b border-gray-100 dark:border-slate-700/50 hover:bg-gray-50 dark:hover:bg-slate-700/50">
                            <td className="py-4 px-4 font-medium text-gray-900 dark:text-white">
                              {item.name}
                            </td>
                            <td className="py-4 px-4">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                item.acos <= 30
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                                  : item.acos <= 50
                                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
                                  : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                              }`}>
                                {item.acos}%
                              </span>
                            </td>
                            <td className="py-4 px-4 text-gray-600 dark:text-gray-300">
                              ${item.spend.toLocaleString()}
                            </td>
                            <td className="py-4 px-4 text-gray-600 dark:text-gray-300">
                              ${item.sales.toLocaleString()}
                            </td>
                            <td className="py-4 px-4">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                item.status === 'Good'
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                                  : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                              }`}>
                                {item.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Optimizer Results */}
              {activeTab === 'optimizer' && results.recommendations && (
                <div className="space-y-6">
                  {/* Summary Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-2xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                          <ArrowDown className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-green-600 dark:text-green-400 text-sm font-medium">
                            {t('dashboard.results.potentialSavings')}
                          </p>
                          <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                            ${results.potentialSavings.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-6 rounded-2xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                          <ArrowUp className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-blue-600 dark:text-blue-400 text-