import { useEffect, useRef } from 'react';

export default function useIntersectionObserver<
  T extends HTMLElement = HTMLDivElement
>(onEnter: (ratio: number) => void, rootMargin = '0px') {
  const ref = useRef<T>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onEnter(entry.intersectionRatio);
        }
      },
      {
        rootMargin,
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    const refCurrent = ref.current;
    return () => {
      if (!refCurrent) {
        return;
      }

      observer.unobserve(refCurrent);
    };
  }, [ref, rootMargin, onEnter]);

  return ref;
}
