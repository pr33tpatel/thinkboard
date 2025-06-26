import { MessagesSquare } from "lucide-react";
import React from "react";

export const Message = () => {
  return (
    <div className="flex items-center justify-center min-h-[15vh] bg-gray-950 px-2">
      <div
        data-theme="synthwave"
        className="
          flex flex-row items-center justify-center
          gap-4 sm:gap-6 w-full
          max-w-2xl py-2 px-3 sm:px-6
          rounded-2xl shadow-2xl bg-base-100 border border-primary/40
        "
      >
        {/* Animated Icon always left */}
        <div className="flex-shrink-0">
          <MessagesSquare size={30} className="text-primary animate-pulse " />
        </div>

        <div className="flex flex-col items-center text-center  w-full">
          <h3 className="text-lg sm:text-xl font-extrabold text-primary mb-1">Welcome to the Thinkboard</h3>
          <p className="text-base-content opacity-80 text-sm sm:text-base">
            Share your ideas, ask questions, or spark a conversation, <space />
            <span className="underline">all anonymously </span>
            <span className="font-semibold block">Your message could inspire someone today.</span>
          </p>
        </div>
      </div>
    </div>
  );
};
