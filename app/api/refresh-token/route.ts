import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const cookieHeader = req.headers.get('cookie') || '';
  const cookies = Object.fromEntries(cookieHeader.split('; ').map(c => c.split('=')));
  const refreshToken = cookies['spotify_refresh'];

  if (!refreshToken) {
    return NextResponse.json({ error: 'No refresh token' }, { status: 401 });
  }

  try {
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
    });

    const tokens = await tokenResponse.json();

    if (tokens.access_token) {
      const response = NextResponse.json({ access_token: tokens.access_token });
      response.headers.append(
        'Set-Cookie',
        `spotify_token=${tokens.access_token}; HttpOnly; Path=/; Max-Age=3600`
      );
      return response;
    } else {
      return NextResponse.json({ error: 'Failed to refresh token' }, { status: 400 });
    }
  } catch (error) {
    console.error('Refresh error:', error);
    return NextResponse.json({ error: 'Refresh failed' }, { status: 500 });
  }
}