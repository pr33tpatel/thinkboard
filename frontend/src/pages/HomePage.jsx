import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import axios_api from "../lib/axios";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";
import { Message } from "../components/Message";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios_api.get("/notes");
        console.log(res.data);
        setNotes(res.data);
        setIsRateLimited(false); // if we can get the data, we are not rate limited
      } catch (error) {
        console.log("Error fetching notes");
        console.log(error);
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else if (error.response?.status === 404) {
          // do nothing: this is if no notes exist
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);
  return (
    <div className="min-h-screen pt-20">
      <Navbar />

      <Message />

      {isRateLimited && <RateLimitedUI />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div data-theme="synthwave" className="text-center bg-transparent text-purple-400 font-bold text-3xl py-10">
            Loading notes...
          </div>
        )}

        {notes.length === 0 && !isRateLimited && !loading && <NotesNotFound />}
        {/* <NotesNotFound /> */}
        {/* prettier-ignore */}
        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
      <div className="absolute inset-0 -z-50 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_7%,#000_60%,#e182c2_105%)]" />
    </div>
  );
};

export default HomePage;
