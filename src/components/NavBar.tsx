import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useAppStore } from '../store';

const NavBar: React.FC = () => {
  const { theme, setTheme, effectiveTheme } = useTheme();
  const { activeSection, setActiveSection, isMobileMenuOpen, toggleMobileMenu } = useAppStore();
  const [isScrolled, setIsScrolled] = useState(false);
  
  const sections = [
    { id: 'home', label: 'Ana Sayfa' },
    { id: 'about', label: 'Hakkımda' },
    { id: 'skills', label: 'Yeteneklerim' },
    { id: 'projects', label: 'Projelerim' },
    { id: 'contact', label: 'İletişime Geç' }
  ];
  

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  

  const toggleTheme = () => {
    setTheme(effectiveTheme === 'dark' ? 'light' : 'dark');
  };
  
  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    
    if (isMobileMenuOpen) {
      toggleMobileMenu();
    }
  };
  
  return (
    <motion.header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="container flex items-center justify-between px-4 mx-auto md:px-6">
        {/* Logo */}
        <motion.div 
          className="text-xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text"
          whileHover={{ scale: 1.05 }}
          data-hover
        >
          oxyinc.xyz
        </motion.div>
        
        {/* Desktop Navigation */}
        <nav className="items-center hidden space-x-8 md:flex">
          {sections.map((section) => (
            <motion.button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`relative px-1 py-2 transition-colors ${
                activeSection === section.id
                  ? 'text-blue-600 dark:text-blue-400 font-medium'
                  : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
              whileHover={{ scale: 1.05 }}
              data-hover
            >
              {section.label}
              {activeSection === section.id && (
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 w-full bg-blue-600 dark:bg-blue-400"
                  layoutId="activeSection"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
          
          {/* Theme Toggle */}
          <motion.button
            onClick={toggleTheme}
            className="p-2 text-gray-800 bg-gray-100 rounded-full dark:bg-slate-800 dark:text-gray-200"
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            data-hover
          >
            {effectiveTheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </motion.button>
        </nav>
        
        {/* Mobile Menu Button */}
        <motion.button
          className="p-2 text-gray-700 md:hidden dark:text-gray-300"
          onClick={toggleMobileMenu}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          data-hover
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>
      
      {/* Mobile Navigation Menu */}
      <motion.div
        className={`absolute top-full left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg md:hidden overflow-hidden ${
          isMobileMenuOpen ? 'block' : 'hidden'
        }`}
        initial={{ height: 0, opacity: 0 }}
        animate={isMobileMenuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container px-4 py-4 mx-auto">
          <nav className="flex flex-col space-y-4">
            {sections.map((section) => (
              <motion.button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`py-2 px-4 rounded-md transition-colors ${
                  activeSection === section.id
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
                data-hover
              >
                {section.label}
              </motion.button>
            ))}
            
            {/* Mobile Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="flex items-center px-4 py-2 space-x-2 rounded-md"
              whileTap={{ scale: 0.98 }}
              data-hover
            >
              {effectiveTheme === 'dark' ? (
                <>
                  <Sun size={18} />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon size={18} />
                  <span>Dark Mode</span>
                </>
              )}
            </motion.button>
          </nav>
        </div>
      </motion.div>
    </motion.header>
  );
};

export default NavBar;