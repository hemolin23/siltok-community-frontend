import { NextResponse } from 'next/server';
import { z } from 'zod';
import { apiError } from '@/lib/http';
import { createProject, listProjects } from '@/lib/records';

const projectSchema = z.object({
  title: z.string().trim().min(2).max(80),
  scenario: z.string().trim().min(1).max(30),
  summary: z.string().trim().min(10).max(1200),
  currentSolution: z.string().trim().max(500).optional(),
  goal: z.string().trim().max(500).optional(),
  visibility: z.enum(['private', 'team', 'beta', 'public']).default('private'),
});

export async function GET() {
  try {
    return NextResponse.json({ items: await listProjects() });
  } catch (error) {
    return apiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const input = projectSchema.parse(await request.json());
    return NextResponse.json(await createProject(input), { status: 201 });
  } catch (error) {
    return apiError(error);
  }
}
