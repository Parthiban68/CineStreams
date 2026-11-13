import React from "react";

const CardSkeleton = () => (
  <div className="w-[9.75rem] shrink-0 sm:w-40 md:w-44 lg:w-48 2xl:w-52">
    <div className="aspect-[2/3] animate-pulse rounded-2xl bg-white/[0.05] ring-1 ring-white/[0.04]" />
    <div className="mt-3 h-3.5 w-3/4 animate-pulse rounded-full bg-white/[0.05]" />
    <div className="mt-2 h-2.5 w-1/2 animate-pulse rounded-full bg-white/[0.04]" />
  </div>
);

const RowSkeleton = () => (
  <div>
    <div className="mb-5 space-y-2.5">
      <div className="h-2.5 w-24 animate-pulse rounded-full bg-white/[0.05]" />
      <div className="h-6 w-48 animate-pulse rounded-full bg-white/[0.06]" />
    </div>
    <div className="flex gap-3 overflow-hidden sm:gap-4">
      {Array.from({ length: 7 }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  </div>
);

const KidsPageSkeleton = () => (
  <div
    className="min-h-screen overflow-x-hidden bg-color-bg text-white"
    aria-busy="true"
    aria-label="Loading Kids movies"
  >
    <div className="relative flex min-h-[560px] items-end overflow-hidden sm:min-h-[600px] lg:min-h-[68vh]">
      <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-white/[0.07] via-white/[0.03] to-transparent" />
      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 pb-14 pt-32 sm:px-8 sm:pb-16 md:pb-20 lg:px-14 lg:pb-24">
        <div className="h-6 w-40 animate-pulse rounded-full bg-white/[0.07]" />
        <div className="mt-5 h-12 w-[85%] max-w-xl animate-pulse rounded-2xl bg-white/[0.08] sm:h-16" />
        <div className="mt-5 h-4 w-56 animate-pulse rounded-full bg-white/[0.05]" />
        <div className="mt-5 h-3 w-[80%] max-w-md animate-pulse rounded-full bg-white/[0.05]" />
        <div className="mt-7 flex gap-3">
          <div className="h-11 w-32 animate-pulse rounded-full bg-white/[0.09]" />
          <div className="h-11 w-32 animate-pulse rounded-full bg-white/[0.05]" />
        </div>
      </div>
    </div>

    <div className="border-y border-white/[0.06] bg-color-bg/85">
      <div className="mx-auto flex max-w-[1600px] gap-2 overflow-hidden px-5 py-3.5 sm:px-8 lg:px-14">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-8 w-24 shrink-0 animate-pulse rounded-full bg-white/[0.05]"
          />
        ))}
      </div>
    </div>

    <div className="mx-auto max-w-[1600px] space-y-14 px-5 py-12 sm:px-8 lg:px-14">
      <RowSkeleton />
      <RowSkeleton />
    </div>
  </div>
);

export default KidsPageSkeleton;
