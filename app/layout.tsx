import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: 'Siltok Lab｜真实工作流共创与模型测试',
  description: '面向本地 AI 创作者和开发者的工作流共创、真实测评与产品支持平台。',
  openGraph: {
    title: 'Siltok Lab｜把真实工作流变成产品能力',
    description: '记录项目、验证工作流、提交问题，并与 Siltok 团队共同完成模型测试与产品闭环。',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Siltok Lab 工作流共创与模型测试平台' }],
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Siltok Lab｜把真实工作流变成产品能力',
    description: '真实项目、工作流验证、问题闭环与模型测试。',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
