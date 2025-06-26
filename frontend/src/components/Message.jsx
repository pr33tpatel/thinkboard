import { MessagesSquare } from "lucide-react";
import React from "react";

export const Message = () => {
  return (
    <div className="flex bg-transparent  items-center justify-center -z-50 min-h-[15vh] bg-gray-950">
      <div data-theme="synthwave" className="flex items-center justify-center gap-6 w-full max-w-2xl py-4 rounded-2xl shadow-2xl bg-base-100 border border-primary/40">
        {/* Animated Icon */}
        <div>
          <MessagesSquare size={36} className="text-primary animate-pulse" />
        </div>

        <div className="flex flex-col items-center text-center">
          <h3 className="text-xl font-extrabold text-primary mb-1">Welcome to the Thinkboard</h3>
          <p className="text-base-content opacity-80">
            Share your ideas, ask questions, or spark a conversation, <span className="underline"> all anonymously </span>
            <br />
            <span className="font-semibold">Your message could inspire someone today.</span>
          </p>
        </div>
      </div>
    </div>
  );
};
