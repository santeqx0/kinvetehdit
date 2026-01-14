import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useTheme } from './hooks/useTheme';
import { useLanyard } from './hooks/useLanyard';
import { useSpotify } from './hooks/useSpotify';
import { useAppStore } from './store';


import CustomCursor from './components/CustomCursor';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Callback from './components/Callback';


import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';

const MainPage: React.FC = () => {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

function App() {
  const { effectiveTheme } = useTheme();
  const { discordUser, loading: discordLoading, error: discordError } = useLanyard();
  const { spotifyData } = useSpotify();
  const setDiscordUser = useAppStore((state) => state.setDiscordUser);
  const setSpotifyData = useAppStore((state) => state.setSpotifyData);

  // Store zaten hook içinde güncelleniyor, burada gereksiz

  // Log Discord errors for debugging
  useEffect(() => {
    if (discordError) {
      console.error("Discord Error:", discordError);
    }
  }, [discordError]);

  // Update global state with Spotify data
  useEffect(() => {
    if (spotifyData) {
      setSpotifyData(spotifyData);
    }
  }, [spotifyData, setSpotifyData]);

  // Set theme class on the document
  useEffect(() => {
    document.documentElement.classList.toggle('dark', effectiveTheme === 'dark');
  }, [effectiveTheme]);

  return (
    <div className="min-h-screen text-gray-900 transition-colors duration-300 bg-white dark:bg-slate-900 dark:text-white">
      {/* Custom Cursor (only on non-touch devices) */}
      <div className="hidden md:block">
        <CustomCursor />
      </div>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;