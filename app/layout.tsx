import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://siltok-lab.qingyu-lu-ai.chatgpt.site'),
  title: 'Siltok Lab｜把真实工作流，做进你的 AI 主机',
  description: '面向 AI 短剧、电商与内容创作者的本地 AI 创作工作站社区，提供真实项目共创、Skill 与工作流模板、远程设备测试和问题闭环。',
  openGraph: {
    title: 'Siltok Lab｜把真实工作流变成产品能力',
    description: '从真实任务出发，调用 Skill 与工作流模板，由 Siltok 团队完成迁移、远程真机测试与问题闭环。',
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
