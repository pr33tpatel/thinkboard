import { NotebookIcon, PlusSquareIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router";

const NotesNotFound = () => {
  return (
    <div className="flex bg-transparent items-center justify-center min-h-[70vh] bg-gray-950">
      <div data-theme="synthwave" className="flex flex-col items-center justify-center gap-6 w-full max-w-lg p-10 rounded-2xl shadow-2xl bg-base-100  border-primary/40">
        {/* Animated Icon */}
        <div className="bg-primary/10 rounded-full p-8 mb-2 shadow-lg animate-bounce-slow">
          <NotebookIcon className="size-12 text-primary" />
        </div>

        {/* Headings */}
        <h3 className="text-2xl font-extrabold text-primary mb-1">No Notes Yet!</h3>
        <p className="text-base-content text-center text-lg mb-4">Start capturing your thoughts, ideas, or tasks by creating your first note.</p>

        {/* Call to Action */}
        <Link to="/create" className="btn btn-primary md:btn-lg gap-2 shadow-md hover:scale-105 transition-transform">
          <PlusSquareIcon className="size-5" />
          Create Your First Note
        </Link>
      </div>
    </div>
  );
};

export default NotesNotFound;
