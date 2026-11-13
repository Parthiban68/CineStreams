import React, { useEffect, useState } from "react";
import {
  IoCloseOutline,
  IoMenuOutline,
  IoSearchOutline,
} from "react-icons/io5";
import Button from "../common/Button";
import { NavLink, useLocation } from "react-router-dom";

const navItems = [
  { key: "home", label: "Home", to: "/" },
  { key: "movie", label: "Movies", to: "/movie" },
  { key: "series", label: "Series", to: "/series" },
  { key: "kids", label: "Kids", to: "/kids" },
];

const NavBar = () => {
  const Location = useLocation();
  const [isActive, setIsActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (Location.pathname === "/") {
      setIsActive("home");
    } else if (Location.pathname === "/movie") {
      setIsActive("movie");
    } else if (Location.pathname === "/series") {
      setIsActive("series");
    } else if (Location.pathname === "/kids") {
      setIsActive("kids");
    } else {
      setIsActive("");
    }

    setMenuOpen(false);
  }, [Location]);

  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="relative flex h-20 w-full items-center justify-between bg-white/10 px-4 backdrop-blur-sm sm:px-6 lg:justify-around lg:px-0">
        {/* logo and name */}
        <div className="flex h-16 items-center justify-center">
          <h1 className="text-lg font-extrabold text-color-primary sm:text-xl">
            <NavLink to={"/"}>CINESTREAM</NavLink>
          </h1>
        </div>

        {/** list of navigation links */}
        <div className="hidden h-12 items-center justify-center rounded-full bg-color-btnbg px-[0.3rem] md:flex">
          <ul className="flex space-x-2 text-white lg:space-x-10">
            {navItems.map((item) => (
              <NavLink
                key={item.key}
                to={item.to}
                className={`rounded-full px-3 py-2 text-sm text-white lg:px-6 ${
                  isActive === item.key ? "bg-color-bg font-semibold" : ""
                }`}
              >
                {item.label}
              </NavLink>
            ))}
          </ul>
        </div>

        {/** search and login */}
        <div className="hidden w-44 items-center justify-between md:flex">
          <button
            type="button"
            aria-label="Search"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-color-primary px-1"
          >
            <IoSearchOutline size={20} className="text-color-bg" />
          </button>
          <Button
            className={
              "h-12 w-auto rounded-full bg-color-btnbg px-10 text-sm font-semibold"
            }
            label={"Login"}
          />
        </div>

        {/** mobile menu controls */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            aria-label="Search"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-color-primary"
          >
            <IoSearchOutline size={18} className="text-color-bg" />
          </button>
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-color-btnbg text-white"
          >
            {menuOpen ? (
              <IoCloseOutline size={22} />
            ) : (
              <IoMenuOutline size={22} />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="max-h-[calc(100vh_-_5rem)] overflow-y-auto border-t border-white/10 bg-color-bg/95 px-4 pb-5 pt-3 shadow-2xl backdrop-blur-xl md:hidden">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.key}
                to={item.to}
                className={`rounded-2xl px-4 py-3 text-sm font-semibold transition duration-200 ${
                  isActive === item.key
                    ? "bg-white text-color-bg"
                    : "text-white/70 hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-3 flex items-center gap-3 border-t border-white/10 pt-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-color-primary">
              <IoSearchOutline size={18} className="text-color-bg" />
            </div>
            <Button
              className={
                "h-11 flex-1 rounded-full bg-color-btnbg px-6 text-sm font-semibold"
              }
              label={"Login"}
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
