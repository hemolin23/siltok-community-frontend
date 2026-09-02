import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

export function apiError(error: unknown) {
  if (error instanceof ZodError) {
    return NextResponse.json({ error: '提交内容不完整', fields: error.flatten().fieldErrors }, { status: 400 });
  }
  console.error(error);
  return NextResponse.json({ error: '服务暂时不可用，请稍后重试' }, { status: 500 });
}
