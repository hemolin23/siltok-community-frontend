'use client';

import { useState } from 'react';
import { Check, Plus } from 'lucide-react';

export function TemplateSaveButton({ templateId }: { templateId: string }) {
  const [state, setState] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  async function save() {
    setState('saving');
    try {
      const response = await fetch('/api/templates/install', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ templateId }),
      });
      if (!response.ok) throw new Error('save failed');
      setState('saved');
    } catch {
      setState('error');
    }
  }

  return <button className={`template-save ${state === 'saved' ? 'saved' : ''}`} disabled={state === 'saving' || state === 'saved'} onClick={save} type="button">
    {state === 'saved' ? <Check /> : <Plus />}
    {state === 'saving' ? '保存中' : state === 'saved' ? '已加入我的工作台' : state === 'error' ? '重试' : '加入工作台'}
  </button>;
}
