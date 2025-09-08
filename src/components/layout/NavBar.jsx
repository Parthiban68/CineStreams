import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import Button from "../common/Button";
import { NavLink, useLocation } from "react-router-dom";

const NavBar = () => {
  const Location = useLocation();
  const [isActive, setIsActive] = useState("");

  useEffect(() => {
  
    if (Location.pathname === "/") {
      setIsActive("home");
    } else if (Location.pathname === "/movie") {
      setIsActive("movie");
    } 
    else if (Location.pathname === "/series") {
      setIsActive("series");
    } 
    else if (Location.pathname === "/kids") {
      setIsActive("kids");
    }
  }, [Location]);


  return (
    <div className="min-w-full h-20 flex justify-around items-center z-40 absolute bg-white/10 backdrop-blur-sm">
      {/* logo and name */}
      <div className="w-auto h-16 flex items-center justify-center">
        <h1 className="text-xl font-extrabold text-color-primary">
          <NavLink to={"/"}>CINESTREAM</NavLink>
        </h1>
      </div>

      {/** list of navigation links */}
      <div className="w-auto h-12 bg-color-btnbg flex items-center justify-center px-[0.3rem] rounded-full">
        <ul className="flex space-x-10 text-white">
          <NavLink 
          to={"/"}
          className={`text-sm text-white ${isActive == 'home' ? 'bg-color-bg': ''} py-2 px-6 font-semibold rounded-full`}>
            Home
          </NavLink>
          <NavLink
            to={"/movie"}
            className={`text-sm text-white  py-2 px-6  rounded-full ${isActive === 'movie' ? 'bg-color-bg': ''}`}
          >
            Movies
          </NavLink>
          <NavLink
            to={"/series"}
            className={`text-sm text-white  py-2 px-6 rounded-full ${isActive === 'series' ? 'bg-color-bg': ''}`}
          >
            Series
          </NavLink>
          <NavLink
            to={"/kids"}
            className={`text-sm text-white  py-2 px-6 rounded-full ${isActive === 'kids' ? 'bg-color-bg': ''}`}
          >
            Kids
          </NavLink>
        </ul>
      </div>

      {/** search and login */}
      <div className="flex justify-between items-center w-44">
        <div className="w-12 h-12 bg-color-primary flex items-center justify-center px-1 rounded-full">
          <IoSearchOutline size={20} className="text-color-bg" />
        </div>
        <Button
          className={"w-auto h-12 bg-color-btnbg px-10 rounded-full"}
          label={"Login"}
        />
      </div>
    </div>
  );
};

export default NavBar;
