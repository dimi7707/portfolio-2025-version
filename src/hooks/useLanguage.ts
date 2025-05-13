import { useState, useEffect } from 'react';

export const useLanguage = () => {
  const [language, setLanguage] = useState<'en' | 'es'>(() => {
    const path = document.location.pathname;
    return path.includes('/es') ? 'es' : 'en';
  });

  const toggleLanguage = () => {
    const currentPath = document.location.pathname;
    const newPath = currentPath.replace(
      language === 'en' ? '/en' : '/es',
      language === 'en' ? '/es' : '/en'
    );
    document.location.href = newPath;
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  useEffect(() => {
    const path = document.location.pathname;
    const newLanguage = path.includes('/es') ? 'es' : 'en';
    if (newLanguage !== language) {
      setLanguage(newLanguage);
    }
  }, [document.location.pathname]);

  return {
    language,
    toggleLanguage,
    isEnglish: language === 'en',
    isSpanish: language === 'es'
  };
}; 