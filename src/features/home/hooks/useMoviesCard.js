import { useEffect } from "react";

const useMoviesCard = (scrollRef) => {
  const autoScrollInterval = 10000;

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const intervalId = setInterval(() => {
      const scrollStep = Math.max(scrollContainer.clientWidth * 0.8, 320);
      const maxScrollLeft =
        scrollContainer.scrollWidth - scrollContainer.clientWidth;

      if (scrollContainer.scrollLeft + scrollStep >= maxScrollLeft) {
        scrollContainer.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollContainer.scrollBy({ left: scrollStep, behavior: "smooth" });
      }
    }, autoScrollInterval);

    return () => clearInterval(intervalId);
  }, [autoScrollInterval, scrollRef]);
};

export default useMoviesCard;
