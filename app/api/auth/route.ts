import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  if (!code) {
    // Redirect to Spotify auth
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

   if (tokens.access_token) {
  const baseUrl = new URL(req.url).origin;
  const response = NextResponse.redirect(`${baseUrl}/`);
  response.headers.set('Set-Cookie', `spotify_token=${tokens.access_token}; HttpOnly; Path=/; Max-Age=3600`);
  return response;
} 
else {
      return NextResponse.json({ error: 'Failed to get token' }, { status: 400 });
    }
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json({ error: 'Auth failed' }, { status: 500 });
  }
}
