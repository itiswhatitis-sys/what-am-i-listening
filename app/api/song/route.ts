import { NextRequest, NextResponse } from 'next/server';
import { SpotifyRecentlyPlayed } from '@/types/spotify';

export async function GET(req: NextRequest) {
  const cookieHeader = req.headers.get('cookie') || '';
  const cookies = Object.fromEntries(cookieHeader.split('; ').map(c => c.split('=')));
  const spotify_token = cookies['spotify_token'];

  if (!spotify_token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const response = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
      headers: { 'Authorization': `Bearer ${spotify_token}` }
    });

    const data = await response.json();

    if (response.ok && data.items?.[0]) {
      return NextResponse.json(data.items[0] as SpotifyRecentlyPlayed);
    } else {
      return NextResponse.json(data, { status: response.status });
    }
  } catch (error) {
    console.error('Fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch song' }, { status: 500 });
  }
}
