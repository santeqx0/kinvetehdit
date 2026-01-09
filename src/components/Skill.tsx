import React from 'react';
import { motion } from 'framer-motion';

interface SkillProps {
  name: string;
  level: number;
  icon: string;
}

const Skill: React.FC<SkillProps> = ({ name, level, icon }) => {
  return (
    <motion.div
      className="flex flex-col items-center p-4 rounded-lg bg-white dark:bg-slate-800 shadow-md hover:shadow-lg transition-shadow duration-300"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
      data-hover
    >
      <div className="w-14 h-14 flex items-center justify-center mb-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
        <img src={icon} alt={name} className="w-8 h-8" />
      </div>
      
      <h3 className="font-medium text-gray-900 dark:text-white mb-2">{name}</h3>
      
      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        />
      </div>
      
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
        {level < 33 ? 'Beginner' : level < 66 ? 'Intermediate' : 'Advanced'}
      </p>
    </motion.div>
  );
};

export default Skill;