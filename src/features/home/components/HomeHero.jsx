import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  IoArrowForward,
  IoFilmOutline,
  IoPause,
  IoPlay,
  IoSparkles,
  IoStar,
} from "react-icons/io5";
import { TV_GENRE_MAP } from "../../series/seriesGenres";
import { MOVIE_GENRE_MAP } from "../homeGenres";
import "./homeHero.css";

const HERO_INTERVAL = 8000;
const CONTENT_EXIT_MS = 260;
const BACKDROP_FADE_MS = 1100;

const pad = (value) => String(value).padStart(2, "0");

const getMediaKey = (item) => `${item.media_type}-${item.id}`;

const getMediaTitle = (item) =>
  item.title || item.name || item.original_title || "Untitled";

const getMediaMeta = (item) => {
  const isSeries = item.media_type === "tv";
  const date = item.release_date || item.first_air_date;
  const year = date ? date.slice(0, 4) : null;
  const rating =
    typeof item.vote_average === "number" && item.vote_average > 0
      ? item.vote_average.toFixed(1)
      : null;
  const genreMap = isSeries ? TV_GENRE_MAP : MOVIE_GENRE_MAP;
  const genres = (item.genre_ids || [])
    .map((id) => genreMap[id])
    .filter(Boolean)
    .slice(0, 3);

  return { isSeries, year, rating, genres };
};

const useReducedMotion = () => {
  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window === "undefined"
      ? false
      : window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (event) => setReducedMotion(event.matches);

    query.addEventListener?.("change", handleChange);
    return () => query.removeEventListener?.("change", handleChange);
  }, []);

  return reducedMotion;
};

