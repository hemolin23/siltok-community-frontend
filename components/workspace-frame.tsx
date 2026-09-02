import { Activity, Boxes, FileStack, Gauge, MessageSquareWarning, Plus, Search, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const items = [
  { key: 'home', label: '总览', icon: Activity, href: '/' },
  { key: 'workflows', label: '工作流', icon: Boxes, href: '/workflows' },
  { key: 'projects', label: '项目', icon: FileStack, href: '/projects' },
  { key: 'issues', label: '问题', icon: MessageSquareWarning, href: '/issues' },
  { key: 'benchmarks', label: '模型测评', icon: Gauge, href: '/#benchmarks' },
  { key: 'beta', label: '内测中心', icon: Users, href: '/#beta' },
];

export function WorkspaceFrame({ active, eyebrow, title, description, createHref, createLabel, children }: {
  active: string;
  eyebrow: string;
  title: string;
  description: string;
  createHref: string;
  createLabel: string;
  children: React.ReactNode;
}) {
  return <main className="collection-shell">
    <header className="collection-topbar">
      <a className="product-mark" href="/"><span className="mark-glyph">S</span><span><strong>Siltok</strong><small>LAB</small></span></a>
      <div className="command-search"><Search /><span>搜索工作流、模型或问题</span><kbd>⌘ K</kbd></div>
      <div className="topbar-actions"><Button className="create-button" render={<a href={createHref} />}><Plus /> {createLabel}</Button><a className="avatar-button" href="/login" aria-label="打开登录页面">SG</a></div>
    </header>
    <aside className="collection-sidebar"><nav><span className="nav-label">工作台</span>{items.map((item) => { const Icon = item.icon; return <a className={active === item.key ? 'nav-item active' : 'nav-item'} href={item.href} key={item.key}><Icon /><span>{item.label}</span></a>; })}</nav><div className="collection-identity"><span>预览身份</span><strong>石根洁</strong><small>正式手机号/微信接入待配置</small></div></aside>
    <section className="collection-content">
      <header className="collection-heading"><div><span className="panel-kicker">{eyebrow}</span><h1>{title}</h1><p>{description}</p></div><Button className="create-button" render={<a href={createHref} />}><Plus /> {createLabel}</Button></header>
      {children}
    </section>
  </main>;
}
