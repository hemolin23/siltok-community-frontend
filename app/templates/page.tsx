import { ArrowUpRight, Blocks, Box, Database, Gauge, ShieldCheck, Sparkles, Workflow } from 'lucide-react';
import { WorkspaceFrame } from '@/components/workspace-frame';
import { TemplateSaveButton } from '@/components/template-save-button';
import { listTemplates } from '@/lib/records';

export const dynamic = 'force-dynamic';

const evidenceLabels: Record<string, string> = {
  verified_run: '已有真机记录',
  official_reviewed: '官方审阅',
  community_testing: '社区共测',
  lab_testing: '实验室测试',
};

const statusLabels: Record<string, string> = { ready: '可直接使用', beta: 'Beta', testing: '适配中' };

export default async function TemplatesPage() {
  const templates = await listTemplates() as Array<Record<string, string | number | null>>;
  const skills = templates.filter((item) => item.kind === 'skill');
  const workflows = templates.filter((item) => item.kind === 'workflow');

  return <WorkspaceFrame
    active="templates"
    eyebrow="SILTOK CREATOR KIT"
    title="Skill 与模板库"
    description="把导演方法、生成步骤和失败处理封装成可复用资产；每个模板都标明模型、硬件与验证等级。"
    createHref="/new?type=workflow"
    createLabel="贡献工作流"
  >
    <section className="template-positioning">
      <div><span>产品品类</span><strong>本地 AI 创作工作站</strong></div>
      <i />
      <div><span>用户实际购买</span><strong>开箱即用、稳定可控的视频生产能力</strong></div>
      <i />
      <div><span>模板的作用</span><strong>把经验变成设备里的生产方法</strong></div>
    </section>

    <section className="template-composer">
      <div className="composer-copy"><span>从你的业务目标开始</span><strong>“我想把一张商品图，批量做成 20 条不同卖点的投流视频。”</strong></div>
      <div className="composer-options"><a href="#skills"><Workflow /> 流程自动匹配</a><a href="#skills"><Sparkles /> 选择 Skill</a><a href="#workflows"><Box /> 选择模型</a><a href="/new?type=project"><Database /> 上传资产</a></div>
    </section>

    <section className="kit-section" id="skills">
      <header className="kit-heading"><div><span><Sparkles /> SKILLS</span><h2>先选择你想解决的问题</h2><p>Skill 负责理解任务、拆解步骤和调用工作流，不只是保存一段提示词。</p></div><b>{skills.length} 个可用</b></header>
      <div className="skill-grid">{skills.map((item, index) => <article className="skill-card" key={String(item.id)}>
        <div className={`skill-art art-${index + 1}`}><Blocks /><span>{String(item.category)}</span><b>SKILL</b></div>
        <div className="skill-content"><header><span>{statusLabels[String(item.status)] ?? item.status}</span><small>{evidenceLabels[String(item.evidence_level)] ?? '待验证'}</small></header><h3>{item.title}</h3><p>{item.summary}</p><dl><div><dt>适用模型</dt><dd>{item.model_name || '多模型'}</dd></div><div><dt>运行设备</dt><dd>{item.hardware_sku || '自动匹配'}</dd></div></dl><footer><span><Database /> {Number(item.install_count)} 人保存</span><div><a href={`/templates/${item.slug}`}>查看说明</a><TemplateSaveButton templateId={String(item.id)} /></div></footer></div>
      </article>)}</div>
    </section>

    <section className="kit-section workflow-kit-section" id="workflows">
      <header className="kit-heading"><div><span><Workflow /> WORKFLOW TEMPLATES</span><h2>再把任务放进可运行的流程</h2><p>模板包含输入要求、推荐模型、硬件边界与真实验证状态。</p></div><b>{workflows.length} 个模板</b></header>
      <div className="template-workflow-list">{workflows.map((item) => {
        let inputs: string[] = [];
        try { inputs = JSON.parse(String(item.input_schema_json ?? '[]')); } catch { inputs = []; }
        return <article key={String(item.id)}>
          <div className="template-number">{String(workflows.indexOf(item) + 1).padStart(2, '0')}</div>
          <div className="template-summary"><span>{item.category} · {statusLabels[String(item.status)] ?? item.status}</span><h3>{item.title}</h3><p>{item.summary}</p><div>{inputs.map((input) => <small key={input}>{input}</small>)}</div></div>
          <div className="template-runtime"><span><Box /> {item.model_name}</span><span><Gauge /> {item.hardware_sku}</span><span><ShieldCheck /> {evidenceLabels[String(item.evidence_level)] ?? '待验证'}</span></div>
          <TemplateSaveButton templateId={String(item.id)} />
          <a className="template-open" href={`/templates/${item.slug}`} aria-label="查看模板"><ArrowUpRight /></a>
        </article>;
      })}</div>
    </section>

    <section className="template-loop"><div><span>01</span><b>使用官方模板</b><small>减少部署和试错</small></div><i /><div><span>02</span><b>运行真实项目</b><small>自动沉淀证据</small></div><i /><div><span>03</span><b>贡献改进版本</b><small>保留署名与授权</small></div><i /><div><span>04</span><b>进入官方模板库</b><small>分发、收益或设备支持</small></div></section>
  </WorkspaceFrame>;
}
