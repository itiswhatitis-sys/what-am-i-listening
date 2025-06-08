'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Song {
  id: string;
  name: string;
  played_at: string;
  artists: string;
  album: string;
  image: string | null;
}

export default function MusicCard() {
  const [song, setSong] = useState<Song | null>(null);
  const [loading, setLoading] = useState(true);
  const [needsAuth, setNeedsAuth] = useState(false);

  useEffect(() => {
    fetchSong();
  }, []);

  const fetchSong = async () => {
    try {
      const response = await fetch('/api/song');

      if (response.ok) {
        const data: Song = await response.json();
        setSong(data);
      } else if (response.status === 401) {
        // Try to refresh token silently
        const refreshRes = await fetch('/api/refresh-token');
        if (refreshRes.ok) {
          const retry = await fetch('/api/song');
          if (retry.ok) {
            const data: Song = await retry.json();
            setSong(data);
          } else {
            setNeedsAuth(true);
          }
        } else {
          setNeedsAuth(true);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setNeedsAuth(true);
    } finally {
      setLoading(false);
    }
  };

  const getTimeSincePlay = (playedAt: string) => {
    const now = new Date();
    const played = new Date(playedAt);
    const diffInMinutes = Math.floor((now.getTime() - played.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  if (loading) {
    return (
      <section className="max-w-3xl h-[264px] sm:mx-auto mx-4 mb-6 mt-6 p-4 bg-gradient-to-r from-purple-600 to-violet-600 rounded-xl">
        <div className="bg-purple-900/70 h-[232px] backdrop-blur-md rounded-xl shadow-lg p-6 flex items-center justify-center">
          <div className="ml-3 h-10 w-10 animate-spin rounded-full border-b-2 border-t-2 border-primary ease-linear"></div>
        </div>
      </section>
    );
  }

  if (needsAuth) {
    return (
      <section className="max-w-3xl sm:mx-auto mb-6 mt-6 p-4 bg-gradient-to-r from-purple-600 to-violet-600 rounded-xl mx-4">
        <div className="bg-purple-900/70 backdrop-blur-md rounded-xl shadow-lg p-6 text-center">
          <div className="text-white mb-4">
            <h3 className="text-xl font-semibold mb-2 tracking-tighter">Authorization Failed</h3>
            <p className="opacity-70 text-md tracking-tighter">Something went wrong. Please try reconnecting your Spotify account.</p>
          </div>
          <a
            href="/api/auth"
            className="inline-block px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full font-semibold transition-colors"
          >
            Connect Spotify
          </a>
        </div>
      </section>
    );
  }

  if (!song) {
    return (
      <section className="max-w-3xl sm:mx-auto mt-6 p-4 bg-gradient-to-r from-purple-600 to-violet-600 rounded-xl mx-4">
        <div className="bg-purple-900/70 backdrop-blur-md rounded-xl shadow-lg p-6 text-center">
          <div className="text-white">
            <h3 className="text-xl font-semibold mb-2 tracking-tighter">No Recent Songs</h3>
            <p className="opacity-70 text-md tracking-tighter">Play some music on Spotify to see it here!</p>
            <button
              onClick={fetchSong}
              className="mt-4 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-full text-sm transition-colors"
            >
              Refresh
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-3xl  sm:mx-auto mt-6 mb-2 p-4  bg-gradient-to-r from-purple-600 to-violet-600 rounded-xl mx-4 ">
      <div className="bg-purple-900/70 backdrop-blur-md rounded-xl shadow-lg p-6 grid sm:grid-cols-12 grid-cols-1 gap-4">
        <img
          src={song.image || '/album.jpg'}
          alt={`${song.album} cover`}
          className="sm:col-span-4 rounded-md object-cover"
        />
        <div className="sm:col-span-8 mt-2 text-white">
          <p className="text-md tracking-tight">{song.album}</p>
          <p className="text-sm opacity-70 tracking-tight">{song.artists}</p>
          <h3 className="text-xl tracking-tighter font-semibold mt-4">{song.name}</h3>

          <div className="w-full h-1 bg-white/30 mt-2 rounded-full">
            <div className="h-1 bg-white w-full rounded-full"></div>
          </div>
          <div className="flex justify-between text-xs opacity-50 mt-1">
            <span>Played</span>
            <span>{getTimeSincePlay(song.played_at)}</span>
          </div>

          <div className="flex justify-between items-center mt-4 text-xl">
           <button
            onClick={() => window.location.reload()}
            className="hover:scale-110 transition-transform"
            title="Refresh"
          >
            ⟲ 
          </button>
            <button className="opacity-50 cursor-not-allowed">⏮</button>
            <a
            href={`https://open.spotify.com/track/${song.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white hover:bg-gray-300 text-black shadow-inner transition-colors rounded-full w-10 h-10 pl-1 flex items-center justify-center"
            title="Open in Spotify"
          >     
          ▶
          </a>
            <button className="opacity-50 cursor-not-allowed">⏭</button>
            <button className="opacity-50 cursor-not-allowed"></button>
          </div>
        </div>
      </div>
    </section>
  );
}
