import { NextResponse } from 'next/server';
import { z } from 'zod';
import { resolveActorId } from '@/lib/auth';
import { apiError } from '@/lib/http';
import { saveTemplate } from '@/lib/records';

const inputSchema = z.object({ templateId: z.string().trim().min(1).max(120) });

export async function POST(request: Request) {
  try {
    const { templateId } = inputSchema.parse(await request.json());
    const created = await saveTemplate(templateId, await resolveActorId(request));
    return NextResponse.json({ saved: true, created });
  } catch (error) {
    return apiError(error);
  }
}
