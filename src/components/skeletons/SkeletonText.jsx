import React from "react";
import SkeletonBase from "./SkeletonBase";

const SkeletonText = ({
  lines = 1,
  className = "",
  lineClassName = "h-3",
}) => (
  <div aria-hidden="true" className={`space-y-2.5 ${className}`}>
    {Array.from({ length: lines }).map((_, index) => {
      const isLastLine = lines > 1 && index === lines - 1;

      return (
        <SkeletonBase
          key={index}
          className={`${lineClassName} rounded-full ${
            isLastLine ? "w-2/3" : "w-full"
          }`}
        />
      );
    })}
  </div>
);

export default SkeletonText;
