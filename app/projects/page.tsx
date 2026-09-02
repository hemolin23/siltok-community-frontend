import { ArrowUpRight, BriefcaseBusiness, GitFork, MessageSquareWarning } from 'lucide-react';
import { WorkspaceFrame } from '@/components/workspace-frame';
import { listProjects } from '@/lib/records';

export const dynamic = 'force-dynamic';

const statusLabels: Record<string, string> = { first_version: '第一版', real_delivery: '真实交付', paid: '已有付费', paused: '暂停复盘' };

export default async function ProjectsPage() {
  const projects = await listProjects() as Array<Record<string, string | number | null>>;
  return <WorkspaceFrame active="projects" eyebrow="REAL PROJECTS" title="真实项目" description="围绕真实交付目标组织工作流、问题和测试结果。" createHref="/new?type=project" createLabel="创建项目">
    <div className="collection-toolbar"><span>{projects.length} 个项目</span><div><button className="active">全部</button><button>真实交付</button><button>招募共创</button><button>已有付费</button></div></div>
    <div className="project-grid">{projects.map((project) => <article className="project-card" key={String(project.id)}>
      <div className="record-card-top"><span className="record-type"><BriefcaseBusiness /> {project.scenario}</span><span className="record-status">{statusLabels[String(project.status)] ?? project.status}</span></div>
      <h2>{project.title}</h2><p>{project.summary}</p>
      <dl><div><dt>当前方案</dt><dd>{project.current_solution || '待补充'}</dd></div><div><dt>验证目标</dt><dd>{project.goal || '待补充'}</dd></div></dl>
      <footer><span><GitFork /> {project.workflow_count} 个工作流</span><span><MessageSquareWarning /> {project.issue_count} 个问题</span><button aria-label="打开项目"><ArrowUpRight /></button></footer>
    </article>)}</div>
  </WorkspaceFrame>;
}
