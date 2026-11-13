import React from "react";
import SkeletonBase from "./SkeletonBase";

const SkeletonAvatar = ({ className = "h-12 w-12" }) => (
  <SkeletonBase className={`${className} shrink-0 rounded-full`} />
);

export default SkeletonAvatar;
