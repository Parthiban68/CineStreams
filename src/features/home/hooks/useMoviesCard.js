import { useEffect } from "react";

const useMoviesCard = (scroll) => {
  const scrollRef = scroll;

  const autoScrollInterval = 10000;

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollStep = 196 * 2.5;

    const intervalId = setInterval(() => {
      if (scrollContainer) {
        const maxScrollLeft =
          scrollContainer.scrollWidth - scrollContainer.clientWidth;
        if (scrollContainer.scrollLeft + scrollStep >= maxScrollLeft) {
          scrollContainer.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollContainer.scrollBy({ left: scrollStep, behavior: "smooth" });
        }
      }
    }, autoScrollInterval);

    return () => clearInterval(intervalId);
  }, [autoScrollInterval]);
};

export default useMoviesCard;
