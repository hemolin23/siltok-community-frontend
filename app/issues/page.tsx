import { AlertTriangle, ArrowUpRight, Paperclip, Radio, UserRound } from 'lucide-react';
import { WorkspaceFrame } from '@/components/workspace-frame';
import { IssueStatusControl } from '@/components/issue-status-control';
import { listIssues } from '@/lib/records';

export const dynamic = 'force-dynamic';

const statusLabels: Record<string, string> = { triage: '待分诊', needs_info: '待补信息', reproduced: '已复现', in_progress: '处理中', planned: '进入版本', resolved: '已解决', closed: '已关闭' };

export default async function IssuesPage() {
  const issues = await listIssues() as Array<Record<string, string | number | null>>;
  return <WorkspaceFrame active="issues" eyebrow="ISSUE EVIDENCE" title="问题与负面反馈" description="每条问题都有证据、负责人和处理状态；不把负面反馈埋在聊天记录里。" createHref="/new?type=issue" createLabel="提交问题">
    <div className="collection-toolbar"><span>{issues.length} 个问题</span><div><button className="active">未解决</button><button>P0 / P1</button><button>已复现</button><button>进入版本</button><button>已解决</button></div></div>
    <div className="issue-table"><div className="issue-table-head"><span>问题</span><span>关联对象</span><span>证据</span><span>状态</span><span /></div>{issues.map((issue) => <article className="issue-row" key={String(issue.id)}>
      <div className="issue-summary"><span className={`severity ${String(issue.severity).toLowerCase()}`}><AlertTriangle /> {issue.severity}</span><div><h2>{issue.title}</h2><p>{issue.category} · <UserRound /> {issue.reporter_name}</p></div></div>
      <div className="issue-linked"><strong>{issue.project_title || issue.workflow_title || '未关联项目'}</strong><small>{issue.workflow_title ? `工作流：${issue.workflow_title}` : '独立反馈'}</small></div>
      <div className="issue-evidence-count"><span><Paperclip /> {issue.attachment_count}</span><span><Radio /> {issue.comment_count}</span></div>
      <IssueStatusControl id={String(issue.id)} status={String(issue.status)} label={statusLabels[String(issue.status)] ?? String(issue.status)} />
      <button className="row-open" aria-label="打开问题"><ArrowUpRight /></button>
    </article>)}</div>
  </WorkspaceFrame>;
}
