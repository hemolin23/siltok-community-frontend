import { ArrowLeft, Box, CheckCircle2, Database, Gauge, ShieldCheck, Sparkles } from 'lucide-react';
import { TemplateSaveButton } from '@/components/template-save-button';
import { WorkspaceFrame } from '@/components/workspace-frame';
import { getTemplateBySlug } from '@/lib/records';

export const dynamic = 'force-dynamic';

const evidenceLabels: Record<string, string> = {
  verified_run: '已有真机运行记录',
  official_reviewed: '已通过官方审阅',
  community_testing: '正在社区共测',
  lab_testing: '正在实验室测试',
};

export default async function TemplateDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getTemplateBySlug(slug) as Record<string, string | number | null> | null;
  if (!item) return <WorkspaceFrame active="templates" eyebrow="NOT FOUND" title="模板不存在" description="这个模板可能已下架或仍处于私密测试。" createHref="/templates" createLabel="返回模板库"><a className="template-back" href="/templates"><ArrowLeft /> 返回全部模板</a></WorkspaceFrame>;
  let inputs: string[] = [];
  try { inputs = JSON.parse(String(item.input_schema_json ?? '[]')); } catch { inputs = []; }

  return <WorkspaceFrame active="templates" eyebrow={item.kind === 'skill' ? 'SKILL DETAIL' : 'WORKFLOW DETAIL'} title={String(item.title)} description={String(item.summary)} createHref="/new?type=workflow" createLabel="贡献改进版本">
    <a className="template-back" href="/templates"><ArrowLeft /> 返回 Skill 与模板库</a>
    <div className="template-detail-layout">
      <article className="template-detail-main">
        <div className="detail-stage"><Sparkles /><span>{String(item.category)}</span><strong>{item.kind === 'skill' ? 'SKILL' : 'WORKFLOW'}</strong></div>
        <section><span>它会做什么</span><h2>{item.summary}</h2><p>{item.instructions}</p></section>
        <section><span>需要你提供</span><div className="detail-inputs">{inputs.map((input) => <div key={input}><CheckCircle2 /><b>{input}</b></div>)}</div></section>
        <section><span>验证原则</span><p>模板不会隐藏失败。运行时会记录模型版本、硬件、参数、可用率与返工原因；只有经过真实任务复现的版本才会升级验证等级。</p></section>
      </article>
      <aside className="template-detail-side">
        <div><span><Box /> 适用模型</span><strong>{item.model_name || '多模型'}</strong></div>
        <div><span><Gauge /> 推荐设备</span><strong>{item.hardware_sku || '系统自动匹配'}</strong></div>
        <div><span><ShieldCheck /> 验证等级</span><strong>{evidenceLabels[String(item.evidence_level)] ?? '等待真实任务验证'}</strong></div>
        <div><span><Database /> 保存次数</span><strong>{Number(item.install_count)}</strong></div>
        <TemplateSaveButton templateId={String(item.id)} />
        <small>加入工作台后可复制到自己的项目；公开改进版本前会单独确认署名、授权与素材范围。</small>
      </aside>
    </div>
  </WorkspaceFrame>;
}
