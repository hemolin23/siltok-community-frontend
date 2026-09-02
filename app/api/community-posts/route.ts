import { NextResponse } from 'next/server';
import { listCommunityPosts } from '@/lib/records';
import { apiError } from '@/lib/http';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const limit = Number(url.searchParams.get('limit') ?? 60);
    return NextResponse.json({ posts: await listCommunityPosts(limit) });
  } catch (error) {
    return apiError(error);
  }
}
