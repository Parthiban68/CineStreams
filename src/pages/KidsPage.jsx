import React from "react";
import {
  IoAlertCircleOutline,
  IoCompassOutline,
} from "react-icons/io5";
import useKidsMovies from "../features/kids/hooks/useKidsMovies";
import { KIDS_CATEGORIES } from "../features/kids/kidsCategories";
import KidsHero from "../features/kids/components/KidsHero";
import KidsCategoryNav from "../features/kids/components/KidsCategoryNav";
import KidsMovieRow from "../features/kids/components/KidsMovieRow";
import KidsPageSkeleton from "../features/kids/components/KidsPageSkeleton";

const BackgroundAccents = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
  >
    <div className="absolute -left-40 top-[52%] h-96 w-96 rounded-full bg-kids-accent/[0.06] blur-3xl" />
    <div className="absolute -right-48 top-[72%] h-[28rem] w-[28rem] rounded-full bg-kids-sky/[0.05] blur-3xl" />
    <div className="absolute left-[12%] top-[48%] h-1.5 w-1.5 rotate-45 bg-kids-sun/40" />
    <div className="absolute right-[18%] top-[64%] h-1 w-1 rotate-45 bg-kids-mint/40" />
    <div className="absolute left-[38%] top-[84%] h-1 w-1 rounded-full bg-kids-violet/40" />
  </div>
);

const KidsStateScreen = ({ icon, title, message, actionLabel, onAction }) => (
  <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-color-bg px-5 pt-24 text-white">
    <BackgroundAccents />
    <div className="relative z-10 mx-auto max-w-md text-center">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-kids-accent">
        {icon}
      </div>
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
        {title}
      </h1>
      <p className="mt-3 text-sm leading-6 text-white/50">{message}</p>
      {onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-7 inline-flex h-11 items-center rounded-full bg-white px-6 text-sm font-bold text-color-bg transition duration-200 hover:bg-kids-sun focus:outline-none focus-visible:ring-2 focus-visible:ring-kids-sun focus-visible:ring-offset-2 focus-visible:ring-offset-color-bg"
        >
          {actionLabel}
        </button>
      )}
    </div>
  </div>
);

const KidsPage = () => {
  const { hero, sections, loading, error, refetch } = useKidsMovies();

  if (loading || (!sections && !error)) {
    return <KidsPageSkeleton />;
  }

  if (error) {
    return (
      <KidsStateScreen
        icon={<IoAlertCircleOutline size={28} />}
        title="The Kids universe took a wrong turn"
        message="We couldn't load the Kids collection right now. Check your connection and try again."
        actionLabel="Try again"
        onAction={refetch}
      />
    );
  }

  const featured = sections?.featured || [];
  const heroMovie = hero || featured[0];

  if (!heroMovie && featured.length === 0) {
    return (
      <KidsStateScreen
        icon={<IoCompassOutline size={28} />}
        title="The Kids universe is getting ready"
        message="No titles match this collection yet. Check back soon or refresh the page."
        actionLabel="Refresh"
        onAction={refetch}
      />
    );
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-color-bg font-montserrat text-white">
      <BackgroundAccents />

      <div className="relative z-10">
        <KidsHero movie={heroMovie} />
        <KidsCategoryNav />

        <main className="mx-auto w-full max-w-[1600px] px-5 pb-24 pt-10 sm:px-8 sm:pt-12 lg:px-14 lg:pt-14">
          <div className="space-y-12 md:space-y-16">
            {KIDS_CATEGORIES.map((category) => {
              const movies =
                category.key === "featured"
                  ? featured
                  : sections?.[category.key] || [];

              return (
                <KidsMovieRow
                  key={category.key}
                  category={category}
                  movies={movies}
                />
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
};

export default KidsPage;
