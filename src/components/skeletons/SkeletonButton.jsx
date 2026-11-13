import React from "react";
import SkeletonBase from "./SkeletonBase";

const SkeletonButton = ({ className = "h-11 w-32" }) => (
  <SkeletonBase className={`${className} rounded-full`} />
);

export default SkeletonButton;
