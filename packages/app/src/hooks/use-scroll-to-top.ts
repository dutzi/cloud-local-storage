import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function useScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      return;
    }

    window.scrollTo({ top: 0 });
  }, [location]);
}
