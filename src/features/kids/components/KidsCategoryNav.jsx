import React, { useState } from "react";
import { KIDS_CATEGORIES } from "../kidsCategories";

const KidsCategoryNav = () => {
  const [activeCategory, setActiveCategory] = useState("featured");

  const handleSelect = (category) => {
    setActiveCategory(category.key);
    document
      .getElementById(`kids-${category.key}`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      aria-label="Kids categories"
      className="relative z-20 border-y border-white/[0.06] bg-color-bg/85 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-[1600px] items-center gap-2 overflow-x-auto px-5 py-3.5 scrollbar-hide sm:px-8 lg:px-14">
        {KIDS_CATEGORIES.map((category) => {
          const isActive = activeCategory === category.key;

          return (
            <button
              key={category.key}
              type="button"
              onClick={() => handleSelect(category)}
              aria-current={isActive ? "true" : undefined}
              className={`inline-flex h-10 shrink-0 items-center gap-2 rounded-full px-4 text-xs font-semibold transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 sm:text-sm ${
                isActive
                  ? "bg-white text-color-bg"
                  : "text-white/55 hover:bg-white/[0.06] hover:text-white"
              }`}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: category.accent }}
              />
              {category.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default KidsCategoryNav;
