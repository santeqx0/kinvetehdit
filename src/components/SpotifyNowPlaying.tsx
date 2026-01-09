import React from 'react';
import { motion } from 'framer-motion';
import { Music, ExternalLink } from 'lucide-react';
import { useSpotify } from '../hooks/useSpotify';

interface SpotifyNowPlayingProps {
  className?: string;
}

const SpotifyNowPlaying: React.FC<SpotifyNowPlayingProps> = ({ className }) => {
  const { spotifyData, loading, error } = useSpotify();

  if (loading) {
    return (
      <div className={`flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 ${className}`}>
        <Music size={16} className="text-green-500" />
        <span>Spotify verileri yükleniyor...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 ${className}`}>
        <Music size={16} className="text-gray-500" />
        <span>Spotify verileri alınamadı: {error}</span>
      </div>
    );
  }

  if (!spotifyData.isPlaying || !spotifyData.songName) {
    return (
      <div className={`flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 ${className}`}>
        <Music size={16} className="text-gray-500" />
        <span>Şu anda müzik çalmıyor</span>
      </div>
    );
  }

  const progressPercentage =
    spotifyData.progress_ms && spotifyData.duration_ms && spotifyData.duration_ms > 0
      ? (spotifyData.progress_ms / spotifyData.duration_ms) * 100
      : 0;

  return (
    <motion.div
      className={`flex items-center space-x-3 ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {spotifyData.albumArt ? (
        <img
          src={spotifyData.albumArt}
          alt={`${spotifyData.albumName || 'Albüm'} kapağı`}
          className="w-12 h-12 rounded-md shadow-sm"
        />
      ) : (
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-md dark:bg-slate-700/40">
          <Music size={20} className="text-green-500" />
        </div>
      )}

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <a
            href={spotifyData.songUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-gray-800 truncate dark:text-gray-200 hover:underline"
            title={spotifyData.songName}
            aria-label={`Şarkıyı Spotify'da aç: ${spotifyData.songName}`}
          >
            {spotifyData.songName}
          </a>
          {spotifyData.songUrl && (
            <a
              href={spotifyData.songUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-green-500 transition-colors hover:text-green-600 dark:hover:text-green-400"
              aria-label="Spotify'da aç"
            >
              <ExternalLink size={14} />
            </a>
          )}
        </div>
        <p className="text-xs text-gray-500 truncate dark:text-gray-400" title={spotifyData.artistName}>
          {spotifyData.artistName}
        </p>
        {typeof progressPercentage === 'number' && (
          <div
            className="w-24 h-1 bg-gray-200 dark:bg-slate-600 rounded-full mt-1.5 overflow-hidden"
            role="progressbar"
            aria-valuenow={progressPercentage}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Şarkı ilerleme çubuğu"
          >
            <motion.div
              className="h-full bg-green-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.3, ease: 'linear' }}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default SpotifyNowPlaying;