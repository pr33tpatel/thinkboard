import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import axios_api from "../lib/axios";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";
import { Message } from "../components/Message";
import ThemeDropdown from "../components/ThemeDropdown";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMesage, setShowMessage] = useState(true);

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
    <div className=" min-h-screen pt-20">
      <Navbar />

      {isRateLimited && <RateLimitedUI />}

      {showMesage && <Message onClose={() => setShowMessage(false)} />}
      <div className="max-w-7xl mx-auto p-4 mt-3">
        {loading && <div className="text-center bg-transparent text-primary font-bold text-3xl py-10">Loading notes...</div>}
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
      {/* <div>
        <div class="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
          <div class="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
        </div>
      </div> */}
      {/* <div>
        <div class="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"></div>
      </div>
      <div
        className="absolute inset-0 -z-50 h-full w-full items-center px-5 py-24"
        style={{
          background: "radial-gradient(125% 125% at 50% 7%, #000 60%, var(--p) 205%)",
        }}
      /> */}
    </div>
  );
};

export default HomePage;
