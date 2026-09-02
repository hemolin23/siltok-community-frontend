import { NextResponse } from 'next/server';
import { z } from 'zod';
import { apiError } from '@/lib/http';
import { updateIssueStatus } from '@/lib/records';

const statusSchema = z.object({
  status: z.enum(['triage', 'needs_info', 'reproduced', 'in_progress', 'planned', 'resolved', 'closed']),
});

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const { status } = statusSchema.parse(await request.json());
    const updated = await updateIssueStatus(id, status);
    return updated ? NextResponse.json({ id, status }) : NextResponse.json({ error: '问题不存在' }, { status: 404 });
  } catch (error) {
    return apiError(error);
  }
}