const HeroSelector = ({
  items,
  activeIndex,
  isPaused,
  isAutoPaused,
  progressKey,
  onSelect,
  onTogglePause,
  variant,
}) => {
  if (!items || items.length < 2) return null;

  const isRail = variant === "rail";

  return (
    <div
      className={
        isRail
          ? "hidden w-[17.5rem] shrink-0 flex-col gap-2 xl:flex"
          : "mt-8 flex w-full flex-col gap-2 xl:hidden"
      }
    >
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
          <span className="h-1 w-1 rounded-full bg-color-primary" />
          Featured lineup
        </span>
        <span className="flex items-center gap-2 text-[10px] font-bold tracking-[0.16em] text-white/35">
          <span>
            {pad(activeIndex + 1)}{" "}
            <span className="text-white/20">/</span> {pad(items.length)}
          </span>
          <button
            type="button"
            onClick={onTogglePause}
            aria-label={
              isAutoPaused
                ? "Resume featured rotation"
                : "Pause featured rotation"
            }
            className="flex h-6 w-6 items-center justify-center rounded-full border border-white/10 text-white/45 transition duration-200 hover:border-white/25 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-color-primary"
          >
            {isAutoPaused ? <IoPlay size={10} /> : <IoPause size={10} />}
          </button>
        </span>
      </div>

      <div
        className={
          isRail
            ? "flex flex-col gap-2"
            : "-mx-1 flex snap-x snap-mandatory gap-2 overflow-x-auto px-1 pb-1 scrollbar-hide"
        }
      >
        {items.map((item, index) => {
          const active = index === activeIndex;
          const title = getMediaTitle(item);
          const { isSeries, year } = getMediaMeta(item);
          const imagePath = item.backdrop_path || item.poster_path;

          return (
            <button
              key={getMediaKey(item)}
              type="button"
              onClick={() => onSelect(index)}
              aria-label={`Show featured title ${title}`}
              aria-pressed={active}
              className={
                isRail
                  ? `group/slide relative flex items-center gap-3 overflow-hidden rounded-xl border p-2 text-left transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-color-primary ${
                      active
                        ? "border-color-primary/50 bg-white/[0.09]"
                        : "border-white/[0.08] bg-black/20 hover:border-white/25 hover:bg-white/[0.05]"
                    }`
                  : `relative h-12 w-[4.5rem] shrink-0 snap-start overflow-hidden rounded-xl border transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-color-primary ${
                      active
                        ? "border-color-primary/70 opacity-100 ring-2 ring-color-primary/25"
                        : "border-white/10 opacity-55 hover:opacity-100"
                    }`
              }
            >
              <span
                className={
                  isRail
                    ? "relative h-12 w-20 shrink-0 overflow-hidden rounded-lg bg-white/[0.04]"
                    : "absolute inset-0 bg-white/[0.04]"
                }
              >
                {imagePath ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w185${imagePath}`}
                    alt=""
                    aria-hidden="true"
                    className={`h-full w-full object-cover transition duration-300 ${
                      isRail ? "group-hover/slide:scale-105" : ""
                    }`}
                    loading="lazy"
                    draggable={false}
                  />
                ) : (
                  <span className="flex h-full w-full items-center justify-center text-white/25">
                    <IoFilmOutline size={isRail ? 16 : 14} />
                  </span>
                )}
                <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <span className="absolute left-1.5 top-1.5 text-[9px] font-bold text-white/75">
                  {pad(index + 1)}
                </span>
              </span>

              {isRail && (
                <span className="min-w-0 flex-1">
                  <span
                    className={`block truncate text-xs font-semibold ${
                      active ? "text-white" : "text-white/65"
                    }`}
                  >
                    {title}
                  </span>
                  <span className="mt-0.5 block text-[10px] text-white/35">
                    {year || "—"} · {isSeries ? "Series" : "Film"}
                  </span>
                </span>
              )}

              {active && (
                <span
                  className={`absolute bottom-0 h-[2px] overflow-hidden rounded-full bg-white/10 ${
                    isRail ? "inset-x-2" : "inset-x-1"
                  }`}
                >
                  <span
                    key={progressKey}
                    className="hero-progress-bar block h-full bg-color-primary"
                    style={{
                      animationDuration: `${HERO_INTERVAL}ms`,
                      animationPlayState: isPaused ? "paused" : "running",
                    }}
                  />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const HomeHero = ({ items = [], onExplore, onWatchNow }) => {
  const safeItems = useMemo(
    () => (Array.isArray(items) ? items : []),
    [items]
  );
  const itemsKey = useMemo(
    () => safeItems.map(getMediaKey).join("|"),
    [safeItems]
  );
  const reducedMotion = useReducedMotion();
  const [isPageVisible, setIsPageVisible] = useState(true);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isAutoPaused, setIsAutoPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayedIndex, setDisplayedIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(null);
  const [contentVisible, setContentVisible] = useState(true);
  const [progressKey, setProgressKey] = useState(0);

  const activeIndexRef = useRef(0);
  const transitionRef = useRef(false);
  const wasPausedRef = useRef(false);
  const contentTimerRef = useRef(null);
  const parallaxRef = useRef(null);
  const parallaxFrameRef = useRef(null);

  const isPaused = isInteracting || isAutoPaused;

  useEffect(() => {
    const handleVisibility = () => setIsPageVisible(!document.hidden);

    handleVisibility();
    document.addEventListener("visibilitychange", handleVisibility);

    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  useEffect(() => {
    window.clearTimeout(contentTimerRef.current);
    transitionRef.current = false;
    activeIndexRef.current = 0;
    setActiveIndex(0);
    setDisplayedIndex(0);
    setPreviousIndex(null);
    setContentVisible(true);
  }, [itemsKey]);

  useEffect(() => {
    if (previousIndex === null) return undefined;

    const timer = window.setTimeout(
      () => setPreviousIndex(null),
      BACKDROP_FADE_MS
    );

    return () => window.clearTimeout(timer);
  }, [previousIndex]);

  useEffect(() => {
    if (wasPausedRef.current && !isPaused) {
      setProgressKey((key) => key + 1);
    }

    wasPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(
    () => () => {
      window.clearTimeout(contentTimerRef.current);

      if (parallaxFrameRef.current) {
        window.cancelAnimationFrame(parallaxFrameRef.current);
      }
    },
    []
  );

  useEffect(() => {
    if (safeItems.length < 2 || !isPageVisible) return undefined;

    const nextItem = safeItems[(activeIndex + 1) % safeItems.length];
    const nextPath = nextItem?.backdrop_path;

    if (!nextPath) return undefined;

    const image = new Image();
    image.src = `https://image.tmdb.org/t/p/w1280${nextPath}`;

    return () => {
      image.onload = null;
    };
  }, [activeIndex, isPageVisible, safeItems]);

  const goTo = useCallback(
    (nextIndex) => {
      if (safeItems.length < 2 || transitionRef.current) return;

      const currentIndex = activeIndexRef.current;
      const safeIndex =
        ((nextIndex % safeItems.length) + safeItems.length) %
        safeItems.length;

      if (safeIndex === currentIndex) return;

      if (reducedMotion) {
        activeIndexRef.current = safeIndex;
        setActiveIndex(safeIndex);
        setDisplayedIndex(safeIndex);
        setPreviousIndex(null);
        setContentVisible(true);
        return;
      }

      transitionRef.current = true;
      setPreviousIndex(currentIndex);
      activeIndexRef.current = safeIndex;
      setActiveIndex(safeIndex);
      setContentVisible(false);

      window.clearTimeout(contentTimerRef.current);
      contentTimerRef.current = window.setTimeout(() => {
        setDisplayedIndex(safeIndex);
        setContentVisible(true);
        transitionRef.current = false;
      }, CONTENT_EXIT_MS);
    },
    [reducedMotion, safeItems.length]
  );

  useEffect(() => {
    if (
      safeItems.length < 2 ||
      isPaused ||
      reducedMotion ||
      !isPageVisible
    ) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      goTo((activeIndexRef.current + 1) % safeItems.length);
    }, HERO_INTERVAL);

    return () => window.clearTimeout(timer);
  }, [
    activeIndex,
    goTo,
    isPageVisible,
    isPaused,
    reducedMotion,
    safeItems.length,
  ]);

  const handlePointerMove = (event) => {
    if (event.pointerType !== "mouse" || reducedMotion) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 10;

    if (parallaxFrameRef.current) {
      window.cancelAnimationFrame(parallaxFrameRef.current);
    }

    parallaxFrameRef.current = window.requestAnimationFrame(() => {
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translate3d(${x.toFixed(
          2
        )}px, ${y.toFixed(2)}px, 0)`;
      }
    });
  };

  const handlePointerLeave = () => {
    if (parallaxFrameRef.current) {
      window.cancelAnimationFrame(parallaxFrameRef.current);
    }

    if (parallaxRef.current) {
      parallaxRef.current.style.transform = "translate3d(0, 0, 0)";
    }
  };

  const handleFocusCapture = (event) => {
    if (event.target.matches?.(":focus-visible")) {
      setIsInteracting(true);
    }
  };

  const handleBlurCapture = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsInteracting(false);
    }
  };

  if (!safeItems.length) return null;

  const activeItem = safeItems[activeIndex] || safeItems[0];
  const previousItem =
    previousIndex !== null ? safeItems[previousIndex] : null;
  const displayedItem = safeItems[displayedIndex] || safeItems[0];
  const activeImagePath =
    activeItem.backdrop_path || activeItem.poster_path;
  const previousImagePath =
    previousItem?.backdrop_path || previousItem?.poster_path;
  const { isSeries, year, rating, genres } = getMediaMeta(displayedItem);
  const title = getMediaTitle(displayedItem);
  const overview = displayedItem.overview;

  return (
    <section
      className="relative flex min-h-[720px] flex-col overflow-hidden bg-color-bg sm:min-h-[760px] lg:min-h-[780px] xl:min-h-[86vh]"
      aria-roledescription="carousel"
      aria-label="Featured titles"
      onPointerMove={handlePointerMove}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setIsInteracting(true);
      }}
      onPointerLeave={() => {
        handlePointerLeave();
        setIsInteracting(false);
      }}
      onFocusCapture={handleFocusCapture}
      onBlurCapture={handleBlurCapture}
    >
      <div className="absolute inset-0" aria-hidden="true">
        <div ref={parallaxRef} className="hero-parallax">
          {previousItem && previousImagePath && (
            <img
              key={`previous-${getMediaKey(previousItem)}`}
              src={`https://image.tmdb.org/t/p/w1280${previousImagePath}`}
              alt=""
              className="hero-backdrop hero-backdrop-previous"
              decoding="async"
              draggable={false}
            />
          )}

          {activeImagePath ? (
            <img
              key={`active-${getMediaKey(activeItem)}`}
              src={`https://image.tmdb.org/t/p/w1280${activeImagePath}`}
              alt=""
              className="hero-backdrop hero-backdrop-active"
              fetchPriority="high"
              decoding="async"
              draggable={false}
            />
          ) : (
            <div className="hero-backdrop hero-backdrop-active hero-backdrop-fallback" />
          )}
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-color-bg via-color-bg/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-color-bg via-color-bg/25 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/65 to-transparent" />
      </div>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-6 top-24 z-[1] hidden text-[13rem] font-black leading-none tracking-[-0.08em] text-white/[0.035] xl:block"
      >
        {pad(activeIndex + 1)}
      </span>

      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-end px-5 pb-8 pt-32 sm:px-8 sm:pb-10 lg:px-14 lg:pb-12">
        <div className="flex w-full items-end justify-between gap-10">
          <div
            key={displayedIndex}
            className={`hero-copy max-w-3xl ${
              contentVisible ? "hero-copy-in" : "hero-copy-out"
            }`}
          >
            <div className="flex flex-wrap items-center gap-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white/55">
              <span className="inline-flex items-center gap-2 text-color-primary">
                <IoSparkles size={12} />
                CineStreams Featured
              </span>
              <span className="h-px w-8 bg-white/20" />
              <span>{isSeries ? "Series" : "Film"}</span>
              <span className="text-white/20">/</span>
              <span>
                {pad(displayedIndex + 1)} of {pad(safeItems.length)}
              </span>
            </div>

            <h1 className="mt-4 max-w-3xl text-[clamp(2.6rem,5.4vw,6.5rem)] font-black leading-[0.92] tracking-[-0.045em] text-white">
              {title}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
              {rating && (
                <span className="inline-flex items-center gap-1.5 rounded-md bg-color-primary px-2.5 py-1 text-xs font-bold text-color-bg">
                  <IoStar size={12} />
                  {rating}
                </span>
              )}
              {year && (
                <span className="font-semibold text-white/80">{year}</span>
              )}
              {genres.length > 0 && (
                <>
                  <span className="h-1 w-1 rounded-full bg-white/30" />
                  <span className="text-white/60">
                    {genres.join(" · ")}
                  </span>
                </>
              )}
              <span className="h-1 w-1 rounded-full bg-white/30" />
              <span className="text-white/40">
                {isSeries ? "Series" : "Film"}
              </span>
            </div>

            {overview && (
              <p className="mt-5 max-w-xl text-sm leading-6 text-white/70 line-clamp-3 sm:text-base sm:leading-7">
                {overview}
              </p>
            )}

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => onWatchNow?.(displayedItem)}
                className="group inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-full bg-white px-7 text-sm font-bold text-color-bg transition duration-200 hover:-translate-y-0.5 hover:bg-color-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-color-primary focus-visible:ring-offset-2 focus-visible:ring-offset-color-bg active:translate-y-0 sm:w-auto"
              >
                <IoPlay
                  size={16}
                  className="transition duration-200 group-hover:translate-x-0.5"
                />
                Watch Now
              </button>
              <button
                type="button"
                onClick={onExplore}
                className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-6 text-sm font-semibold text-white backdrop-blur-sm transition duration-200 hover:border-white/35 hover:bg-white/[0.12] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-color-bg sm:w-auto"
              >
                Explore Collection
                <IoArrowForward
                  size={15}
                  className="transition duration-200 group-hover:translate-x-0.5"
                />
              </button>
            </div>
          </div>

          <HeroSelector
            variant="rail"
            items={safeItems}
            activeIndex={activeIndex}
            isPaused={isPaused}
            isAutoPaused={isAutoPaused}
            progressKey={progressKey}
            onSelect={goTo}
            onTogglePause={() => setIsAutoPaused((paused) => !paused)}
          />
        </div>

        <HeroSelector
          variant="mobile"
          items={safeItems}
          activeIndex={activeIndex}
          isPaused={isPaused}
          isAutoPaused={isAutoPaused}
          progressKey={progressKey}
          onSelect={goTo}
          onTogglePause={() => setIsAutoPaused((paused) => !paused)}
        />
      </div>
    </section>
  );
};

export default HomeHero;
