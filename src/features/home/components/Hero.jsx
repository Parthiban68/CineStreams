import React from "react";
import Button from "../../../components/common/Button";
import MovieCards from "./MovieCards";
import ComedyMovieCards from "./ComedyMovieCards";
import ActionMoviesCard from "./ActionMoviesCard";

const Hero = () => {
 
  return (
    <div className="relative">
      {/** main section */}
      <section>
        <div className="flex justify-center items-center ">
          <div className="mt-44">
            <p className="text-6xl md:text-5xl font-[300] mb-2 text-center">
              Discover the Series Streaming
            </p>
            <p className="text-6xl md:text-5xl font-[300] tracking-[-0.1rem] text-center">
              Experience with <span className="font-bold">CineStreams</span>
            </p>
            <p className="text-center mt-4 italic font-[200] text-lg">
              our young and expert admin prepares a amazing and trend <br />
              series for you watch online and priceless
            </p>
          </div>
        </div>
        <div className="flex justify-center space-x-2 items-center mt-5">
          <Button
            className={
              "w-40 h-12 bg-color-primary px-8 rounded-full text-color-bg font-semibold"
            }
            label={"Get Started"}
          />
          <Button
            className={
              "w-40 h-12 bg-color-bg px-8 rounded-full font-semibold border border-white"
            }
            label={"Live TV"}
          />
        </div>
      </section>
      <MovieCards/>
      <ActionMoviesCard/>
      <ComedyMovieCards/>
    </div>
  );
};

export default Hero;
