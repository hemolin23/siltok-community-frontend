import {
  Activity,
  ArrowUpRight,
  Boxes,
  ChevronRight,
  CircleHelp,
  FileStack,
  Gauge,
  GitFork,
  MessageSquareWarning,
  Mic,
  Play,
  Plus,
  Search,
  ShieldCheck,
  TerminalSquare,
  Users,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getDashboard } from '@/lib/records';

const nav = [
  { label: '总览', icon: Activity, active: true, href: '/' },
  { label: '工作流', icon: Boxes, href: '/workflows' },
  { label: '项目', icon: FileStack, href: '/projects' },
  { label: '问题', icon: MessageSquareWarning, count: 3, href: '/issues' },
  { label: '模型测评', icon: Gauge, href: '/#benchmarks' },
  { label: '内测中心', icon: Users, href: '/#beta' },
];

const intents = [
  { icon: Mic, title: '提交业务痛点', detail: '说 60 秒，自动整理场景与约束', meta: '语音或文字', href: '/new?type=issue' },
  { icon: GitFork, title: '验证一个工作流', detail: '上传 JSON，记录模型与运行结果', meta: '工作流复现', href: '/new?type=workflow' },
  { icon: TerminalSquare, title: '申请远程测试', detail: '用真实项目验证速度、效果与成本', meta: 'Siltok Pro', href: '/new?type=project' },
];

const pipeline = [
  { label: '脚本理解', note: 'Qwen3 30B', state: 'done' },
  { label: '分镜生成', note: '12 shots', state: 'done' },
  { label: '视频推理', note: 'Wan2.2 FP8', state: 'active' },
  { label: '结果筛选', note: '等待确认', state: 'waiting' },
];

const statusLabels: Record<string, string> = { triage: '待分诊', needs_info: '待补信息', reproduced: '已复现', in_progress: '处理中', planned: '进入版本', resolved: '已解决', closed: '已关闭' };

function ProductMark() {
  return (
    <div className="product-mark" aria-label="Siltok Lab">
      <span className="mark-glyph">S</span>
      <span><strong>Siltok</strong><small>LAB</small></span>
    </div>
  );
}

export const dynamic = 'force-dynamic';

export default async function Home() {
  const dashboard = await getDashboard();
  const run = (dashboard.run ?? {}) as Record<string, string | number | null>;
  const recentIssues = dashboard.issues as Array<Record<string, string | number | null>>;
  const totalOutputs = Number(run.total_outputs ?? 0);
  const usableOutputs = Number(run.usable_outputs ?? 0);
  const usableRate = totalOutputs ? Math.round((usableOutputs / totalOutputs) * 100) : 0;
  return (
    <main className="station-shell">
      <header className="station-topbar">
        <ProductMark />
        <div className="command-search"><Search aria-hidden="true" /><span>搜索工作流、模型或问题</span><kbd>⌘ K</kbd></div>
        <div className="topbar-actions">
          <span className="system-status"><i /> 数据库与对象存储在线</span>
          <Button className="create-button" render={<a href="/new?type=issue" />}><Plus /> 提交记录</Button>
          <a className="avatar-button" href="/login" aria-label="打开登录页面">SG</a>
        </div>
      </header>

      <aside className="station-sidebar">
        <nav aria-label="产品导航">
          <span className="nav-label">工作台</span>
          {nav.map((item) => {
            const Icon = item.icon;
            return (
              <a className={item.active ? 'nav-item active' : 'nav-item'} href={item.href} key={item.label}>
                <Icon /><span>{item.label}</span>{item.count ? <b>{item.count}</b> : null}
              </a>
            );
          })}
        </nav>
        <section className="test-program">
          <div className="program-heading"><ShieldCheck /><span>PRO 内测计划</span></div>
          <strong>第 2 / 4 周</strong>
          <div className="program-track"><span /></div>
          <p>本周还需完成 2 次真实项目运行</p>
          <a href="#">查看测试任务 <ChevronRight /></a>
        </section>
        <div className="sidebar-footer"><CircleHelp /><span><strong>遇到问题？</strong><small>创建一条可复现记录</small></span></div>
      </aside>

      <section className="station-content">
        <div className="content-heading">
          <div><span className="overline">2026.09.02 · 内测工作台</span><h1>今天先解决哪一个<br />真实问题？</h1></div>
          <div className="heading-summary"><span>已沉淀证据</span><strong>{dashboard.counts.workflows + dashboard.counts.projects} <small>项</small></strong><p>{dashboard.counts.openIssues} 个问题等待闭环</p></div>
        </div>

        <section className="intent-grid" aria-label="快速开始">
          {intents.map((intent, index) => {
            const Icon = intent.icon;
            return (
              <a className="intent-card" href={intent.href} key={intent.title}>
                <span className="intent-index">0{index + 1}</span><span className="intent-icon"><Icon /></span>
                <strong>{intent.title}</strong><p>{intent.detail}</p><span className="intent-meta">{intent.meta}<ArrowUpRight /></span>
              </a>
            );
          })}
        </section>

        <div className="workspace-grid">
          <section className="run-evidence">
            <div className="panel-heading">
              <div><span className="panel-kicker">RUN EVIDENCE</span><h2>最近一次运行证据</h2></div>
              <Badge className="verified-badge"><ShieldCheck /> 官方验证</Badge>
            </div>
            <div className="run-title-row">
              <div className="model-emblem"><Play fill="currentColor" /></div>
              <div><strong>{run.workflow_title || '等待第一条真实运行'} · v{run.latest_version || 1}</strong><p>{run.model_name || '未记录模型'} · {run.hardware_sku || '未记录硬件'} · 已持久化</p></div>
              <button aria-label="打开运行详情"><ArrowUpRight /></button>
            </div>
            <div className="pipeline" aria-label="工作流运行阶段">
              {pipeline.map((step) => (
                <div className={`pipeline-step ${step.state}`} key={step.label}>
                  <span className="step-signal"><i /></span><strong>{step.label}</strong><small>{step.note}</small>
                </div>
              ))}
            </div>
            <div className="run-metrics">
              <div><span>首帧时间</span><strong>{Number(run.first_frame_seconds ?? 0).toFixed(1)}<small>s</small></strong><em>真实运行</em></div>
              <div><span>峰值显存</span><strong>{Number(run.peak_vram_gb ?? 0).toFixed(1)}<small>GB</small></strong><em>{run.hardware_sku || '未记录'}</em></div>
              <div><span>有效片段</span><strong>{usableOutputs}<small>/{totalOutputs}</small></strong><em>{usableRate}%</em></div>
              <div><span>运行状态</span><strong className="metric-state">{run.status === 'running' ? '生成中' : run.status || '待运行'}</strong><em>{run.engine_version || '引擎待记录'}</em></div>
            </div>
          </section>

          <aside className="signal-panel">
            <div className="panel-heading compact"><div><span className="panel-kicker">TEAM SIGNAL</span><h2>需要关注</h2></div><span className="signal-count">{String(dashboard.counts.openIssues).padStart(2, '0')}</span></div>
            <div className="issue-list">
              {recentIssues.slice(0, 3).map((issue) => (
                <article key={String(issue.id)}><div className="issue-status"><span>{issue.severity}</span><b>{statusLabels[String(issue.status)] ?? issue.status}</b></div><h3>{issue.title}</h3><p>{new Date(Number(issue.updated_at)).toLocaleDateString('zh-CN')}</p></article>
              ))}
            </div>
            <a className="all-issues" href="/issues">查看全部问题 <ChevronRight /></a>
          </aside>
        </div>
      </section>
    </main>
  );
}
