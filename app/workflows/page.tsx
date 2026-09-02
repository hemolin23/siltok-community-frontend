import { ArrowUpRight, Boxes, CircleDot, GitFork, Play } from 'lucide-react';
import { WorkspaceFrame } from '@/components/workspace-frame';
import { listWorkflows } from '@/lib/records';

export const dynamic = 'force-dynamic';

const statusLabels: Record<string, string> = { draft: '待验证', verified: '官方验证', production: '商用中' };

export default async function WorkflowsPage() {
  const workflows = await listWorkflows() as Array<Record<string, string | number | null>>;
  return <WorkspaceFrame active="workflows" eyebrow="WORKFLOW REGISTRY" title="工作流" description="查看模型、硬件、版本和真实复现记录，而不只看一张结果图。" createHref="/new?type=workflow" createLabel="提交工作流">
    <div className="collection-toolbar"><span>{workflows.length} 个工作流</span><div><button className="active">全部</button><button>短剧</button><button>电商</button><button>Siltok Lite</button><button>Siltok Pro</button></div></div>
    <div className="workflow-list">{workflows.map((workflow) => <article className="workflow-row" key={String(workflow.id)}>
      <div className="workflow-signal"><Play fill="currentColor" /></div>
      <div className="workflow-main"><div><span>{workflow.scenario}</span><b>{statusLabels[String(workflow.status)] ?? workflow.status}</b></div><h2>{workflow.title} <small>v{workflow.latest_version}</small></h2><p>{workflow.project_title ? `来自项目：${workflow.project_title}` : '独立工作流'}</p></div>
      <div className="workflow-spec"><span>模型</span><strong>{workflow.model_name}</strong></div>
      <div className="workflow-spec"><span>硬件</span><strong>{workflow.hardware_sku || '待记录'}</strong></div>
      <div className="workflow-proof"><span><GitFork /> {workflow.run_count} 次运行</span><span><CircleDot /> {workflow.issue_count} 个问题</span></div>
      <button className="row-open" aria-label="打开工作流"><ArrowUpRight /></button>
    </article>)}</div>
  </WorkspaceFrame>;
}
