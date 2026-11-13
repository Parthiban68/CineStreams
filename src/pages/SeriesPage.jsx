import React from "react";
import { useNavigate } from "react-router-dom";
import ContentState from "../components/common/ContentState";

const SeriesPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-color-bg px-4 pt-24 text-white sm:px-6">
      <div className="w-full max-w-xl">
        <ContentState
          title="Series is on the way"
          message="We're still preparing the series collection. In the meantime, explore the movies available on CineStreams."
          actionLabel="Browse Movies"
          onAction={() => navigate("/movie")}
        />
      </div>
    </div>
  );
};

export default SeriesPage;
