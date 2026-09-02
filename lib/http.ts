import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export function apiError(error: unknown) {
  if (error instanceof ZodError) {
    return NextResponse.json({ error: '提交内容不完整', fields: error.issues }, { status: 400 });
  }
  if (error instanceof ApiError) {
    return NextResponse.json({ error: error.message }, { status: error.status });
  }
  console.error(error);
  return NextResponse.json({ error: '服务暂时不可用，请稍后重试' }, { status: 500 });
}
