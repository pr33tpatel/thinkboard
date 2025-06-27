import { PenSquareIcon, Trash2Icon } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";
import axios_api from "../lib/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault(); // prevents going to NoteDetailPage by default
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await axios_api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id)); // filter and remove the deleted note
      toast.success("Note Deleted");
    } catch (error) {
      console.log("Failed to delete note because of error:", error);
      toast.error("Failed to delete note");
    }
  };
  return (
    <Link to={`/note/${note._id}`} className="card bg-base-300 shadow-2xl hover:-translate-y-1 transition-all duration-200 border-t-4 border-solid border-primary border-base-content/30">
      <div className="card-body z-40 ">
        <h3 className="card-title  text-xl md:text-2xl text-primary">{note.title}</h3>
        <p className="line-clamp-3">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          {/* if this breaks, change updateAt back to createdAt */}
          <div className="flex flex-col gap-1">
            <span className="text-sm text-base-content/80">Updated: {formatDate(new Date(note.updatedAt))}</span>
            <span className="text-sm text-base-content/80">Created: {formatDate(new Date(note.createdAt))}</span>
          </div>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4 md:size-5" />
            <button onClick={(e) => handleDelete(e, note._id)} className="btn btn-ghost btn-xs text-error">
              <Trash2Icon className="size-4 md:size-5" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
