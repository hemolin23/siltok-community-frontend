'use client';

import { useState } from 'react';
import { LoaderCircle } from 'lucide-react';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';

const labels: Record<string, string> = { triage: '待分诊', needs_info: '待补信息', reproduced: '已复现', in_progress: '处理中', planned: '进入版本', resolved: '已解决', closed: '已关闭' };

export function IssueStatusControl({ id, status, label }: { id: string; status: string; label: string }) {
  const [value, setValue] = useState(status);
  const [saving, setSaving] = useState(false);
  async function change(next: string) {
    setSaving(true);
    const previous = value;
    setValue(next);
    const response = await fetch(`/api/issues/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: next }) });
    if (!response.ok) setValue(previous);
    setSaving(false);
  }
  return <div className="status-control">{saving ? <LoaderCircle className="animate-spin" /> : null}<NativeSelect value={value} aria-label={`${label}，修改问题状态`} onChange={(event) => change(event.target.value)}>{Object.entries(labels).map(([key, text]) => <NativeSelectOption key={key} value={key}>{text}</NativeSelectOption>)}</NativeSelect></div>;
}
