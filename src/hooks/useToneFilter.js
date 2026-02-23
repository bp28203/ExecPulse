import { useMemo } from 'react';
import { TONE_CONFIG } from '../constants/appData';

export default function useToneFilter(activeCategory, searchQuery) {
  const filteredTones = useMemo(() => {
    return Object.entries(TONE_CONFIG).filter(([name, config]) => {
      const matchesCategory = activeCategory === "All" || config.category === activeCategory;
      const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return filteredTones;
}
