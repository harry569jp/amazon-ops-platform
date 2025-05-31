import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Amazon Operation Platform - 专业的亚马逊运营工具平台',
  description: '提供数据分析、自动化工具、AI助手等全方位跨境电商解决方案',
  keywords: '亚马逊运营,跨境电商,数据分析,关键词排名,广告优化,AI助手',
  authors: [{ name: 'Amazon Operation Platform' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'Amazon Operation Platform - 专业的亚马逊运营工具平台',
    description: '提供数据分析、自动化工具、AI助手等全方位跨境电商解决方案',
    type: 'website',
    locale: 'zh_CN',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}