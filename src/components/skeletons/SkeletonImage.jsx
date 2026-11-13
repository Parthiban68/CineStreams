import React from "react";
import SkeletonBase from "./SkeletonBase";

const SkeletonImage = ({
  className = "",
  ratio = "aspect-[2/3]",
  rounded = "rounded-2xl",
}) => (
  <SkeletonBase className={`${ratio} w-full ${rounded} ${className}`} />
);

export default SkeletonImage;
