import { useEffect, useState, RefObject } from "react";

export const useInViewObserver = (
  ref: RefObject<HTMLElement | null>,
  options?: IntersectionObserverInit
): boolean => {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const target = ref.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.3,
        ...options,
      }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return inView;
};
