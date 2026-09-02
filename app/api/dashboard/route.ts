import { NextResponse } from 'next/server';
import { apiError } from '@/lib/http';
import { getDashboard } from '@/lib/records';

export async function GET() {
  try {
    return NextResponse.json(await getDashboard());
  } catch (error) {
    return apiError(error);
  }
}
