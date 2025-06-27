/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import axios_api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, NotebookPenIcon, Loader2Icon, Trash2Icon, SparklesIcon } from "lucide-react";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios_api.get(`/notes/${id}`);
        setNote(res.data.note || res.data); // Handles both {note: {...}} and {...}
      } catch (error) {
        toast.error("Failed to fetch the note");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    setDeleting(true);
    try {
      await axios_api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/");
    } catch (error) {
      toast.error("Failed to delete note");
    } finally {
      setDeleting(false);
    }
  };

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title and content");
      return;
    }
    setSaving(true);
    try {
      await axios_api.put(`/notes/${id}`, note);
      toast.success("Note updated");
      navigate("/");
    } catch (error) {
      console.log("Failed to update note:", error);
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <Loader2Icon className="animate-spin size-10 text-primary" />
      </div>
    );
  }

  if (!note) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold text-error mb-4">Note not found</h2>
        <Link to="/" className="btn btn-primary">
          Back to Notes
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-300">
      {/* Floating Back Button */}
      <Link to="/" className="fixed top-6 left-6 btn btn-circle btn-ghost shadow-md z-10" title="Back to Notes">
        <ArrowLeftIcon className="size-5" />
      </Link>

      <div className="container mx-auto px-4 py-10 flex flex-col items-center">
        {/* Header Section */}
        <div className="flex flex-col items-center mb-10">
          <div className="bg-primary/20 rounded-full p-5 mb-3 shadow-lg">
            <NotebookPenIcon className="size-10 text-primary" />
          </div>
          <h1 className="text-3xl font-extrabold text-primary mb-1 flex items-center gap-2">
            <SparklesIcon className="size-6 " />
            Edit Note
          </h1>
          <p className="text-base-content text-lg opacity-80">Update your note and save changes.</p>
        </div>

        {/* Card Form */}
        <div className="card bg-base-100 shadow-xl w-full max-w-2xl">
          <div className="card-body">
            {/* Title Field */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text text-lg font-semibold flex items-center gap-2">
                  <SparklesIcon className="size-4 text-primary" />
                  Title
                </span>
              </label>
              <input type="text" placeholder="Note title" className="input input-bordered input-lg" value={note.title} onChange={(e) => setNote({ ...note, title: e.target.value })} maxLength={100} disabled={saving || deleting} />
            </div>

            {/* Content Field */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text text-lg font-semibold flex items-center gap-2">
                  <NotebookPenIcon className="size-4 text-primary" />
                  Content
                </span>
              </label>
              <textarea
                placeholder="Write your note here..."
                className="textarea textarea-bordered textarea-md min-h-[300px]"
                value={note.content}
                onChange={(e) => setNote({ ...note, content: e.target.value })}
                maxLength={2000}
                disabled={saving || deleting}
              />
            </div>

            {/* Card Actions */}
            <div className="card-actions items-center justify-between">
              <button className="btn btn-outline bg-red-700 btn-md flex items-center gap-2" onClick={handleDelete} disabled={saving || deleting}>
                <Trash2Icon className="size-5" />
                {deleting ? "Deleting..." : "Delete"}
              </button>
              <button className="btn btn-primary flex items-center gap-2" disabled={saving || deleting} onClick={handleSave}>
                {saving ? (
                  <>
                    <Loader2Icon className="animate-spin size-5" />
                    Saving...
                  </>
                ) : (
                  <>
                    <SparklesIcon className="size-5" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
