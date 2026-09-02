import { NextResponse } from 'next/server';
import { listTemplates } from '@/lib/records';
import { apiError } from '@/lib/http';

export async function GET() {
  try {
    return NextResponse.json({ items: await listTemplates() });
  } catch (error) {
    return apiError(error);
  }
}
