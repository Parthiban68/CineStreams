import React from "react";
import { NavLink } from "react-router-dom";
import { IoArrowUp, IoPlay } from "react-icons/io5";

const footerLinks = [
  { label: "Home", to: "/" },
  { label: "Movies", to: "/movie" },
  { label: "Series", to: "/series" },
  { label: "Kids", to: "/kids" },
];

const HomeFooter = () => {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <footer className="mt-20 border-t border-white/[0.06] bg-black/20">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-8 px-5 py-10 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-14">
        <div className="max-w-sm">
          <NavLink
            to="/"
            className="inline-flex items-center gap-2.5 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-color-primary"
            aria-label="CineStreams home"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-color-primary text-color-bg">
              <IoPlay size={15} className="ml-0.5" />
            </span>
            <span className="text-sm font-extrabold tracking-[0.16em] text-white">
              CINESTREAM
            </span>
          </NavLink>
          <p className="mt-3 text-sm leading-6 text-white/40">
            A cinematic home for discovering films, series, and family
            favourites.
          </p>
        </div>

        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {footerLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === "/"}
                  className="text-sm font-medium text-white/45 transition duration-200 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center justify-between gap-4 lg:justify-end">
          <p className="text-xs text-white/30">
            © {year} CineStreams. All rights reserved.
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/50 transition duration-200 hover:border-white/25 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            <IoArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;
