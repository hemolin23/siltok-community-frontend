'use client';

import { FormEvent, useState } from 'react';
import { ArrowLeft, CheckCircle2, FileJson, LoaderCircle, LockKeyhole, Mic, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
import { Textarea } from '@/components/ui/textarea';

type RecordType = 'project' | 'workflow' | 'issue';

const config = {
  project: { label: '真实项目', endpoint: '/api/projects', heading: '把正在交付的项目带进来', description: '不用先介绍完整背景。先说清楚场景、现有方案和你想验证的结果。' },
  workflow: { label: '工作流', endpoint: '/api/workflows', heading: '提交一个可复现的工作流', description: '记录模型、硬件、参数与版本，让团队能真实复现，而不是只看结果图。' },
  issue: { label: '问题反馈', endpoint: '/api/issues', heading: '提交一条可复现的问题', description: '负面反馈不会被弱化。请告诉我们发生了什么、影响了什么，以及你原本期待什么。' },
} satisfies Record<RecordType, { label: string; endpoint: string; heading: string; description: string }>;

export function RecordForm({ initialType }: { initialType: RecordType }) {
  const [type, setType] = useState<RecordType>(initialType);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ id: string } | null>(null);
  const [error, setError] = useState('');
  const [file, setFile] = useState<File | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    const data = new FormData(event.currentTarget);
    const value = Object.fromEntries(data.entries());
    delete value.file;
    try {
      const response = await fetch(config[type].endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(value) });
      const body = await response.json() as { id?: string; error?: string };
      if (!response.ok || !body.id) throw new Error(body.error ?? '提交失败');
      if (file) {
        const upload = new FormData();
        upload.set('file', file);
        upload.set('entityType', type);
        upload.set('entityId', body.id);
        upload.set('visibility', String(value.visibility ?? 'private'));
        const uploadResponse = await fetch('/api/uploads', { method: 'POST', body: upload });
        if (!uploadResponse.ok) {
          const uploadBody = await uploadResponse.json() as { error?: string };
          throw new Error(`记录已保存，但附件失败：${uploadBody.error ?? '请稍后重试'}`);
        }
      }
      setResult({ id: body.id });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : '提交失败');
    } finally {
      setSubmitting(false);
    }
  }

  if (result) {
    return <section className="record-success">
      <CheckCircle2 />
      <span className="panel-kicker">RECORD SAVED</span>
      <h1>已经进入 Siltok 的共创队列。</h1>
      <p>编号 <code>{result.id}</code> 已持久化保存。团队后续的分诊、复现与状态变化会围绕这条记录继续。</p>
      <div><Button render={<a href="/" />}>返回工作台</Button><Button variant="outline" onClick={() => setResult(null)}>继续提交</Button></div>
    </section>;
  }

  return <div className="record-layout">
    <aside className="record-context">
      <a className="back-link" href="/"><ArrowLeft /> 返回工作台</a>
      <span className="panel-kicker">NEW EVIDENCE</span>
      <h1>{config[type].heading}</h1>
      <p>{config[type].description}</p>
      <div className="privacy-note"><LockKeyhole /><span><strong>默认私密</strong><small>商业素材、日志和原始工作流不会自动公开。</small></span></div>
      <button className="voice-entry" type="button"><Mic /><span><strong>不想填表？</strong><small>语音提交即将接入得到大脑</small></span></button>
    </aside>

    <section className="record-form-panel">
      <div className="record-type-tabs" role="tablist" aria-label="选择记录类型">
        {(Object.keys(config) as RecordType[]).map((key) => <button key={key} type="button" role="tab" aria-selected={type === key} className={type === key ? 'active' : ''} onClick={() => { setType(key); setFile(null); }}>{config[key].label}</button>)}
      </div>
      <form onSubmit={submit}>
        <FieldGroup>
          <Field><FieldLabel htmlFor="title">标题</FieldLabel><Input id="title" name="title" required minLength={2} maxLength={120} placeholder={type === 'issue' ? '例如：Wan2.2 生成侧脸时角色一致性下降' : '用一句话说明你正在做什么'} /></Field>
          <div className="form-grid two">
            <Field><FieldLabel htmlFor="scenario">使用场景</FieldLabel><NativeSelect className="w-full" id="scenario" name="scenario" required defaultValue="短剧"><NativeSelectOption>短剧</NativeSelectOption><NativeSelectOption>电商</NativeSelectOption><NativeSelectOption>广告</NativeSelectOption><NativeSelectOption>游戏</NativeSelectOption><NativeSelectOption>开发</NativeSelectOption><NativeSelectOption>其他</NativeSelectOption></NativeSelect></Field>
            {type === 'issue' ? <Field><FieldLabel htmlFor="severity">影响程度</FieldLabel><NativeSelect className="w-full" id="severity" name="severity" required defaultValue="P1"><NativeSelectOption value="P0">P0 · 完全阻断交付</NativeSelectOption><NativeSelectOption value="P1">P1 · 严重影响结果</NativeSelectOption><NativeSelectOption value="P2">P2 · 有绕过方案</NativeSelectOption><NativeSelectOption value="P3">P3 · 体验建议</NativeSelectOption></NativeSelect></Field> : null}
            {type === 'workflow' ? <Field><FieldLabel htmlFor="modelName">主要模型</FieldLabel><Input id="modelName" name="modelName" required placeholder="Wan2.2 FP8" /></Field> : null}
          </div>
          {type === 'project' ? <>
            <Field><FieldLabel htmlFor="summary">真实业务与当前限制</FieldLabel><Textarea id="summary" name="summary" required minLength={10} placeholder="这个项目最终要交付什么？现在最影响交付的是什么？" /></Field>
            <Field><FieldLabel htmlFor="currentSolution">当前方案</FieldLabel><Textarea id="currentSolution" name="currentSolution" placeholder="目前用什么工具、云服务或人工流程？成本和废片率如何？" /></Field>
            <Field><FieldLabel htmlFor="goal">希望验证的结果</FieldLabel><Textarea id="goal" name="goal" placeholder="例如：15 秒视频 3 分钟内完成，废片率低于 20%" /></Field>
          </> : null}
          {type === 'workflow' ? <>
            <div className="form-grid two"><Field><FieldLabel htmlFor="hardwareSku">运行设备</FieldLabel><NativeSelect className="w-full" id="hardwareSku" name="hardwareSku" defaultValue="Siltok Pro"><NativeSelectOption>Siltok Pro</NativeSelectOption><NativeSelectOption>Siltok Lite</NativeSelectOption><NativeSelectOption>其他设备</NativeSelectOption></NativeSelect></Field><Field><FieldLabel htmlFor="quantization">精度/量化</FieldLabel><Input id="quantization" name="quantization" placeholder="FP8 / FP4 / GGUF" /></Field></div>
            <Field><FieldLabel htmlFor="parametersJson">关键参数 JSON</FieldLabel><Textarea className="console-input" id="parametersJson" name="parametersJson" placeholder={'{"resolution":"1280x720","steps":12,"duration":5}'} /><FieldDescription>后续可由 Launcher 自动填入。</FieldDescription></Field>
            <Field><FieldLabel htmlFor="changelog">这一版改变了什么</FieldLabel><Textarea id="changelog" name="changelog" placeholder="写清本次优化和仍然存在的问题。" /></Field>
          </> : null}
          {type === 'issue' ? <>
            <input type="hidden" name="category" value="体验问题" />
            <Field><FieldLabel htmlFor="description">发生了什么</FieldLabel><Textarea id="description" name="description" required minLength={10} placeholder="从哪个操作开始，问题如何出现，出现频率是多少？" /></Field>
            <div className="form-grid two"><Field><FieldLabel htmlFor="expectedResult">预期结果</FieldLabel><Textarea id="expectedResult" name="expectedResult" placeholder="你希望发生什么？" /></Field><Field><FieldLabel htmlFor="actualResult">实际结果</FieldLabel><Textarea id="actualResult" name="actualResult" placeholder="实际发生了什么？" /></Field></div>
          </> : null}
          <Field><FieldLabel htmlFor="file">附件证据</FieldLabel><label className="upload-drop" htmlFor="file"><Upload /><span><strong>{file ? file.name : '选择截图、日志、JSON、ZIP、视频或录音'}</strong><small>单文件最大 50MB；默认保存在私有对象存储</small></span></label><Input className="sr-only" id="file" name="file" type="file" accept=".json,.zip,.txt,.jpg,.jpeg,.png,.webp,.mp4,.mp3,.m4a,.wav" onChange={(event) => setFile(event.target.files?.[0] ?? null)} /></Field>
          <Field><FieldLabel htmlFor="visibility">可见范围</FieldLabel><NativeSelect className="w-full" id="visibility" name="visibility" defaultValue="private"><NativeSelectOption value="private">仅我和 Siltok 团队</NativeSelectOption><NativeSelectOption value="team">我的项目组</NativeSelectOption><NativeSelectOption value="beta">全体内测用户</NativeSelectOption><NativeSelectOption value="public">匿名公开案例</NativeSelectOption></NativeSelect></Field>
        </FieldGroup>
        {error ? <p className="form-error" role="alert">{error}</p> : null}
        <div className="form-actions"><span><FileJson /> 提交后仍可继续补充证据</span><Button disabled={submitting} size="lg">{submitting ? <><LoaderCircle className="animate-spin" /> 保存中</> : '保存记录'}</Button></div>
      </form>
    </section>
  </div>;
}
