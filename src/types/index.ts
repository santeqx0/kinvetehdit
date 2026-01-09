export interface DiscordActivity {
  type: number;
  name: string;
  details?: string | null;
  state?: string | null;
  timestamps?: {
    start?: number;
    end?: number;
  } | null;
}

export interface DiscordUser {
  username: string;
  discriminator: string;
  id: string;
  avatar: string | null;
  banner_url: string | null;
  about: string | null;
  status: string;
  activities: DiscordActivity[];
  badges: { id: string; name?: string; icon?: string }[];
}

export interface Badge {
  name: string;
  icon: string;
}

export interface Activity {
  name: string;
  type: number;
  state?: string;
  details?: string;
  timestamps?: {
    start?: number;
    end?: number;
  };
  assets?: {
    large_image?: string;
    large_text?: string;
    small_image?: string;
    small_text?: string;
  };
}

export interface SpotifyData {
  isPlaying: boolean;
  songName?: string;
  artistName?: string;
  albumName?: string;
  albumArt?: string;
  songUrl?: string;
  progress_ms?: number;
  duration_ms?: number;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  link?: string;
  github?: string;
}

export interface Skill {
  name: string;
  icon: string;
  level: number;
  category: 'frontend' | 'backend' | 'design' | 'other';
}

export type ThemeMode = 'light' | 'dark' | 'system';