import { useState, useEffect } from 'react';
import { SpotifyData } from '../types';
import { useAppStore } from '../store';

export const useSpotify = () => {
  const discordUser = useAppStore((state) => state.discordUser);
  const [spotifyData, setSpotifyData] = useState<SpotifyData>({ isPlaying: false });

  // Discord aktivitelerinden Spotify bilgisini çıkar - HEMEN güncelle
  useEffect(() => {
    if (!discordUser || !discordUser.activities) {
      setSpotifyData({ isPlaying: false });
      return;
    }

    // Type 2 = Listening (Spotify aktivitesi)
    const spotifyActivity = discordUser.activities.find((activity) => activity.type === 2 && activity.name === 'Spotify');

    if (!spotifyActivity) {
      setSpotifyData({ isPlaying: false });
      return;
    }

    // Spotify aktivitesinden bilgileri çıkar
    const songName = spotifyActivity.details || 'Bilinmeyen Şarkı';
    const artistName = spotifyActivity.state || 'Bilinmeyen Sanatçı';
    const albumName = spotifyActivity.assets?.large_text || undefined;
    
    // Albüm kapağı URL'sini oluştur
    let albumArt: string | undefined;
    if (spotifyActivity.assets?.large_image) {
      const imageId = spotifyActivity.assets.large_image;
      // Eğer imageId zaten URL ise direkt kullan
      if (imageId.startsWith('http')) {
        albumArt = imageId;
      } else if (imageId.startsWith('spotify:')) {
        // spotify: ile başlıyorsa Spotify CDN'den al
        const cleanImageId = imageId.replace('spotify:', '');
        albumArt = `https://i.scdn.co/image/${cleanImageId}`;
      } else {
        // Discord CDN'den al (Spotify application_id: 463097721130377216)
        albumArt = `https://cdn.discordapp.com/app-assets/463097721130377216/${imageId}.png`;
      }
    }

    // İlerleme hesaplama (timestamps varsa)
    let progress_ms: number | undefined;
    let duration_ms: number | undefined;
    if (spotifyActivity.timestamps?.start) {
      const startTime = spotifyActivity.timestamps.start;
      const currentTime = Date.now();
      // timestamps zaten milisaniye cinsinden
      progress_ms = currentTime - startTime;
      
      // Eğer end timestamp varsa süreyi hesapla
      if (spotifyActivity.timestamps.end) {
        duration_ms = spotifyActivity.timestamps.end - startTime;
      }
    }

    // Spotify URL oluştur (sync_id varsa direkt track URL'i)
    let songUrl: string | undefined;
    if (spotifyActivity.sync_id) {
      // sync_id Spotify track ID'sidir
      songUrl = `https://open.spotify.com/track/${spotifyActivity.sync_id}`;
    } else if (songName && artistName) {
      // sync_id yoksa search URL oluştur
      const searchQuery = encodeURIComponent(`${songName} ${artistName}`);
      songUrl = `https://open.spotify.com/search/${searchQuery}`;
    }

    setSpotifyData({
      isPlaying: true,
      songName,
      artistName,
      albumName: spotifyActivity.assets?.large_text || undefined,
      albumArt,
      songUrl,
      progress_ms,
      duration_ms,
    });
  }, [discordUser]);

  return { spotifyData, loading: false, error: null };
};