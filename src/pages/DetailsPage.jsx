import React from "react";
import MovieDetailsCard from "../features/moviedetails/components/MovieDetailsCard";
import CastAndCrewCard from "../features/moviedetails/components/CastAndCrewCard";

const DetailsPage = () => {
  return (
    <div>
      <MovieDetailsCard />
      <CastAndCrewCard />
    </div>
  );
};

export default DetailsPage;
