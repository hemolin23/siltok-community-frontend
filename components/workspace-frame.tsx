import { Boxes, FileStack, Gauge, MessageCircle, MessageSquareWarning, Plus, Sparkles, Users } from 'lucide-react';

const items = [
  { key: 'projects', label: '共创项目', icon: FileStack, href: '/projects' },
  { key: 'workflows', label: '工作流分享', icon: Boxes, href: '/workflows' },
  { key: 'templates', label: 'Skill 与模板', icon: Sparkles, href: '/templates' },
  { key: 'issues', label: '问题与负反馈', icon: MessageSquareWarning, href: '/issues' },
  { key: 'benchmarks', label: '模型实测', icon: Gauge, href: '/#benchmarks' },
  { key: 'beta', label: '内测计划', icon: Users, href: '/#beta' },
];

function Brand() {
  return <a className="canvas-brand" href="/" aria-label="Siltok Lab 首页"><span className="brand-sigil">S</span><span><b>SILTOK</b><small>LAB</small></span></a>;
}

export function WorkspaceFrame({ active, eyebrow, title, description, createHref, createLabel, children }: {
  active: string;
  eyebrow: string;
  title: string;
  description: string;
  createHref: string;
  createLabel: string;
  children: React.ReactNode;
}) {
  return <main className="community-shell">
    <div className="launch-ribbon"><span>●</span> Siltok AI Station 首批共创计划开放中 <a href="/#beta">查看测试权益</a></div>
    <header className="canvas-header community-header"><Brand /><nav><a href="/">首页</a><a className={active === 'projects' ? 'active' : ''} href="/projects">共创项目</a><a className={active === 'workflows' ? 'active' : ''} href="/workflows">工作流</a><a className={active === 'templates' ? 'active' : ''} href="/templates">Skill 模板</a><a className={active === 'issues' ? 'active' : ''} href="/issues">问题反馈</a><a href="/#benchmarks">模型实测</a></nav><div className="header-actions"><a className="quiet-action" href="/login"><MessageCircle /> 微信登录</a><a className="neon-action" href={createHref}><Plus /> {createLabel}</a></div></header>
    <div className="community-layout">
      <aside className="community-sidebar">
        <span className="side-heading">共创社区</span>
        <nav>{items.map((item) => { const Icon = item.icon; return <a className={active === item.key ? 'active' : ''} href={item.href} key={item.key}><Icon /><span>{item.label}</span></a>; })}</nav>
        <div className="side-group"><span>真实场景</span><a href="/projects">AI 短剧</a><a href="/projects">电商素材</a><a href="/projects">广告与投流</a><a href="/projects">开发者实验</a></div>
        <div className="side-invite"><span>REMOTE BETA</span><strong>把真实任务带进来</strong><p>我们负责迁移、跑通和记录，你带走工作流与对比结果。</p><a href="/new?type=project">申请加入</a></div>
      </aside>
      <section className="community-content">
        <header className="community-heading"><div><span>{eyebrow}</span><h1>{title}</h1><p>{description}</p></div><a className="neon-action" href={createHref}><Plus /> {createLabel}</a></header>
        {children}
      </section>
    </div>
  </main>;
}
