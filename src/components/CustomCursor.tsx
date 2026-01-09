import React from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '../hooks/useCursor';

const CustomCursor: React.FC = () => {
  const { position, isPointer, isHovering, isClicking } = useCursor();

  return (
    <>
      {/* Main Cursor */}
      <motion.div
        className="fixed top-0 left-0 z-50 w-6 h-6 rounded-full pointer-events-none"
        style={{
          background: isClicking
            ? 'radial-gradient(circle, rgba(59, 130, 246, 0.8) 20%, rgba(59, 130, 246, 0.4) 80%)'
            : 'radial-gradient(circle, rgba(59, 130, 246, 0.6) 20%, rgba(59, 130, 246, 0.2) 80%)',
          boxShadow: isHovering
            ? '0 0 15px rgba(59, 130, 246, 0.5)'
            : '0 0 10px rgba(59, 130, 246, 0.3)',
          x: position.x - 12,
          y: position.y - 12,
        }}
        animate={{
          scale: isHovering ? 1.8 : isPointer ? 1.3 : 1,
          opacity: 1,
        }}
        transition={{
          scale: { type: 'spring', stiffness: 400, damping: 25 },
          opacity: { duration: 0.2 },
          boxShadow: { duration: 0.3 },
        }}
      />

      {/* Trailing Effect */}
      <motion.div
        className="fixed top-0 left-0 z-50 w-12 h-12 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(147, 197, 253, 0.3) 10%, rgba(147, 197, 253, 0) 70%)',
          x: position.x - 24,
          y: position.y - 24,
        }}
        animate={{
          scale: isHovering ? 2.5 : isPointer ? 1.8 : 1.2,
          opacity: isClicking ? 0.5 : isHovering ? 0.7 : 0.4,
        }}
        transition={{
          type: 'spring',
          stiffness: 120,
          damping: 20,
          mass: 0.6,
          opacity: { duration: 0.3 },
        }}
      />

      {/* Center Precision Dot */}
      <motion.div
        className="fixed top-0 left-0 z-50 w-1.5 h-1.5 rounded-full pointer-events-none"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          boxShadow: '0 0 5px rgba(59, 130, 246, 0.5)',
          x: position.x - 0.75,
          y: position.y - 0.75,
        }}
        animate={{
          opacity: isPointer ? 0 : isHovering ? 0.8 : 1,
          scale: isClicking ? 1.5 : 1,
        }}
        transition={{
          opacity: { duration: 0.2 },
          scale: { type: 'spring', stiffness: 500, damping: 30 },
        }}
      />
    </>
  );
};

export default CustomCursor;