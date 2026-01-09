import React from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../store';

interface DiscordStatusProps {
  className?: string;
}

const DiscordStatus: React.FC<DiscordStatusProps> = ({ className }) => {
  const discordUser = useAppStore((state) => state.discordUser);

  if (!discordUser) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <div className="w-3 h-3 bg-gray-300 rounded-full dark:bg-gray-700 animate-pulse"></div>
        <span className="text-sm text-gray-500 dark:text-gray-400">Discord durumu yükleniyor...</span>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'idle':
        return 'bg-yellow-500';
      case 'dnd':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'online':
        return 'Çevrimiçi';
      case 'idle':
        return 'Boşta';
      case 'dnd':
        return 'Rahatsız Etmeyin';
      default:
        return 'Çevrimdışı';
    }
  };

  const getCurrentActivity = () => {
    if (discordUser.activities && discordUser.activities.length > 0) {
      const activity = discordUser.activities.find((a) => a.type !== 2 && a.type !== 4); 
      if (!activity) return null;

      if (activity.type === 0) {
        return `${activity.name} oynuyor`;
      } else if (activity.type === 1) {
        return `${activity.name} yayınlıyor`;
      } else if (activity.type === 3) {
        return `${activity.name} izliyor`;
      } else if (activity.type === 5) {
        return `${activity.name} yarışıyor`;
      }
    }
    return null;
  };

  const activityText = getCurrentActivity();
  const statusText = activityText || getStatusLabel(discordUser.status || 'offline'); 

  return (
    <motion.div
      className={`flex flex-col ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center space-x-3">
        {discordUser.avatar ? (
          <img
            src={`https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png?size=80`}
            alt={discordUser.username}
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <div className="flex items-center justify-center w-10 h-10 bg-gray-300 rounded-full dark:bg-gray-700">
            <span className="text-lg font-medium text-gray-500 dark:text-gray-400">
              {(discordUser.username || 'U').charAt(0)}
            </span>
          </div>
        )}

        <div>
          <div className="flex items-center space-x-2">
            <p className="font-medium text-gray-900 dark:text-white">{discordUser.username || 'Bilinmeyen Kullanıcı'}</p>
            <div className="flex items-center space-x-1">
              <div className={`w-2.5 h-2.5 rounded-full ${getStatusColor(discordUser.status || 'offline')}`}></div>
            </div>
          </div>
          <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">{statusText}</div>
        </div>
      </div>
    </motion.div>
  );
};

export default DiscordStatus;