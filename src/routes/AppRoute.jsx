import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import NavBar from "../components/layout/NavBar";
import DetailsPage from "../pages/DetailsPage";
import MoviesPage from "../pages/MoviesPage";
import SeriesPage from "../pages/SeriesPage";
import KidsPage from "../pages/KidsPage";
import SeeAllPage from "../pages/SeeAllPage";
const AppRoute = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:id" element={<DetailsPage />} />
        <Route path="/movie" element={<MoviesPage />} />
        <Route path="/series" element={<SeriesPage />} />
        <Route path="/kids" element={<KidsPage />} />
        <Route path="/seeall/:id" element={<SeeAllPage />} />
      </Routes>
    </>
  );
};

export default AppRoute;
