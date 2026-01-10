import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Instagram, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-10 bg-gray-100 dark:bg-slate-900/80">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center">
          {/* Logo and Links */}
          <div className="flex flex-col items-center justify-between w-full mb-8 md:flex-row">
            <motion.div 
              className="mb-6 text-xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text md:mb-0"
              whileHover={{ scale: 1.05 }}
              data-hover
            >
              kinvetehdit.com
            </motion.div>
            
            <div className="flex flex-wrap justify-center gap-6">
              <motion.a 
                href="#home" 
                className="text-gray-700 transition-colors dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                whileHover={{ y: -2 }}
                data-hover
              >
                Ana Sayfa
              </motion.a>
              <motion.a 
                href="#about" 
                className="text-gray-700 transition-colors dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                whileHover={{ y: -2 }}
                data-hover
              >
                Hakkımda
              </motion.a>
              <motion.a 
                href="#skills" 
                className="text-gray-700 transition-colors dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                whileHover={{ y: -2 }}
                data-hover
              >
                Yeteneklerim
              </motion.a>
              <motion.a 
                href="#projects" 
                className="text-gray-700 transition-colors dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                whileHover={{ y: -2 }}
                data-hover
              >
                Projelerim
              </motion.a>
              <motion.a 
                href="#contact" 
                className="text-gray-700 transition-colors dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                whileHover={{ y: -2 }}
                data-hover
              >
                İletişime Geç
              </motion.a>
            </div>
          </div>
          
          {/* Divider */}
          <div className="w-full h-px mb-8 bg-gray-200 dark:bg-gray-800"></div>
          
          {/* Social Links and Copyright */}
          <div className="flex flex-col items-center justify-between w-full md:flex-row">
            <div className="flex mb-4 space-x-4 md:mb-0">
              <motion.a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 text-gray-700 transition-colors bg-gray-200 rounded-full dark:bg-slate-800 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
                data-hover
              >
                <Github size={20} />
              </motion.a>
              
              <motion.a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 text-gray-700 transition-colors bg-gray-200 rounded-full dark:bg-slate-800 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
                data-hover
              >
                <Twitter size={20} />
              </motion.a>
              
              <motion.a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 text-gray-700 transition-colors bg-gray-200 rounded-full dark:bg-slate-800 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
                data-hover
              >
                <Instagram size={20} />
              </motion.a>
            </div>
            
            <p className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              &copy; {currentYear} Sante. Made with 
              <Heart size={14} className="mx-1 text-red-500" />
              All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;