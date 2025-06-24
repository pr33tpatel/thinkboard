import React from "react";
import { Link } from "react-router";
import { PlusIcon } from "lucide-react";
const Navbar = () => {
  return (
    <header data-theme="synthwave" className="fixed top-0 left-0 right-0 z-50 bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl md:ml-3 font-bold text-primary font-mono tracking-tight">Thinkboard</h1>
          <div className="flex items-center gap-4">
            <Link to={"/create"} className="btn btn-outline btn-primary hover:scale-105 transition-transform">
              <PlusIcon className="size-5" />
              <span>New Note</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
