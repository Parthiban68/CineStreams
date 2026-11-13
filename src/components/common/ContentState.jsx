import React from "react";
import { IoAlertCircleOutline, IoFilmOutline } from "react-icons/io5";

const ContentState = ({
  variant = "empty",
  title,
  message,
  actionLabel,
  onAction,
  className = "",
}) => {
  const isError = variant === "error";

  return (
    <div
      role={isError ? "alert" : undefined}
      className={`flex flex-col items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.02] px-6 py-12 text-center ${className}`}
    >
      <div
        className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] ${
          isError ? "text-red-400/80" : "text-color-primary/70"
        }`}
      >
        {isError ? (
          <IoAlertCircleOutline size={24} />
        ) : (
          <IoFilmOutline size={23} />
        )}
      </div>

      <h3 className="text-base font-semibold text-white sm:text-lg">
        {title}
      </h3>
      {message && (
        <p className="mt-2 max-w-sm text-sm leading-6 text-white/45">
          {message}
        </p>
      )}
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-6 inline-flex h-10 items-center rounded-full bg-white px-5 text-sm font-semibold text-color-bg transition duration-200 hover:bg-color-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-color-primary focus-visible:ring-offset-2 focus-visible:ring-offset-color-bg"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default ContentState;
