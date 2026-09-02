import { NextResponse } from 'next/server';
import { z } from 'zod';
import { apiError } from '@/lib/http';
import { createIssue, listIssues } from '@/lib/records';
import { resolveActorId } from '@/lib/auth';

const issueSchema = z.object({
  title: z.string().trim().min(2).max(120),
  category: z.string().trim().min(1).max(30),
  severity: z.enum(['P0', 'P1', 'P2', 'P3']),
  description: z.string().trim().min(10).max(4000),
  expectedResult: z.string().trim().max(1200).optional(),
  actualResult: z.string().trim().max(1200).optional(),
  projectId: z.string().trim().max(100).optional(),
  workflowId: z.string().trim().max(100).optional(),
  visibility: z.enum(['private', 'team', 'beta', 'public']).default('private'),
});

export async function GET() {
  try {
    return NextResponse.json({ items: await listIssues() });
  } catch (error) {
    return apiError(error);
  }
}

export async function POST(request: Request) {
  try {
    return NextResponse.json(await createIssue(issueSchema.parse(await request.json()), await resolveActorId(request)), { status: 201 });
  } catch (error) {
    return apiError(error);
  }
}
