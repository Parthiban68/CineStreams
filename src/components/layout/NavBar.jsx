import React, { useEffect, useRef, useState } from "react";
import {
  IoCloseOutline,
  IoMenuOutline,
  IoPlay,
  IoSearchOutline,
} from "react-icons/io5";
import { NavLink, useLocation } from "react-router-dom";
import Button from "../common/Button";
import SearchPanel from "../../features/search/components/SearchPanel";

const navItems = [
  { key: "home", label: "Home", to: "/" },
  { key: "movie", label: "Movies", to: "/movie" },
  { key: "series", label: "Series", to: "/series" },
  { key: "kids", label: "Kids", to: "/kids" },
];

const navLinkClass = ({ isActive }) =>
  `rounded-full px-4 py-2 text-sm font-semibold transition duration-200 lg:px-6 ${
    isActive
      ? "bg-white text-color-bg shadow-sm"
      : "text-white/65 hover:bg-white/[0.06] hover:text-white"
  }`;

const mobileNavLinkClass = ({ isActive }) =>
  `rounded-2xl px-4 py-3 text-sm font-semibold transition duration-200 ${
    isActive
      ? "bg-white text-color-bg"
      : "text-white/70 hover:bg-white/[0.06] hover:text-white"
  }`;

const NavBar = () => {
  const location = useLocation();
  const headerRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key !== "Escape") return;

      setSearchOpen(false);
      setMenuOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!searchOpen && !menuOpen) return undefined;

    const handlePointerDown = (event) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target)
      ) {
        setSearchOpen(false);
        setMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [searchOpen, menuOpen]);

  const toggleSearch = () => {
    setSearchOpen((open) => !open);
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen((open) => !open);
    setSearchOpen(false);
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "border-b border-white/10 bg-color-bg/95 shadow-xl backdrop-blur-xl"
            : "bg-gradient-to-b from-black/80 via-black/30 to-transparent"
        }`}
      >
        <div
          className={`mx-auto flex w-full max-w-[1600px] items-center justify-between px-5 transition-all duration-300 sm:px-8 lg:px-14 ${
            scrolled ? "h-16" : "h-20"
          }`}
        >
          <NavLink
            to="/"
            aria-label="CineStreams home"
            className="group flex shrink-0 items-center gap-2.5 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-color-primary"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-color-primary text-color-bg shadow-lg shadow-color-primary/10 transition duration-200 group-hover:scale-105">
              <IoPlay size={17} className="ml-0.5" />
            </span>
            <span className="text-base font-extrabold tracking-[0.16em] text-white sm:text-lg">
              CINESTREAM
            </span>
          </NavLink>

          <nav
            aria-label="Main navigation"
            className="hidden items-center rounded-full border border-white/10 bg-white/[0.06] p-1 backdrop-blur-md md:flex"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.key}
                to={item.to}
                end={item.to === "/"}
                className={navLinkClass}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <button
              type="button"
              aria-label={searchOpen ? "Close search" : "Search"}
              aria-expanded={searchOpen}
              aria-controls="site-search"
              onClick={toggleSearch}
              className={`flex h-10 w-10 items-center justify-center rounded-full border transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-color-primary ${
                searchOpen
                  ? "border-color-primary bg-color-primary text-color-bg"
                  : "border-white/15 bg-white/[0.06] text-white/75 hover:border-white/30 hover:text-white"
              }`}
            >
              {searchOpen ? (
                <IoCloseOutline size={20} />
              ) : (
                <IoSearchOutline size={18} />
              )}
            </button>

            <div className="hidden lg:block">
              <Button
                className="h-10 rounded-full bg-color-btnbg px-7 text-sm font-semibold text-white transition duration-200 hover:bg-white hover:text-color-bg"
                label="Login"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              aria-label={searchOpen ? "Close search" : "Search"}
              aria-expanded={searchOpen}
              aria-controls="site-search"
              onClick={toggleSearch}
              className={`flex h-10 w-10 items-center justify-center rounded-full border transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-color-primary ${
                searchOpen
                  ? "border-color-primary bg-color-primary text-color-bg"
                  : "border-white/15 bg-white/[0.06] text-white/75"
              }`}
            >
              {searchOpen ? (
                <IoCloseOutline size={20} />
              ) : (
                <IoSearchOutline size={18} />
              )}
            </button>
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={toggleMenu}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white/80 transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-color-primary"
            >
              {menuOpen ? (
                <IoCloseOutline size={22} />
              ) : (
                <IoMenuOutline size={22} />
              )}
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="border-t border-white/10 bg-color-bg/95 shadow-2xl backdrop-blur-xl">
            <div className="px-5 py-4 sm:px-8 lg:px-14">
              <SearchPanel onClose={() => setSearchOpen(false)} />
            </div>
          </div>
        )}

        {menuOpen && (
          <div
            id="mobile-menu"
            className="max-h-[calc(100vh_-_5rem)] overflow-y-auto border-t border-white/10 bg-color-bg/95 px-4 pb-5 pt-3 shadow-2xl backdrop-blur-xl md:hidden"
          >
            <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.key}
                  to={item.to}
                  end={item.to === "/"}
                  className={mobileNavLinkClass}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <div className="mt-3 flex items-center gap-3 border-t border-white/10 pt-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white/60">
                <IoPlay size={18} />
              </div>
              <Button
                className="h-11 flex-1 rounded-full bg-color-btnbg px-6 text-sm font-semibold text-white transition duration-200 hover:bg-white hover:text-color-bg"
                label="Login"
              />
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default NavBar;
