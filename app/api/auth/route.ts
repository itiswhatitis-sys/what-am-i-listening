import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  if (!code) {
    // Redirect to Spotify auth with offline_access scope for refresh token
    const scopes = 'user-read-recently-played';
    const redirectUri = process.env.SPOTIFY_REDIRECT_URI!;

    const authUrl = new URL('https://accounts.spotify.com/authorize');
    authUrl.searchParams.set('client_id', process.env.SPOTIFY_CLIENT_ID!);
    authUrl.searchParams.set('response_type', 'code');
    authUrl.searchParams.set('redirect_uri', redirectUri);
    authUrl.searchParams.set('scope', scopes);

    return NextResponse.redirect(authUrl.toString());
  }

  try {
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI!
      })
    });

    const tokens = await tokenResponse.json();

    if (tokens.access_token && tokens.refresh_token) {
      const baseUrl = process.env.BASE_URL!;
      const response = NextResponse.redirect(`${baseUrl}/`);

      // Set access token cookie (expires in 1 hour)
      response.headers.append(
        'Set-Cookie',
        `spotify_token=${tokens.access_token}; HttpOnly; Path=/; Max-Age=3600; SameSite=Lax`
      );

      // Set refresh token cookie (expires in 30 days or more, adjust as needed)
      response.headers.append(
        'Set-Cookie',
        `refresh_token=${tokens.refresh_token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 30}; SameSite=Lax`
      );

      return response;
    } else {
      return NextResponse.json({ error: 'Failed to get tokens' }, { status: 400 });
    }
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json({ error: 'Auth failed' }, { status: 500 });
  }
}
