import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { articles } from '@/content/articles';

const BASE_URL = 'https://juiceme.app';
const INDEXNOW_KEY = '7f3e8b4a2c9d5e1f6a0b3c8d7e2f4a9b';

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const token = process.env.INDEXNOW_SUBMIT_TOKEN;

  if (!token || authHeader !== `Bearer ${token}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const [{ data: recipes }, { data: ingredients }] = await Promise.all([
    supabase.from('recipes').select('slug'),
    supabase.from('ingredients').select('name'),
  ]);

  const urls = [
    BASE_URL,
    `${BASE_URL}/ingredients`,
    `${BASE_URL}/boost`,
    `${BASE_URL}/articles`,
    `${BASE_URL}/about`,
    `${BASE_URL}/privacy`,
    ...(recipes || []).map((r) => `${BASE_URL}/recipe/${r.slug}`),
    ...(ingredients || []).map((i) => `${BASE_URL}/ingredients/${encodeURIComponent(i.name.toLowerCase())}`),
    ...articles.map((a) => `${BASE_URL}/articles/${a.slug}`),
  ];

  const body = {
    host: 'juiceme.app',
    key: INDEXNOW_KEY,
    keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  };

  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  return NextResponse.json({ submitted: urls.length, status: res.status });
}
