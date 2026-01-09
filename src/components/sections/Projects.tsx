import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../../store';
import ProjectCard from '../ProjectCard';
import { Project } from '../../types';

const projects: Project[] = [
  {
    id: 1,
    title: 'E-Ticaret Platformu',
    description: 'Ürün listeleri, alışveriş sepeti ve ödeme işlevselliği ile tam özellikli bir e-ticaret platformu.',
    tags: ['React', 'Node.js', 'MongoDB', 'Express'],
    image: 'https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    github: 'https://github.com/hasbutcu',
    link: 'https://oxyinc.xyz'
  },
  {
    id: 2,
    title: 'Görev Yönetim Uygulaması',
    description: 'Gerçek zamanlı güncellemelerle görevleri, projeleri ve ekip işbirliğini yönetmek için bir üretkenlik uygulaması.',
    tags: ['React', 'TypeScript', 'Firebase', 'Tailwind'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyicNHJ0GT4efJIGeevQktZ18L_Q0FzRlesg&s',
    github: 'https://github.com/hasbutcu',
    link: 'https://oxyinc.xyz'
  },
  {
    id: 3,
    title: 'Hava Durumu Panosu',
    description: 'Dünya çapındaki konumlar için mevcut koşulları ve tahminleri sağlayan etkileşimli bir hava durumu panosu.',
    tags: ['JavaScript', 'API Integration', 'CSS'],
    image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    github: 'https://github.com/hasbutcu',
    link: 'https://oxyinc.xyz'
  },
  {
    id: 4,
    title: 'Sosyal Medya Platformu',
    description: 'Kullanıcı profilleri, gönderiler, yorumlar ve gerçek zamanlı mesajlaşma ile bir sosyal ağ platformu.',
    tags: ['React', 'Next.js', 'PostgreSQL', 'WebSockets'],
    image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    github: 'https://github.com/hasbutcu',
    link: 'https://oxyinc.xyz'
  },
  {
    id: 5,
    title: 'Fitness Takipçisi',
    description: 'Antrenmanları, ilerlemeyi ve sağlık metriklerini veri görselleştirme ile takip etmek için bir uygulama.',
    tags: ['React Native', 'TypeScript', 'GraphQL'],
    image: 'https://images.pexels.com/photos/3622517/pexels-photo-3622517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    github: 'https://github.com/hasbutcu',
    link: 'https://oxyinc.xyz'
  },
  {
    id: 6,
    title: 'Film Veritabanı',
    description: 'İncelemeler, derecelendirmeler ve önerilerle filmler ve TV şovları için kapsamlı bir veritabanı.',
    tags: ['React', 'Redux', 'API Integration'],
    image: 'https://images.pexels.com/photos/918281/pexels-photo-918281.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    github: 'https://github.com/hasbutcu',
    link: 'https://oxyinc.xyz'
  }
];

const Projects: React.FC = () => {
  const setActiveSection = useAppStore((state) => state.setActiveSection);
  const containerRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<string>('all');
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection('projects');
        }
      },
      { threshold: 0.2 }
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
  
  const allTags = [...new Set(projects.flatMap(project => project.tags))];
  
  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(project => project.tags.includes(filter));
  
  return (
    <section id="projects" ref={containerRef} className="py-20 bg-gray-50 dark:bg-slate-900/50">
      <div className="container px-4 mx-auto">
        <motion.div 
          className="max-w-3xl mx-auto mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">Projeler</h2>
          <div className="w-20 h-1 mx-auto mb-6 bg-blue-600 rounded-full"></div>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            İşte bazı son projelerim. Her biri belirli bir sorunu çözmek veya yeni teknolojileri keşfetmek için oluşturuldu.
          </p>
        </motion.div>
        
        <motion.div 
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
            }`}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            data-hover
          >
            Tümü
          </motion.button>
          
          {allTags.map((tag, index) => (
            <motion.button
              key={index}
              onClick={() => setFilter(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === tag
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              data-hover
            >
              {tag}
            </motion.button>
          ))}
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
