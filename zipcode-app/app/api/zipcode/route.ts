import { NextResponse } from 'next/server';
import zipCodeData from '../../../public/zipcode-data.json';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: '検索クエリが必要です' }, { status: 400 });
  }

  if (query.length < 3) {
    return NextResponse.json({ error: '検索クエリは3文字以上必要です' }, { status: 400 });
  }

  const results = zipCodeData.filter((item: any) =>
    item.zipCode.startsWith(query)
  ).slice(0, 5);

  return NextResponse.json({ results });
} 
