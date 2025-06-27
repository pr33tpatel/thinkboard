import React from "react";
import { Link } from "react-router";
import { PlusIcon, MessagesSquare } from "lucide-react";
import ThemeDropdown from "./ThemeDropdown";

// Floating Plus button for mobile
function FloatingCreateButton() {
  return (
    <Link
      to="/create"
      aria-label="Create New Note"
      // Fixed position, perfectly centered, high z-index, no movement on click
      className="
        fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999]
        btn btn-primary btn-square shadow-lg
        sm:hidden
        focus:outline-none focus:ring-0 active:scale-100
      "
      style={{
        // Ensure pointer events are enabled
        pointerEvents: "auto",
        // Prevent any transform on focus/active
        transform: "translateX(-50%)",
      }}
      tabIndex={0}
    >
      <PlusIcon className="size-8" />
    </Link>
  );
}

const Navbar = () => {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-base-300 border-b border-base-content/20">
        <div className="mx-auto max-w-6xl px-2 sm:px-4 py-2 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Left: Logo and Icon */}
            <div className="flex items-center gap-2 sm:gap-4">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary font-mono tracking-tight">Thinkboard</h1>
              <MessagesSquare size={24} className="text-primary animate-pulse" />
            </div>
            {/* Right: ThemeDropdown and New Note button */}
            <div className="flex items-center gap-2 sm:gap-3">
              <ThemeDropdown />
              {/* Show New Note button in navbar only on sm and up */}
              <Link to="/create" className="btn btn-outline btn-primary flex items-center gap-2 px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base hidden sm:flex">
                <PlusIcon className="size-5" />
                <span>New Note</span>
              </Link>
            </div>
          </div>
        </div>
      </header>
      {/* Floating Plus button for mobile */}
      <FloatingCreateButton />
    </>
  );
};

export default Navbar;
