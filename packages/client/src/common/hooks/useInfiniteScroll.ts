import { useEffect } from 'react';

export default function useInfiniteScroll(onBottomReached) {
  const onScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      onBottomReached();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll, false);

    return () => {
      window.removeEventListener('scroll', onScroll, false);
    };
  });
}
