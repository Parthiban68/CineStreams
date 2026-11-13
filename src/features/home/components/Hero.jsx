import React from "react";
import Button from "../../../components/common/Button";
import MovieCards from "./MovieCards";
import ComedyMovieCards from "./ComedyMovieCards";
import ActionMoviesCard from "./ActionMoviesCard";

const Hero = () => {
 
  return (
    <div className="relative overflow-x-hidden">
      {/** main section */}
      <section className="px-4 sm:px-6 lg:px-10">
        <div className="flex justify-center items-center">
          <div className="mt-32 max-w-5xl sm:mt-40 lg:mt-44">
            <p className="mb-2 text-center text-3xl font-[300] leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
              Discover the Series Streaming
            </p>
            <p className="text-center text-3xl font-[300] leading-tight tracking-[-0.05rem] sm:text-4xl md:text-5xl lg:text-6xl">
              Experience with <span className="font-bold">CineStreams</span>
            </p>
            <p className="mx-auto mt-4 max-w-xl text-center text-sm font-[200] italic text-white/65 sm:text-base lg:text-lg">
              Our young and expert admins prepare amazing trending series for
              you to watch online, priceless.
            </p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-3 px-2 sm:mt-7">
          <Button
            className={
              "h-11 w-36 rounded-full bg-color-primary px-6 text-sm font-semibold text-color-bg sm:h-12 sm:w-40 sm:px-8"
            }
            label={"Get Started"}
          />
          <Button
            className={
              "h-11 w-36 rounded-full border border-white bg-color-bg px-6 text-sm font-semibold sm:h-12 sm:w-40 sm:px-8"
            }
            label={"Live TV"}
          />
        </div>
      </section>
      <div className="mx-auto w-full max-w-[1600px]">
        <MovieCards />
        <ActionMoviesCard />
        <ComedyMovieCards />
      </div>
    </div>
  );
};

export default Hero;
