import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../../store';
import Skill from '../Skill';

const skills = [
  {
    name: 'React',
    level: 90,
    category: 'frontend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  },
  {
    name: 'TypeScript',
    level: 85,
    category: 'frontend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  },
  {
    name: 'JavaScript',
    level: 95,
    category: 'frontend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  },
  {
    name: 'TailwindCSS',
    level: 90,
    category: 'frontend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg',
  },
  {
    name: 'Next.js',
    level: 85,
    category: 'frontend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
  },
  {
    name: 'Node.js',
    level: 80,
    category: 'backend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  },
  {
    name: 'Express',
    level: 75,
    category: 'backend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
  },
  {
    name: 'MongoDB',
    level: 70,
    category: 'backend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
  },
  {
    name: 'PostgreSQL',
    level: 65,
    category: 'backend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  },
  {
    name: 'Figma',
    level: 75,
    category: 'design',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
  },
  {
    name: 'Docker',
    level: 60,
    category: 'other',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  },
  {
    name: 'Git',
    level: 85,
    category: 'other',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
  },
];

const Skills: React.FC = () => {
  const setActiveSection = useAppStore((state) => state.setActiveSection);
  const containerRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = React.useState<string>('all');
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection('skills');
        }
      },
      { threshold: 0.5 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [setActiveSection]);
  
  const filteredSkills = filter === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === filter);
  
  return (
    <section id="skills" ref={containerRef} className="py-20 bg-white dark:bg-slate-900">
      <div className="container px-4 mx-auto">
        <motion.div 
          className="max-w-3xl mx-auto mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">Beceriler ve Uzmanlıklar</h2>
          <div className="w-20 h-1 mx-auto mb-6 bg-blue-600 rounded-full"></div>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Fikirleri hayata geçirmek için çalıştığım bazı teknoloji ve araçlar burada.
          </p>
        </motion.div>
        
        {/* Filter buttons */}
        <motion.div 
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {['all', 'frontend', 'backend', 'design', 'other'].map((category) => (
            <motion.button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              data-hover
            >
              {category === 'all' ? 'Tümü' : category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </motion.div>
        
        {/* Skills grid */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
          {filteredSkills.map((skill, index) => (
            <Skill
              key={index}
              name={skill.name}
              level={skill.level}
              icon={skill.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;