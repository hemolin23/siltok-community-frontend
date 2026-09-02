import { NextResponse } from 'next/server';
import { z } from 'zod';
import { apiError } from '@/lib/http';
import { createWorkflow, listWorkflows } from '@/lib/records';
import { resolveActorId } from '@/lib/auth';

const workflowSchema = z.object({
  title: z.string().trim().min(2).max(100),
  scenario: z.string().trim().min(1).max(30),
  modelName: z.string().trim().min(1).max(80),
  hardwareSku: z.string().trim().max(50).optional(),
  projectId: z.string().trim().max(100).optional(),
  quantization: z.string().trim().max(30).optional(),
  parametersJson: z.string().trim().max(12000).optional(),
  changelog: z.string().trim().max(800).optional(),
  visibility: z.enum(['private', 'team', 'beta', 'public']).default('private'),
});

export async function GET() {
  try {
    return NextResponse.json({ items: await listWorkflows() });
  } catch (error) {
    return apiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const input = workflowSchema.parse(await request.json());
    if (input.parametersJson) JSON.parse(input.parametersJson);
    return NextResponse.json(await createWorkflow(input, await resolveActorId(request)), { status: 201 });
  } catch (error) {
    return apiError(error);
  }
}
