import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import ContentState from "../components/common/ContentState";
import HomeFooter from "../features/home/components/HomeFooter";
import HomeGenreGrid from "../features/home/components/HomeGenreGrid";
import HomeHero from "../features/home/components/HomeHero";
import HomeKidsPreview from "../features/home/components/HomeKidsPreview";
import HomeMediaRow from "../features/home/components/HomeMediaRow";
import HomePageSkeleton from "../features/home/components/skeletons/HomePageSkeleton";
import useHomePage from "../features/home/hooks/useHomePage";
import SeriesDetailsModal from "../features/series/components/SeriesDetailsModal";

const HomeStateScreen = ({
  variant = "empty",
  title,
  message,
  actionLabel,
  onAction,
}) => (
  <div className="flex min-h-screen items-center justify-center bg-color-bg px-5 pt-24 text-white">
    <div className="w-full max-w-md">
      <ContentState
        variant={variant}
        title={title}
        message={message}
        actionLabel={actionLabel}
        onAction={onAction}
      />
    </div>
  </div>
);

const HomePage = () => {
  const navigate = useNavigate();
  const { hero, featured, sections, kids, genreTiles, loading, error, refetch } =
    useHomePage();
  const [selectedSeries, setSelectedSeries] = useState(null);

  const closeDetails = useCallback(() => {
    setSelectedSeries(null);
  }, []);

  const hasContent =
    (sections?.length || 0) > 0 || (kids?.length || 0) > 0;

  if (loading || (!sections && !error)) {
    return <HomePageSkeleton />;
  }

  if (error) {
    return (
      <HomeStateScreen
        variant="error"
        title="The homepage is unavailable"
        message="We couldn't load the latest films and series right now. Check your connection and try again."
        actionLabel="Try again"
        onAction={refetch}
      />
    );
  }

  if (!hasContent) {
    return (
      <HomeStateScreen
        title="Nothing to stream just yet"
        message="New films and series will appear here soon. Check back or refresh the page."
        actionLabel="Refresh"
        onAction={refetch}
      />
    );
  }

  const handleExplore = () => {
    const targetId = sections?.[0]
      ? `home-${sections[0].key}`
      : "home-genres";
    const target = document.getElementById(targetId);
    if (!target) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    target.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  const handleWatchNow = (item) => {
    if (!item) return;

    if (item.media_type === "tv") {
      setSelectedSeries(item);
      return;
    }

    navigate(`/movie/${item.id}`);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-color-bg font-montserrat text-white">
      <HomeHero
        items={featured}
        onExplore={handleExplore}
        onWatchNow={handleWatchNow}
      />

      <main
        className={`mx-auto w-full max-w-[1600px] px-5 pb-24 sm:px-8 lg:px-14 ${
          hero ? "pt-10 sm:pt-12 lg:pt-14" : "pt-28"
        }`}
      >
        {sections?.length > 0 && (
          <div className="space-y-12 md:space-y-16">
            {sections.map((section) => (
              <HomeMediaRow
                key={section.key}
                section={section}
                onSelectSeries={setSelectedSeries}
              />
            ))}
          </div>
        )}

        <div className="mt-16 space-y-12 md:mt-20 md:space-y-16">
          <HomeGenreGrid genres={genreTiles} />
          <HomeKidsPreview movies={kids} />
        </div>
      </main>

      <HomeFooter />

      {selectedSeries && (
        <SeriesDetailsModal
          series={selectedSeries}
          onClose={closeDetails}
        />
      )}
    </div>
  );
};

export default HomePage;
