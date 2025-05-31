import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n';

export default createMiddleware({
  // 支持的语言列表
  locales,
  
  // 默认语言
  defaultLocale: 'zh',
  
  // 语言检测策略
  localeDetection: true,
  
  // 路径前缀策略
  localePrefix: 'always'
});

export const config = {
  // 匹配所有国际化路径
  matcher: ['/', '/(zh|en|ja)/:path*']
};