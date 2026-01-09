import { create } from 'zustand';
import { DiscordUser, SpotifyData, ThemeMode } from '../types';

interface AppState {
  discordUser: DiscordUser | null;
  setDiscordUser: (user: DiscordUser | null) => void;
  
  spotifyData: SpotifyData;
  setSpotifyData: (data: SpotifyData) => void;
  
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  
  activeSection: string;
  setActiveSection: (section: string) => void;
  
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  discordUser: null,
  setDiscordUser: (user) => set({ discordUser: user }),
  
  spotifyData: { isPlaying: false },
  setSpotifyData: (data) => set({ spotifyData: data }),
  
  theme: 'system',
  setTheme: (theme) => set({ theme }),
  
  activeSection: 'home',
  setActiveSection: (section) => set({ activeSection: section }),
  
  isMobileMenuOpen: false,
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
}));