import React, { useRef } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import HomeMediaCard from "./HomeMediaCard";

const getMediaKey = (item) => `${item.media_type}-${item.id}`;

const HomeMediaRow = ({ section }) => {
  const scrollRef = useRef(null);

  if (!section?.items?.length) return null;

  const scrollRow = (direction) => {
    const container = scrollRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    container.scrollBy({
      left: direction * Math.max(container.clientWidth * 0.8, 320),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <section id={`home-${section.key}`} className="scroll-mt-24">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div className="min-w-0">
          <div className="mb-1.5 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-color-primary" />
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
              {section.eyebrow}
            </p>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
            {section.title}
          </h2>
          {section.description && (
            <p className="mt-1 max-w-xl text-sm text-white/45">
              {section.description}
            </p>
          )}
        </div>

        <div className="hidden shrink-0 items-center gap-2 md:flex">
          <button
            type="button"
            aria-label={`Scroll ${section.title} left`}
            onClick={() => scrollRow(-1)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/55 transition duration-200 hover:border-white/25 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            <IoChevronBack size={16} />
          </button>
          <button
            type="button"
            aria-label={`Scroll ${section.title} right`}
            onClick={() => scrollRow(1)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/55 transition duration-200 hover:border-white/25 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            <IoChevronForward size={16} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-1 scrollbar-hide sm:-mx-8 sm:gap-4 sm:px-8 lg:mx-0 lg:px-0"
      >
        {section.items.map((item) => (
          <div
            key={getMediaKey(item)}
            className="w-[9.75rem] shrink-0 snap-start sm:w-40 md:w-44 lg:w-48 2xl:w-52"
          >
            <HomeMediaCard media={item} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeMediaRow;
