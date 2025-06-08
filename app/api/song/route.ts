import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  let cookieHeader = req.headers.get('cookie') || '';
  let cookies = Object.fromEntries(cookieHeader.split('; ').map(c => c.split('=')));
  let spotify_token = cookies['spotify_token'];

  async function fetchSong(token: string) {
    const response = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    return { response, data };
  }

  // First try
  let { response, data } = await fetchSong(spotify_token);

  // If unauthorized, try refresh
  if (response.status === 401 && cookies['spotify_refresh']) {
    const refreshRes = await fetch(`${process.env.BASE_URL}/api/refresh-token`, {
      headers: { cookie: cookieHeader },
    });

    if (refreshRes.ok) {
      const newTokenData = await refreshRes.json();
      spotify_token = newTokenData.access_token;

      // Retry with new token
      ({ response, data } = await fetchSong(spotify_token));
    } else {
      return NextResponse.json({ error: 'Failed to refresh token' }, { status: 401 });
    }
  }

  if (response.ok && data.items?.[0]) {
    const item = data.items[0];
    const track = item.track;
    return NextResponse.json({
      id: track.id,
      name: track.name,
      played_at: item.played_at,
      artists: track.artists.map((a: any) => a.name).join(', '),
      album: track.album.name,
      image: track.album.images?.[0]?.url || null,
    });
  } else {
    return NextResponse.json({ error: 'No track found' }, { status: response.status });
  }
}