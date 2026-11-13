import React from "react";

const SkeletonBase = ({ className = "", children }) => (
  <div
    aria-hidden="true"
    className={`skeleton-shimmer bg-white/[0.06] ${className}`}
  >
    {children}
  </div>
);

export default SkeletonBase;
