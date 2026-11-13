import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SERIES_SECTIONS } from "../seriesSections";
import { getSeriesDetails } from "../services/seriesService";
import {
  fetchSeriesPageFailure,
  fetchSeriesPageStart,
  fetchSeriesPageSuccess,
} from "../../../store/slices/seriesPageSlice";

const buildSections = (results) => {
  const seenSeries = new Set();

  return SERIES_SECTIONS.reduce((sections, section, index) => {
    const result = results[index];

    if (result.status !== "fulfilled") {
      return sections;
    }

    const items = (result.value || [])
      .filter((series) => {
        if (!series?.id || seenSeries.has(series.id)) {
          return false;
        }

        seenSeries.add(series.id);
        return true;
      })
      .slice(0, 20);

    if (items.length > 0) {
      sections.push({
        key: section.key,
        title: section.title,
        eyebrow: section.eyebrow,
        description: section.description,
        items,
      });
    }

    return sections;
  }, []);
};

const useSeriesPage = () => {
  const dispatch = useDispatch();
  const { hero, heroDetails, sections, loading, error } = useSelector(
    (state) => state.seriesPage
  );
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const loadSeriesPage = async () => {
      dispatch(fetchSeriesPageStart());

      try {
        const results = await Promise.allSettled(
          SERIES_SECTIONS.map((section) => section.load())
        );

        if (cancelled) return;

        const hasSuccessfulRequest = results.some(
          (result) => result.status === "fulfilled"
        );

        if (!hasSuccessfulRequest) {
          const firstFailure = results.find(
            (result) => result.status === "rejected"
          );

          throw (
            firstFailure?.reason ||
            new Error("Unable to load the series collection.")
          );
        }

        const nextSections = buildSections(results);
        const firstSectionWithItems = nextSections.find(
          (section) => section.items.length > 0
        );
        const heroSeries =
          firstSectionWithItems?.items.find(
            (series) => series.backdrop_path && series.overview
          ) ||
          firstSectionWithItems?.items[0] ||
          null;

        let nextHeroDetails = null;

        if (heroSeries) {
          try {
            nextHeroDetails = await getSeriesDetails(heroSeries.id);
          } catch {
            nextHeroDetails = null;
          }
        }

        if (cancelled) return;

        dispatch(
          fetchSeriesPageSuccess({
            hero: heroSeries,
            heroDetails: nextHeroDetails,
            sections: nextSections,
          })
        );
      } catch (loadError) {
        if (cancelled) return;

        dispatch(
          fetchSeriesPageFailure(
            loadError?.message || "Unable to load the series collection."
          )
        );
      }
    };

    loadSeriesPage();

    return () => {
      cancelled = true;
    };
  }, [dispatch, reloadKey]);

  return {
    hero,
    heroDetails,
    sections,
    loading,
    error,
    refetch: () => setReloadKey((key) => key + 1),
  };
};

export default useSeriesPage;
