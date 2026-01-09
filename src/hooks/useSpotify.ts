import { useState, useEffect } from 'react';
import axios from 'axios';
import { SpotifyData } from '../types';

export const useSpotify = () => {
  const [spotifyData, setSpotifyData] = useState<SpotifyData>({ isPlaying: false });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);


  const CLIENT_ID = import.meta.env.VITE_spotify_client_id;
  const CLIENT_SECRET = import.meta.env.VITE_spotify_client_secret;
  const REFRESH_TOKEN = import.meta.env.VITE_spotify_refresh_token;
  const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
  const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';

  const getAccessToken = async () => {
    try {
      const formData = new URLSearchParams();
      formData.append('grant_type', 'refresh_token');
      formData.append('refresh_token', REFRESH_TOKEN);
      formData.append('client_id', CLIENT_ID);
      formData.append('client_secret', CLIENT_SECRET);

      const response = await axios.post(
        TOKEN_ENDPOINT,
        formData.toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      const { access_token } = response.data;
      setAccessToken(access_token);
      localStorage.setItem('spotify_access_token', access_token);
      localStorage.setItem('spotify_refresh_token', REFRESH_TOKEN); 
      return access_token;
    } catch (err) {
      setError('Failed to fetch Spotify access token');
      console.error('Error fetching Spotify token:', err);
      return null;
    }
  };

  const fetchCurrentlyPlaying = async (token: string) => {
    try {
      const response = await axios({
        method: 'get',
        url: NOW_PLAYING_ENDPOINT,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 204) {
        setSpotifyData({ isPlaying: false });
        return;
      }

      const data = response.data;

      if (data && data.is_playing) {
        setSpotifyData({
          isPlaying: true,
          songName: data.item.name,
          artistName: data.item.artists.map((artist: any) => artist.name).join(', '),
          albumName: data.item.album.name,
          albumArt: data.item.album.images[0]?.url,
          songUrl: data.item.external_urls.spotify,
          progress_ms: data.progress_ms,
          duration_ms: data.item.duration_ms,
        });
      } else {
        setSpotifyData({ isPlaying: false });
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        const newToken = await getAccessToken();
        if (newToken) {
          fetchCurrentlyPlaying(newToken);
        }
      } else {
        setError('Failed to fetch currently playing track');
        console.error('Error fetching Spotify data:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      const storedToken = localStorage.getItem('spotify_access_token');

      if (storedToken) {
        setAccessToken(storedToken);
        fetchCurrentlyPlaying(storedToken);
      } else {
        const newToken = await getAccessToken();
        if (newToken) {
          fetchCurrentlyPlaying(newToken);
        }
      }
    };

    initialize();

    const interval = setInterval(async () => {
      if (accessToken) {
        fetchCurrentlyPlaying(accessToken);
      } else {
        const storedToken = localStorage.getItem('spotify_access_token');
        if (storedToken) {
          setAccessToken(storedToken);
          fetchCurrentlyPlaying(storedToken);
        } else {
          const newToken = await getAccessToken();
          if (newToken) {
            fetchCurrentlyPlaying(newToken);
          }
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [accessToken]);

  return { spotifyData, loading, error };
};