"use client";
import { useState, useEffect } from 'react';

// Types
interface SpotifyImage {
  url: string;
  height: number;
  width: number;
}

interface SpotifyArtist {
  id: string;
  name: string;
  external_urls: {
    spotify: string;
  };
}

interface SpotifyAlbum {
  id: string;
  name: string;
  images: SpotifyImage[];
  external_urls: {
    spotify: string;
  };
}

interface SpotifyTrack {
  id: string;
  name: string;
  artists: SpotifyArtist[];
  album: SpotifyAlbum;
  duration_ms: number;
  external_urls: {
    spotify: string;
  };
}

interface SpotifyRecentlyPlayed {
  track: SpotifyTrack;
  played_at: string;
}

export default function MusicCard() {
  const [song, setSong] = useState<SpotifyRecentlyPlayed | null>(null);
  const [loading, setLoading] = useState(true);
  const [needsAuth, setNeedsAuth] = useState(false);

  useEffect(() => {
    fetchSong();
  }, []);

  const fetchSong = async () => {
    try {
      const response = await fetch('/api/song');
      
      if (response.status === 401) {
        setNeedsAuth(true);
        setLoading(false);
        return;
      }
      
      if (response.ok) {
        const data: SpotifyRecentlyPlayed = await response.json();
        setSong(data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
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
      <section className="max-w-3xl mx-auto mt-6 p-4 bg-gradient-to-r from-purple-600 to-violet-600 rounded-xl">
        <div className="bg-gradient-to-r bg-purple-900/70 to-violet-900/70 backdrop-blur-md rounded-xl shadow-lg p-6 flex items-center justify-center">
          <div className="text-white text-lg">Loading your last played song...</div>
        </div>
      </section>
    );
  }

  if (needsAuth) {
    return (
      <section className="max-w-3xl mx-auto mt-6 p-4 bg-gradient-to-r from-purple-600 to-violet-600 rounded-xl">
        <div className="bg-gradient-to-r bg-purple-900/70 to-violet-900/70 backdrop-blur-md rounded-xl shadow-lg p-6 text-center">
          <div className="text-white mb-4">
            <h3 className="text-xl font-semibold mb-2"> Connect Spotify</h3>
            <p className="opacity-70">Connect your account to see your last played song</p>
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
      <section className="max-w-3xl mx-auto mt-6 p-4 bg-gradient-to-r from-purple-600 to-violet-600 rounded-xl">
        <div className="bg-gradient-to-r bg-purple-900/70 to-violet-900/70 backdrop-blur-md rounded-xl shadow-lg p-6 text-center">
          <div className="text-white">
            <h3 className="text-xl font-semibold mb-2">No Recent Songs</h3>
            <p className="opacity-70">Play some music on Spotify to see it here!</p>
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

  const track = song.track;
  const albumImage = track.album.images[0]?.url || '/album.jpg';

  return (
    <section className="max-w-3xl mx-auto mt-6 p-4 bg-gradient-to-r from-purple-600 to-violet-600 rounded-xl">
      <div className="bg-gradient-to-r bg-purple-900/70 to-violet-900/70 backdrop-blur-md rounded-xl shadow-lg p-6 flex gap-4">
        
        {/* Album Cover */}
        <img
          src={albumImage}
          alt={`${track.album.name} cover`}
          className="w-48 h-48 rounded-md object-cover"
        />

        {/* Song Info + Controls */}
        <div className="flex-1 text-white">
          <p className=" text-md  tracking-tight">{track.album.name}</p>
          <p className="text-sm opacity-70 tracking-tight">
            {track.artists.map(artist => artist.name).join(', ')}
          </p>
          <h3 className="text-xl tracking-tighter font-semibold mt-4">{track.name}</h3>

          {/* Progress Bar (Static for last played) */}
          <div className="w-full h-1 bg-white/30 mt-2 rounded-full">
            <div className="h-1 bg-white w-full rounded-full"></div>
          </div>
          <div className="flex justify-between text-xs opacity-50 mt-1">
            <span>{formatDuration(track.duration_ms)}</span>
            <span>{getTimeSincePlay(song.played_at)}</span>
          </div>

          {/* Controls */}
          <div className="flex justify-between items-center mt-4 text-xl">
            <button 
              onClick={fetchSong}
              className="hover:scale-110 transition-transform"
              title="Refresh"
            >
              ⟲
            </button>
            <button className="opacity-50 cursor-not-allowed">⏮</button>
            <a
              href={track.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 rounded-full p-2 shadow-inner transition-colors"
              title="Open in Spotify"
            >
              🎵
            </a>
            <button className="opacity-50 cursor-not-allowed">⏭</button>
            <button className="opacity-50 cursor-not-allowed"></button>
          </div>
        </div>
      </div>
    </section>
  );
}