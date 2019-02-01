import { useEffect } from 'react';

export default function useScroll(onScroll) {
  useEffect(() => {
    window.addEventListener('scroll', onScroll, false);

    return () => {
      window.removeEventListener('scroll', onScroll, false);
    };
  });
}
