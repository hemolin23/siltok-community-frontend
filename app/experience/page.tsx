import { ArrowUpRight, BookOpenText, CheckCircle2, ExternalLink, ShieldCheck } from 'lucide-react';
import { WorkspaceFrame } from '@/components/workspace-frame';
import { listCommunityPosts } from '@/lib/records';

export const dynamic = 'force-dynamic';

const platformNames: Record<string, string> = { douyin: '抖音', bilibili: 'B站', xiaohongshu: '小红书', wechat_channels: '视频号' };

export default async function ExperiencePage() {
  const posts = await listCommunityPosts(60) as Array<Record<string, string | number | null>>;
  const scenarios = Array.from(new Set(posts.map((post) => String(post.scenario))));
  return <WorkspaceFrame active="experience" eyebrow="PUBLIC KNOWLEDGE" title="AI 视频经验库" description="从公开教程、实测和排错内容中提炼可复用经验；每条内容保留原作者和原链接。" createHref="/new?type=workflow" createLabel="分享你的工作流">
    <div className="source-disclosure"><ShieldCheck /><div><strong>公开内容整理，不代表原作者加入 Siltok 社区</strong><p>这里展示的是编辑摘要与学习线索，不冒充用户反馈，也不提供未经授权的工作流文件。正式模板需要经过文件获取、安全检查、真机复现和作者授权。</p></div></div>
    <div className="experience-filter"><span>全部 {posts.length}</span>{scenarios.map((scenario) => <span key={scenario}>{scenario}</span>)}</div>
    <section className="experience-grid">
      {posts.map((post, index) => <article className={index < 2 ? 'experience-card featured' : 'experience-card'} key={String(post.id)}>
        <header><span>{platformNames[String(post.source_platform)] ?? post.source_platform}</span><i>{post.content_type}</i><b>#{String(index + 1).padStart(2, '0')}</b></header>
        <div className="experience-model"><BookOpenText /><span>{post.model_names}</span></div>
        <h2>{post.original_title}</h2>
        <p>{post.summary}</p>
        <ul>{String(post.key_lessons).split('\n').map((lesson) => <li key={lesson}><CheckCircle2 /> {lesson}</li>)}</ul>
        <footer><div><small>原作者</small><strong>{post.source_creator_name}</strong></div><div><small>适用场景</small><strong>{post.scenario}</strong></div><a href={String(post.source_url)} rel="noreferrer" target="_blank">查看原内容 <ExternalLink /></a></footer>
      </article>)}
    </section>
    <div className="candidate-pipeline"><span>CONTENT → WORKFLOW</span><h2>经验帖如何进入正式模板库？</h2><div><b>01 候选发现</b><ArrowUpRight /><b>02 获取文件与授权</b><ArrowUpRight /><b>03 安全检查</b><ArrowUpRight /><b>04 Siltok 真机复现</b><ArrowUpRight /><b>05 发布与持续维护</b></div></div>
  </WorkspaceFrame>;
}
