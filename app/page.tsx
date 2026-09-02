import {
  ArrowRight,
  Boxes,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  Clock3,
  Cpu,
  FileJson,
  Gauge,
  MessageCircle,
  Play,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';

import { getDashboard, listProjects, listTemplates, listWorkflows } from '@/lib/records';

export const dynamic = 'force-dynamic';

function Brand() {
  return <a className="canvas-brand" href="/" aria-label="Siltok Lab 首页"><span className="brand-sigil">S</span><span><b>SILTOK</b><small>LAB</small></span></a>;
}

function SiteHeader() {
  return <>
    <div className="launch-ribbon"><span>●</span> Siltok AI Station 首批共创计划开放中 <a href="/#beta">查看测试权益 <ArrowRight /></a></div>
    <header className="canvas-header">
      <Brand />
      <nav aria-label="主要导航"><a className="active" href="/">首页</a><a href="/projects">共创项目</a><a href="/workflows">工作流</a><a href="/templates">Skill 模板</a><a href="/issues">问题反馈</a><a href="/#benchmarks">模型实测</a></nav>
      <div className="header-actions"><a className="quiet-action" href="/login"><MessageCircle /> 微信登录</a><a className="neon-action" href="/new?type=project">申请内测 <ArrowRight /></a></div>
    </header>
  </>;
}

const process = [
  ['01', '带来真实任务', '短剧、电商或广告项目，不要求整理成完整报告。'],
  ['02', '专人迁移工作流', '我们配置模型、节点与环境，把固定痛点写进设备。'],
  ['03', '远程真机运行', '在 Siltok Pro 上记录速度、成片率、返工和失败模式。'],
  ['04', '带走可用资产', '保留工作流、参数与对比结果，再决定租用或购买。'],
];

const statusText: Record<string, string> = { first_version: '第一版', real_delivery: '真实交付', paid: '已有付费', verified: '官方复现', draft: '等待验证' };

export default async function Home() {
  const [dashboard, projects, workflows, templates] = await Promise.all([getDashboard(), listProjects(), listWorkflows(), listTemplates()]);
  const project = (projects[0] ?? {}) as Record<string, string | number | null>;
  const workflow = (workflows[0] ?? {}) as Record<string, string | number | null>;
  const issue = (dashboard.issues[0] ?? {}) as Record<string, string | number | null>;
  const run = (dashboard.run ?? {}) as Record<string, string | number | null>;
  const total = Number(run.total_outputs ?? 0);
  const usable = Number(run.usable_outputs ?? 0);
  const featuredTemplates = templates.slice(0, 5) as Array<Record<string, string | number | null>>;

  return <main className="canvas-site">
    <SiteHeader />

    <section className="cinema-hero">
      <div className="hero-copy">
        <span className="hero-kicker"><Sparkles /> 为真实创作者而建的本地 AI 共创站</span>
        <h1>把真实工作流，<br />做进你的 <em>AI 主机</em></h1>
        <p>不是让你替我们测试技术。你带来一个正在卡住的商业任务，我们负责迁移、跑通并留下可复用的工作流。</p>
        <div className="hero-actions"><a className="hero-primary" href="/new?type=project">申请远程测试 <ArrowRight /></a><a className="hero-secondary" href="/workflows"><Play fill="currentColor" /> 查看真实工作流</a></div>
        <div className="hero-promises"><span><CheckCircle2 /> 不要求好评</span><span><ShieldCheck /> 素材默认私密</span><span><FileJson /> 工作流可带走</span></div>
      </div>

      <div className="hero-stage" aria-label="Siltok 工作流运行预览">
        <img src="/og.png" alt="Siltok Lab 本地 AI 工作流共创平台" />
        <div className="stage-console">
          <div><span className="live-dot" /> LIVE RUN</div><strong>{String(run.model_name ?? 'Wan2.2 FP8')}</strong><small>{String(run.hardware_sku ?? 'Siltok Pro')} · {String(run.engine_version ?? 'Silitok Speed')}</small>
        </div>
        <div className="stage-metric"><span>可用片段</span><strong>{usable}/{total || 12}</strong><small>每一次失败也会被记录</small></div>
      </div>
    </section>

    <section className="proof-strip" aria-label="产品价值"><div><Cpu /><span><b>本地运行</b><small>数据不离开设备</small></span></div><div><Gauge /><span><b>真实实测</b><small>速度、质量与失败率</small></span></div><div><Boxes /><span><b>专属工作流</b><small>由团队迁移和优化</small></span></div><div><Users /><span><b>灵活使用</b><small>远程、租用与置换</small></span></div></section>

    <section className="positioning-section">
      <span>WHAT SILTOK REALLY SELLS</span>
      <div><h2>不是一台堆配置的电脑。</h2><p>产品品类是<strong>本地 AI 创作工作站</strong>；用户真正购买的是<strong>开箱即用、稳定可控的 AI 视频内容生产方案</strong>。硬件、Silitok Speed、Skill、工作流、模板更新和技术服务共同构成产品。</p></div>
    </section>

    <section className="home-kit-section">
      <header className="section-title"><div><span>SILTOK CREATOR KIT</span><h2>从一个 Skill 开始，而不是从节点开始。</h2><p>选择业务目标，系统再匹配工作流、模型和设备能力。</p></div><a href="/templates">进入 Skill 与模板库 <ChevronRight /></a></header>
      <div className="home-skill-rail">{featuredTemplates.map((item, index) => <a href="/templates" className={`home-skill-card tone-${index + 1}`} key={String(item.id)}><div><Sparkles /><span>{item.kind === 'skill' ? 'SKILL' : 'WORKFLOW'}</span></div><b>{item.title}</b><p>{item.summary}</p><footer><small>{item.category}</small><small>{String(item.status).toUpperCase()}</small></footer></a>)}</div>
      <div className="home-kit-loop"><span>官方模板帮助用户开始</span><ArrowRight /><span>真实项目产生运行证据</span><ArrowRight /><span>用户改进版本回到社区</span><ArrowRight /><strong>沉淀为 Siltok 生产能力</strong></div>
    </section>

    <section className="community-section" id="community">
      <header className="section-title"><div><span>SILTOK CREATOR COMMUNITY</span><h2>正在发生的共创现场</h2><p>真实项目、可复现工作流和不被隐藏的负面反馈。</p></div><a href="/projects">进入共创广场 <ChevronRight /></a></header>
      <div className="community-tabs"><button className="active">精选</button><button>短剧制作</button><button>电商素材</button><button>模型实测</button><button>失败复盘</button><button>招募中</button></div>
      <div className="story-grid">
        <article className="feature-story">
          <div className="story-visual"><span className="story-label">{statusText[String(project.status)] ?? '真实项目'}</span><div className="shot-track"><i /><i /><i /><i /><i /></div><div className="story-model">WAN 2.2 <small>× SILTOK SPEED</small></div></div>
          <div className="story-body"><span>{String(project.scenario ?? 'AI 短剧')} · 共创项目</span><h3>{String(project.title ?? '把一条真实短剧工作流迁移到本地')}</h3><p>{String(project.summary ?? '围绕真实交付目标验证角色一致性、生成速度与废片率。')}</p><footer><b>SG</b><span>工作流 {Number(project.workflow_count ?? 1)}</span><span>问题 {Number(project.issue_count ?? 0)}</span><a href="/projects">查看项目 <ArrowRight /></a></footer></div>
        </article>
        <article className="compact-story workflow-story"><div className="compact-icon"><Play fill="currentColor" /></div><span>{statusText[String(workflow.status)] ?? '官方复现'}</span><h3>{String(workflow.title ?? '短剧分镜转视频 · 角色一致性')}</h3><p>{String(workflow.model_name ?? 'Wan2.2 FP8')} · {String(workflow.hardware_sku ?? 'Siltok Pro')}</p><div className="mini-spec"><span><b>{Number(workflow.run_count ?? 1)}</b> 次真实运行</span><span><b>v{Number(workflow.latest_version ?? 1)}</b> 当前版本</span></div><a href="/workflows">打开工作流 <ChevronRight /></a></article>
        <article className="compact-story issue-story"><div className="compact-icon"><CircleAlert /></div><span>失败也值得被看见</span><h3>{String(issue.title ?? '记录一个影响交付的真实问题')}</h3><p>{String(issue.category ?? '效果')} · {String(issue.severity ?? 'P1')} · 已进入处理队列</p><blockquote>“我们不要求正面评价。能复现的问题，才有机会变成产品能力。”</blockquote><a href="/issues">查看问题进展 <ChevronRight /></a></article>
      </div>
    </section>

    <section className="station-section" id="benchmarks">
      <div className="station-copy"><span>SILTOK AI STATION</span><h2>一套软件，适配两种创作强度。</h2><p>Lite 面向个人创作者，Pro 面向专业团队。系统自动选择模型精度、显存调度和任务策略，不让用户面对“显存不够”的错误提示。</p><a href="/new?type=project">用你的任务判断适合哪一款 <ArrowRight /></a></div>
      <div className="sku-compare"><article><header><span>LITE</span><b>个人创作者</b></header><strong>16GB</strong><small>RTX 5060 Ti</small><ul><li>单任务优先</li><li>自动量化与卸载</li><li>万元级目标</li></ul></article><article className="pro"><header><span>PRO</span><b>工作室</b></header><strong>24GB</strong><small>RTX 5090D v2</small><ul><li>更高规格生成</li><li>更从容的动态调度</li><li>真实项目远程测试</li></ul></article></div>
    </section>

    <section className="beta-section" id="beta"><header><span>REMOTE BETA</span><h2>测试不是填一张长表，<br />而是一起完成一次真实交付。</h2></header><div className="beta-steps">{process.map(([num, title, desc]) => <article key={num}><b>{num}</b><i /><h3>{title}</h3><p>{desc}</p></article>)}</div><div className="beta-callout"><div><Clock3 /><span><b>第一次只聊 15 分钟</b><small>先判断你的痛点和产品是否匹配，不直接发长协议。</small></span></div><a href="/login">微信扫码加入 <ArrowRight /></a></div></section>

    <footer className="canvas-footer"><Brand /><p>AI for everyone. Your data stays home, your creativity never queues.</p><div><a href="/projects">共创项目</a><a href="/workflows">工作流</a><a href="/templates">Skill 模板</a><a href="/issues">问题反馈</a><a href="https://siltok-ai.com/products/ai-station">AI Station</a></div></footer>
  </main>;
}
