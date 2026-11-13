import React, { useCallback, useState } from "react";
import ContentState from "../components/common/ContentState";
import SeriesDetailsModal from "../features/series/components/SeriesDetailsModal";
import SeriesGenreBrowser from "../features/series/components/SeriesGenreBrowser";
import SeriesHero from "../features/series/components/SeriesHero";
import SeriesRow from "../features/series/components/SeriesRow";
import SeriesPageSkeleton from "../features/series/components/skeletons/SeriesPageSkeleton";
import useSeriesPage from "../features/series/hooks/useSeriesPage";

const SeriesStateScreen = ({
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

const SeriesPage = () => {
  const { hero, heroDetails, sections, loading, error, refetch } =
    useSeriesPage();
  const [selectedSeries, setSelectedSeries] = useState(null);

  const closeDetails = useCallback(() => {
    setSelectedSeries(null);
  }, []);

  if (loading || (!sections && !error)) {
    return <SeriesPageSkeleton />;
  }

  if (error) {
    return (
      <SeriesStateScreen
        variant="error"
        title="The series collection is unavailable"
        message="We couldn't load the series collection right now. Check your connection and try again."
        actionLabel="Try again"
        onAction={refetch}
      />
    );
  }

  if (!sections || sections.length === 0) {
    return (
      <SeriesStateScreen
        title="No series available right now"
        message="New series will appear here soon. Check back or refresh the page."
        actionLabel="Refresh"
        onAction={refetch}
      />
    );
  }

  const firstSectionKey = sections[0]?.key;

  const handleExplore = () => {
    const target = document.getElementById(`series-${firstSectionKey}`);
    if (!target) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    target.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-color-bg font-montserrat text-white">
      <SeriesHero
        series={hero}
        details={heroDetails}
        onExplore={handleExplore}
        onMoreInfo={() => setSelectedSeries(hero)}
      />

      <main className="mx-auto w-full max-w-[1600px] px-5 pb-24 pt-10 sm:px-8 sm:pt-12 lg:px-14 lg:pt-14">
        <div className="space-y-12 md:space-y-16">
          {sections.map((section) => (
            <SeriesRow
              key={section.key}
              section={section}
              onSelectSeries={setSelectedSeries}
            />
          ))}
        </div>

        <div className="mt-16 md:mt-20">
          <SeriesGenreBrowser onSelectSeries={setSelectedSeries} />
        </div>
      </main>

      {selectedSeries && (
        <SeriesDetailsModal
          series={selectedSeries}
          initialDetails={
            selectedSeries.id === hero?.id ? heroDetails : null
          }
          onClose={closeDetails}
        />
      )}
    </div>
  );
};

export default SeriesPage;
