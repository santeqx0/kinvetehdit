import { useState, useEffect, useCallback } from 'react';

interface CursorPosition {
  x: number;
  y: number;
}

export const useCursor = () => {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState<boolean>(false);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isClicking, setIsClicking] = useState<boolean>(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
    

    const target = e.target as HTMLElement;
    const pointerElements = ['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'];
    
    setIsPointer(
      pointerElements.includes(target.tagName) || 
      getComputedStyle(target).cursor === 'pointer'
    );
  }, []);

  const handleMouseDown = useCallback(() => {
    setIsClicking(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsClicking(false);
  }, []);

  const handleMouseEnter = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.hasAttribute('data-hover')) {
      setIsHovering(true);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
  }, []);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    
    const hoverElements = document.querySelectorAll('[data-hover]');
    hoverElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      
      hoverElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [handleMouseMove, handleMouseDown, handleMouseUp, handleMouseEnter, handleMouseLeave]);

  return { position, isPointer, isHovering, isClicking };
};