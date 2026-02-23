import { useState, useEffect } from 'react';
import { HERO_IMAGES } from '../constants/appData';

export default function useHeroCarousel(isActive) {
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isActive]);

  return currentHeroIndex;
}
