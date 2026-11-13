import React from "react";
import SkeletonBase from "./SkeletonBase";

const SkeletonNavbar = ({ className = "" }) => (
  <div
    aria-hidden="true"
    className={`flex h-20 w-full items-center justify-between bg-white/5 px-4 sm:px-6 lg:justify-around lg:px-0 ${className}`}
  >
    <SkeletonBase className="h-6 w-32 rounded-md sm:w-40" />
    <SkeletonBase className="hidden h-12 w-[26rem] rounded-full md:block" />
    <div className="flex items-center gap-3">
      <SkeletonBase className="h-11 w-11 rounded-full" />
      <SkeletonBase className="hidden h-11 w-24 rounded-full sm:block" />
    </div>
  </div>
);

export default SkeletonNavbar;
