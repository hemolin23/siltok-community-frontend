'use client';

import { useEffect, useState } from 'react';
import { Activity, Database, FileUp, FolderKanban, LoaderCircle, MessageSquareWarning, Sparkles, Users, Workflow } from 'lucide-react';

type Row = Record<string, string | number | null>;
type Payload = { preview: boolean; counts: Record<string, number>; users: Row[]; events: Row[]; attachments: Row[] };

const countCards = [
  ['users', '用户', Users], ['projects', '项目', FolderKanban], ['workflows', '用户工作流', Workflow],
  ['templates', '官方模板', Sparkles], ['issues', '问题', MessageSquareWarning], ['attachments', '上传文件', FileUp], ['posts', '社区经验', Database],
] as const;

function time(value: string | number | null) {
  return value ? new Date(Number(value)).toLocaleString('zh-CN', { hour12: false }) : '—';
}

export function AdminDashboard() {
  const [data, setData] = useState<Payload | null>(null);
  const [error, setError] = useState('');
  useEffect(() => { void fetch('/api/admin/overview').then(async (response) => {
    const body = await response.json() as Payload & { error?: string };
    if (!response.ok) throw new Error(body.error ?? '读取失败');
    return body;
  }).then((body) => setData(body)).catch((reason: unknown) => setError(reason instanceof Error ? reason.message : '读取失败')); }, []);
  if (error) return <div className="admin-state"><MessageSquareWarning /><b>{error}</b><p>请先使用管理员手机号登录。</p></div>;
  if (!data) return <div className="admin-state"><LoaderCircle className="portal-loader" /><b>正在读取用户数据</b></div>;

  return <div className="admin-board">
    {data.preview && <div className="admin-preview-note"><Activity /> 当前是站点所有者预览。配置短信与管理员手机号后，后台会只允许管理员账号进入。</div>}
    <section className="admin-counts">{countCards.map(([key, label, Icon]) => <article key={key}><Icon /><span>{label}</span><strong>{data.counts[key] ?? 0}</strong></article>)}</section>
    <section className="admin-panel"><header><div><span>USERS</span><h2>注册用户</h2></div><small>联系方式在数据库中加密，只在管理员接口解密显示</small></header><div className="admin-table user-table"><div className="admin-table-head"><span>用户</span><span>手机号</span><span>角色</span><span>状态</span><span>注册时间</span></div>{data.users.map((user) => <div className="admin-table-row" key={String(user.id)}><strong>{user.display_name}</strong><span>{user.phone || '—'}</span><span>{user.role}</span><span>{user.status}</span><span>{time(user.created_at)}</span></div>)}</div></section>
    <section className="admin-split"><article className="admin-panel"><header><div><span>AUTH EVENTS</span><h2>登录与验证码</h2></div></header><div className="admin-log">{data.events.length ? data.events.map((event) => { let detail: Record<string, string> = {}; try { detail = JSON.parse(String(event.detail ?? '{}')); } catch {} return <div key={String(event.id)}><Activity /><span><b>{event.event_type}</b><small>{event.display_name || `手机号尾号 ${detail.phoneTail ?? '未知'}`} · {event.provider}</small></span><time>{time(event.created_at)}</time></div>; }) : <p>还没有登录事件</p>}</div></article>
      <article className="admin-panel"><header><div><span>UPLOADS</span><h2>用户上传</h2></div></header><div className="admin-log">{data.attachments.length ? data.attachments.map((file) => <div key={String(file.id)}><FileUp /><span><b><a href={`/api/uploads/${file.id}`}>{file.filename}</a></b><small>{file.display_name} · {file.project_title || file.workflow_title || file.issue_title || '未关联记录'}</small></span><time>{Math.ceil(Number(file.byte_size) / 1024)} KB<br />{time(file.created_at)}</time></div>) : <p>还没有用户上传文件</p>}</div></article></section>
  </div>;
}
